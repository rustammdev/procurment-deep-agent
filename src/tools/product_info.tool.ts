import { tool } from "langchain";
import { z } from "zod";
import { type Runtime } from "@langchain/langgraph";
import { ContextType } from "../types/context.schema";
import { mockProducts } from "../mocks/products.mock";

/**
 * Tool to retrieve detailed product information
 * Product ID is automatically obtained from runtime context
 */
export const getProductInfo = tool(
  async (_: Record<string, never>, runtime: Runtime<ContextType>) => {
    const productId = runtime.context?.productId;

    if (!productId) {
      return "Product ID not found in context";
    }

    const product = mockProducts.find((p) => p.productId === productId);

    if (!product) {
      return `Product ID: ${productId} not found`;
    }

    return JSON.stringify(product, null, 2);
  },
  {
    name: "get_product_info",
    description:
      "Get complete product information including price, raw material composition, manufacturing lead time, and storage requirements for the configured product.",
    schema: z.object({}),
  }
);
