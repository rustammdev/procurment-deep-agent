import { createDeepAgent, StoreBackend } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";
import { InMemoryStore } from "@langchain/langgraph";
import { getProductInfo } from "../tools/product_info.tool";
import { getSupplierInfo } from "../tools/supplier_info.tool";
import { getCompanyInfo } from "../tools/company_info.tool";
import { createUpdateConversationStatusTool } from "../tools/conversation_status.tool";
import { ContextSchema, ContextType } from "../types/context.schema";
import { MAIN_LOOP_PROMPT } from "../prompts/main.loop";
import { humanCentricChatSubagent } from "./subagents/human-centric-chat.subagent";

/**
 * Deep Procurement Agent Service
 * Handles procurement-related queries using LangChain Deep Agent with multiple tools
 * NestJS-style singleton service
 */
export class DeepProcurmentAgentService {
  private static instance: DeepProcurmentAgentService;
  private deepAgent: any;
  private store: InMemoryStore;

  private constructor() {
    this.store = new InMemoryStore();

    this.deepAgent = createDeepAgent({
      model: new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0.7,
      }),
      store: this.store,
      backend: (stateAndStore) => new StoreBackend(stateAndStore),
      systemPrompt: MAIN_LOOP_PROMPT,
      tools: [
        getProductInfo,
        getSupplierInfo,
        getCompanyInfo,
        createUpdateConversationStatusTool(() => {}),
      ],
      // Add subagents for specialized tasks
      subagents: [humanCentricChatSubagent],
      contextSchema: ContextSchema,
    });
  }

  /**
   * Get singleton instance (NestJS-style)
   */
  static getInstance(): DeepProcurmentAgentService {
    if (!DeepProcurmentAgentService.instance) {
      DeepProcurmentAgentService.instance = new DeepProcurmentAgentService();
    }
    return DeepProcurmentAgentService.instance;
  }

  /**
   * Process a query and return the complete response
   * @param query - User query string
   * @param threadId - Thread ID for conversation persistence
   * @param productId - Product ID for context
   * @param supplierId - Supplier ID for context
   * @param companyId - Company ID for context
   * @returns Agent response
   */
  async processQuery(
    query: string,
    threadId: string,
    productId: string,
    supplierId: string,
    companyId: string
  ) {
    const config = { configurable: { thread_id: threadId } };

    const context: ContextType = {
      productId,
      supplierId,
      companyId,
    };

    const response = await this.deepAgent.invoke(
      { messages: [{ role: "user", content: query }] },
      { ...config, context }
    );

    return response;
  }
}
