import { tool } from "langchain";
import { z } from "zod";

/**
 * Supplier data structure
 */
interface Supplier {
  supplierName: string;
  supplierId: string;
  primaryContact: string;
  phone: string;
  email: string;
  address: string;
  certification: string;
  paymentTermsAccepted: string;
  productFocus: string;
  description: string;
}

/**
 * Mock supplier data
 */
const mockSuppliers: Supplier[] = [
  {
    supplierName: "ChemCore Solutions Inc.",
    supplierId: "CCSI-910-S",
    primaryContact: "Sarah Johnson (Sales Director)",
    phone: "+1 (555) 301-4567",
    email: "sjohnson@chemcoresolutions.com",
    address: "22 East Harbor Blvd, Houston, TX, 77002, USA",
    certification: "ISO 9001:2015, REACH Compliant",
    paymentTermsAccepted: "Net 30/60 Days",
    productFocus:
      "Custom chemical formulations, bulk industrial solvents, and polymer intermediates.",
    description:
      "Well-established, mid-sized chemical manufacturer known for on-time delivery and flexible ordering. Stellar's preferred domestic supplier for specialty resins.",
  },
];

/**
 * Tool to retrieve supplier information by Supplier ID
 */
export const getSupplierInfo = tool(
  async ({ supplierId }: { supplierId: string }) => {
    const supplier = mockSuppliers.find((s) => s.supplierId === supplierId);

    if (!supplier) {
      return `Supplier ID: ${supplierId} not found`;
    }

    return JSON.stringify(supplier, null, 2);
  },
  {
    name: "get_supplier_info",
    description:
      "Get detailed supplier information including contact details, certifications, payment terms, and product focus by Supplier ID.",
    schema: z.object({
      supplierId: z.string().describe("Supplier ID number, e.g., CCSI-910-S"),
    }),
  }
);

/**
 * Tool to list all available suppliers
 */
export const listAllSuppliers = tool(
  async () => {
    const supplierList = mockSuppliers.map((s) => ({
      supplierId: s.supplierId,
      supplierName: s.supplierName,
      productFocus: s.productFocus,
      certification: s.certification,
    }));

    return JSON.stringify(supplierList, null, 2);
  },
  {
    name: "list_all_suppliers",
    description: "List all available suppliers with their basic information",
    schema: z.object({}),
  }
);

/**
 * Tool to search suppliers by product focus
 */
export const searchSuppliersByProduct = tool(
  async ({ keyword }: { keyword: string }) => {
    const results = mockSuppliers.filter((s) =>
      s.productFocus.toLowerCase().includes(keyword.toLowerCase())
    );

    if (results.length === 0) {
      return `No suppliers found for keyword: ${keyword}`;
    }

    return JSON.stringify(
      results.map((s) => ({
        supplierId: s.supplierId,
        supplierName: s.supplierName,
        productFocus: s.productFocus,
      })),
      null,
      2
    );
  },
  {
    name: "search_suppliers_by_product",
    description:
      "Search suppliers by product keyword (e.g., 'chemical', 'polymer', 'resin')",
    schema: z.object({
      keyword: z
        .string()
        .describe("Keyword to search in supplier product focus"),
    }),
  }
);
