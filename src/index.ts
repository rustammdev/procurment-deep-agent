import "dotenv/config";
import express, { Request, Response } from "express";
import { DeepProcurmentAgentService } from "./core/agent.core";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Procurement Deep Agent API is running!" });
});

app.post("/agent/query", async (req: Request, res: Response) => {
  try {
    const { query, threadId, productId, supplierId, companyId } = req.body;

    if (!query || !threadId || !productId || !supplierId || !companyId) {
      return res.status(400).json({
        error:
          "query, threadId, productId, supplierId, and companyId are required",
      });
    }

    // Get singleton instance (NestJS-style)
    const agentService = DeepProcurmentAgentService.getInstance();

    const response = await agentService.processQuery(
      query,
      threadId,
      productId,
      supplierId,
      companyId
    );

    // Parse response to get the last message content
    const messages = response.messages || [];
    const lastMessage = messages[messages.length - 1];
    const content = lastMessage?.content || "No response from agent";

    res.json({
      success: true,
      message: content,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
