import { tool } from "langchain";
import { z } from "zod";
import { type Runtime } from "@langchain/langgraph";
import { ContextType } from "../types/context.schema";
import { mockCompanies } from "../mocks/companies.mock";

/**
 * Tool to retrieve internal company information
 * Company ID is automatically obtained from runtime context
 */
export const getCompanyInfo = tool(
  async (_: Record<string, never>, runtime: Runtime<ContextType>) => {
    const companyId = runtime.context?.companyId;

    if (!companyId) {
      return "Company ID not found in context";
    }

    const company = mockCompanies.find((c) => c.companyId === companyId);

    if (!company) {
      return `Company ID: ${companyId} not found`;
    }

    return JSON.stringify(company, null, 2);
  },
  {
    name: "get_company_info",
    description:
      "Get internal company information including procurement agent details, budget, payment terms, and ERP system for the configured company.",
    schema: z.object({}),
  }
);
