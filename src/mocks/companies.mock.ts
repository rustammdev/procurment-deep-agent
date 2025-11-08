/**
 * Internal company data structure
 */
export interface Company {
  companyName: string;
  companyId: string;
  division: string;
  procurementAgent: string;
  agentId: string;
  defaultPaymentTerms: string;
  annualBudget: number;
  primaryLocation: string;
  industryFocus: string;
  erpSystem: string;
}

/**
 * Mock company data - Internal company information
 */
export const mockCompanies: Company[] = [
  {
    companyName: "Stellar Manufacturing Corp.",
    companyId: "COMP-001",
    division: "Advanced Materials Procurement",
    procurementAgent: "David Chen",
    agentId: "DC-88-PA",
    defaultPaymentTerms: "Net 45 Days",
    annualBudget: 45000000,
    primaryLocation:
      "1450 Innovation Drive, Suite 200, Indianapolis, IN, 46204, USA",
    industryFocus: "Precision Engineering & Robotics",
    erpSystem: "SAP S/4HANA (MM)",
  },
  {
    companyName: "Stellar Manufacturing Corp.",
    companyId: "COMP-002",
    division: "European Materials Procurement",
    procurementAgent: "Emma Schmidt",
    agentId: "ES-92-PA",
    defaultPaymentTerms: "Net 30 Days",
    annualBudget: 38000000,
    primaryLocation: "45 Tech Boulevard, Munich, Bavaria, 80331, Germany",
    industryFocus: "Automotive Components & Aerospace",
    erpSystem: "SAP S/4HANA (MM)",
  },
];
