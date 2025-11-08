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
 * Factory function to create supplier info tool with pre-configured supplier ID
 * @param supplierId - Supplier ID from test schema config
 */
export const createGetSupplierInfoTool = (supplierId: string) => {
  return tool(
    async () => {
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
};
