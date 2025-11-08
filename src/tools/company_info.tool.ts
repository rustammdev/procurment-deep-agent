import { tool } from "langchain";
import { z } from "zod";

/**
 * Internal company data structure
 */
interface Company {
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
const mockCompany: Company = {
  companyName: "Stellar Manufacturing Corp.",
  companyId: "SMC-HQ-3001",
  division: "Advanced Materials Procurement",
  procurementAgent: "David Chen",
  agentId: "DC-88-PA",
  defaultPaymentTerms: "Net 45 Days",
  annualBudget: 45000000,
  primaryLocation:
    "1450 Innovation Drive, Suite 200, Indianapolis, IN, 46204, USA",
  industryFocus: "Precision Engineering & Robotics",
  erpSystem: "SAP S/4HANA (MM)",
};

/**
 * Factory function to create company info tool with pre-configured company ID
 * @param companyId - Company ID from test schema config
 */
export const createGetCompanyInfoTool = (companyId: string) => {
  return tool(
    async () => {
      // Validate company ID matches
      if (mockCompany.companyId !== companyId) {
        return `Company ID: ${companyId} not found`;
      }

      return JSON.stringify(mockCompany, null, 2);
    },
    {
      name: "get_company_info",
      description:
        "Get internal company information including procurement agent details, budget, payment terms, and ERP system for the configured company.",
      schema: z.object({}),
    }
  );
};
