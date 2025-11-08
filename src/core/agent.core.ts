import { createDeepAgent, StoreBackend } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";
import { InMemoryStore } from "@langchain/langgraph";
import { getProductInfo, listAllProducts } from "../tools/product_info.tool";
import {
  getSupplierInfo,
  listAllSuppliers,
  searchSuppliersByProduct,
} from "../tools/supplier_info.tool";
import { getCompanyInfo, getCompanyBudget } from "../tools/company_info.tool";

/**
 * Deep Procurement Agent Service
 * Handles procurement-related queries using LangChain Deep Agent with multiple tools
 */
export class DeepProcurmentAgentService {
  private deepAgent: any;
  private store: InMemoryStore;
  private systemPrompt = `
You are an expert procurement agent for Stellar Manufacturing Corp.
Your role is to assist with procurement decisions and provide information about:
- Products: specifications, pricing, raw materials, lead times, and storage requirements
- Suppliers: contact information, certifications, payment terms, and product focus
- Company: internal procurement policies, budget, and ERP system

Available tools:
Product Tools:
- get_product_info: Get detailed product information by Product ID
- list_all_products: List all available products

Supplier Tools:
- get_supplier_info: Get detailed supplier information by Supplier ID
- list_all_suppliers: List all available suppliers
- search_suppliers_by_product: Search suppliers by product keyword

Company Tools:
- get_company_info: Get internal company information
- get_company_budget: Get annual materials budget

Always provide accurate, data-driven recommendations based on the available information.
When comparing options, consider cost, lead time, certifications, and supplier reliability.
  `.trim();

  constructor() {
    this.store = new InMemoryStore();

    this.deepAgent = createDeepAgent({
      model: new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0.7,
      }),
      store: this.store,
      backend: (stateAndStore) => new StoreBackend(stateAndStore),
      systemPrompt: this.systemPrompt,
      tools: [
        // Product tools
        getProductInfo,
        listAllProducts,
        // Supplier tools
        getSupplierInfo,
        listAllSuppliers,
        searchSuppliersByProduct,
        // Company tools
        getCompanyInfo,
        getCompanyBudget,
      ],
    });
  }

  /**
   * Process a query and return the complete response
   * @param query - User query string
   * @param threadId - Optional thread ID for conversation persistence
   * @returns Agent response
   */
  async processQuery(query: string, threadId?: string) {
    const config = threadId ? { configurable: { thread_id: threadId } } : {};

    const response = await this.deepAgent.invoke(
      { messages: [{ role: "user", content: query }] },
      config
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

    const stream = await this.deepAgent.stream(
      { messages: [{ role: "user", content: query }] },
      config
    );

    return stream;
  }
}
