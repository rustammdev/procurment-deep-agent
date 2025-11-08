import { createDeepAgent, StoreBackend } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";
import { InMemoryStore } from "@langchain/langgraph";
import { getProductInfo } from "../tools/product_info.tool";
import { getSupplierInfo } from "../tools/supplier_info.tool";
import { getCompanyInfo } from "../tools/company_info.tool";
import { createUpdateConversationStatusTool } from "../tools/conversation_status.tool";
import { TestSchema, ConversationStatus } from "../types/conversation.types";
import { ContextSchema, ContextType } from "../types/context.schema";

/**
 * Deep Procurement Agent Service
 * Handles procurement-related queries using LangChain Deep Agent with multiple tools
 */
export class DeepProcurmentAgentService {
  private deepAgent: any;
  private store: InMemoryStore;
  private config: TestSchema;

  constructor(config: TestSchema) {
    this.config = config;
    this.store = new InMemoryStore();

    const systemPrompt = `
You are an expert procurement agent for Stellar Manufacturing Corp.
Your role is to assist with procurement decisions and provide information about:
- Products: specifications, pricing, raw materials, lead times, and storage requirements
- Suppliers: contact information, certifications, payment terms, and product focus
- Company: internal procurement policies and ERP system

Current Context:
- Product ID: ${config.productId}
- Supplier ID: ${config.supplierId}
- Company ID: ${config.companyId}
- Conversation Status: ${config.conversationStatus}
${config.note ? `- Note: ${config.note}` : ""}

Available tools:
- get_product_info: Get detailed product information for the configured product
- get_supplier_info: Get detailed supplier information for the configured supplier
- get_company_info: Get internal company information
- update_conversation_status: Update the conversation status as negotiation progresses

Always provide accurate, data-driven recommendations based on the available information.
When comparing options, consider cost, lead time, certifications, and supplier reliability.
Track the conversation status and update it appropriately as the negotiation progresses using the update_conversation_status tool.
    `.trim();

    this.deepAgent = createDeepAgent({
      model: new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0.7,
      }),
      store: this.store,
      backend: (stateAndStore) => new StoreBackend(stateAndStore),
      systemPrompt,
      tools: [
        getProductInfo,
        getSupplierInfo,
        getCompanyInfo,
        createUpdateConversationStatusTool((status, note) =>
          this.updateStatus(status, note)
        ),
      ],
      contextSchema: ContextSchema,
    });
  }

  /**
   * Get current configuration
   */
  getConfig(): TestSchema {
    return { ...this.config };
  }

  /**
   * Update conversation status
   */
  updateStatus(status: ConversationStatus, note?: string) {
    this.config.conversationStatus = status;
    if (note) {
      this.config.note = note;
    }
  }

  /**
   * Process a query and return the complete response
   * @param query - User query string
   * @param threadId - Optional thread ID for conversation persistence
   * @returns Agent response
   */
  async processQuery(query: string, threadId?: string) {
    const config = threadId ? { configurable: { thread_id: threadId } } : {};

    const context: ContextType = {
      productId: this.config.productId,
      supplierId: this.config.supplierId,
      companyId: this.config.companyId,
    };

    const response = await this.deepAgent.invoke(
      { messages: [{ role: "user", content: query }] },
      { ...config, context }
    );

    return response;
  }

  /**
   * Stream a query response for real-time updates
   * @param query - User query string
   * @param threadId - Optional thread ID for conversation persistence
   * @returns Async stream of response chunks
   */
  async streamQuery(query: string, threadId?: string) {
    const config = threadId ? { configurable: { thread_id: threadId } } : {};

    const context: ContextType = {
      productId: this.config.productId,
      supplierId: this.config.supplierId,
      companyId: this.config.companyId,
    };

    const stream = await this.deepAgent.stream(
      { messages: [{ role: "user", content: query }] },
      { ...config, context }
    );

    return stream;
  }
}
