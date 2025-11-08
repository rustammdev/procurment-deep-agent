import express, { Request, Response } from "express";
import { DeepProcurmentAgentService } from "./core/agent.core";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const agentService = new DeepProcurmentAgentService();

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Procurement Deep Agent API ishlayapti!" });
});

app.post("/agent/query", async (req: Request, res: Response) => {
  try {
    const { query, threadId } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query majburiy" });
    }

    const response = await agentService.processQuery(query, threadId);
    res.json({ success: true, data: response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/agent/stream", async (req: Request, res: Response) => {
  try {
    const { query, threadId } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query majburiy" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await agentService.streamQuery(query, threadId);

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`);
});
