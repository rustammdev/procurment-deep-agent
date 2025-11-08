import { z } from "zod";

/**
 * Runtime context schema for agent
 * Contains static configuration passed to all tools
 */
export const ContextSchema = z.object({
  productId: z.string(),
  supplierId: z.string(),
  companyId: z.string(),
});

export type ContextType = z.infer<typeof ContextSchema>;
