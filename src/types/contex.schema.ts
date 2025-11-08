import z from "zod";

export const contextSchema = z.object({
  companyId: z.string(), // ID shu yerda
  productId: z.string(),
  supplierId: z.string(),
});

export type Context = z.infer<typeof contextSchema>;
