/**
 * Supplier data structure
 */
export interface Supplier {
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
export const mockSuppliers: Supplier[] = [
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
  {
    supplierName: "Global Polymers Ltd.",
    supplierId: "GPL-445-S",
    primaryContact: "Michael Chen (Account Manager)",
    phone: "+1 (555) 892-3341",
    email: "mchen@globalpolymers.com",
    address: "789 Industrial Park Way, Newark, NJ, 07102, USA",
    certification: "ISO 9001:2015, ISO 14001:2015, FDA Registered",
    paymentTermsAccepted: "Net 45/90 Days",
    productFocus:
      "High-performance epoxy resins, polyurethane systems, and specialty coatings.",
    description:
      "International supplier with strong technical support team. Known for premium quality products and competitive pricing on bulk orders.",
  },
];
