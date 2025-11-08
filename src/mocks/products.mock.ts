/**
 * Product data structure
 */
export interface Product {
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

/**
 * Mock product data
 */
export const mockProducts: Product[] = [
  {
    productName: "Advanced Polymer Resin (APR-200)",
    productId: "PROD-001",
    category: "Specialty Chemicals / Composites",
    unitOfMeasure: "Kilogram (KG)",
    standardCostPerKG: 18.5,
    manufacturingLeadTime: 15,
    rawMaterial1: "Isophthalic Acid: 70%",
    rawMaterial2: "Glycol Ether: 20%",
    rawMaterial3: "Cobalt Octoate: 10%",
    storageRequirements: "Cool, dry environment; temperature < 30°C",
  },
  {
    productName: "High-Performance Epoxy Resin (HPE-350)",
    productId: "PROD-002",
    category: "Specialty Chemicals / Adhesives",
    unitOfMeasure: "Kilogram (KG)",
    standardCostPerKG: 22.75,
    manufacturingLeadTime: 12,
    rawMaterial1: "Bisphenol A: 65%",
    rawMaterial2: "Epichlorohydrin: 25%",
    rawMaterial3: "Catalyst Mix: 10%",
    storageRequirements: "Store in sealed containers; temperature 15-25°C",
  },
];
