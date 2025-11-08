import { tool } from "langchain";
import { z } from "zod";

interface Product {
  productName: string;
  productId: string;
  category: string;
  unitOfMeasure: string;
  standardCostPerKG: number;
  manufacturingLeadTime: number;
  rawMaterial1: string;
  rawMaterial2: string;
  rawMaterial3: string;
  storageRequirements: string;
}

const mockProducts: Product[] = [
  {
    productName: "Advanced Polymer Resin (APR-200)",
    productId: "APR-200-P-0421",
    category: "Specialty Chemicals / Composites",
    unitOfMeasure: "Kilogram (KG)",
    standardCostPerKG: 18.5,
    manufacturingLeadTime: 15,
    rawMaterial1: "Isophthalic Acid: 70%",
    rawMaterial2: "Glycol Ether: 20%",
    rawMaterial3: "Cobalt Octoate: 10%",
    storageRequirements: "Cool, dry environment; temperature < 30°C",
  },
];

/**
 * Tool to retrieve detailed product information by Product ID
 */
export const getProductInfo = tool(
  async ({ productId }: { productId: string }) => {
    const product = mockProducts.find((p) => p.productId === productId);

    if (!product) {
      return `Product ID: ${productId} not found`;
    }

    return JSON.stringify(product, null, 2);
  },
  {
    name: "get_product_info",
    description:
      "Get complete product information including price, raw material composition, manufacturing lead time, and storage requirements by Product ID.",
    schema: z.object({
      productId: z.string().describe("Product ID number, e.g., APR-200-P-0421"),
    }),
  }
);

/**
 * Tool to list all available products with basic information
 */
export const listAllProducts = tool(
  async () => {
    const productList = mockProducts.map((p) => ({
      productId: p.productId,
      productName: p.productName,
      category: p.category,
      costPerKG: p.standardCostPerKG,
    }));

    return JSON.stringify(productList, null, 2);
  },
  {
    name: "list_all_products",
    description: "List all available products with their basic information",
    schema: z.object({}),
  }
);
