import { tool } from "langchain";
import { z } from "zod";
import { type Runtime } from "@langchain/langgraph";
import { ContextType } from "../types/context.schema";
import { mockSuppliers } from "../mocks/suppliers.mock";

/**
 * Tool to retrieve supplier information
 * Supplier ID is automatically obtained from runtime context
 */
export const getSupplierInfo = tool(
  async (_: Record<string, never>, runtime: Runtime<ContextType>) => {
    const supplierId = runtime.context?.supplierId;

    if (!supplierId) {
      return "Supplier ID not found in context";
    }

    const supplier = mockSuppliers.find((s) => s.supplierId === supplierId);

    if (!supplier) {
      return `Supplier ID: ${supplierId} not found`;
    }

    return JSON.stringify(supplier, null, 2);
  },
  {
    name: "get_supplier_info",
    description:
      "Get detailed supplier information including contact details, certifications, payment terms, and product focus for the configured supplier.",
    schema: z.object({}),
  }
);
