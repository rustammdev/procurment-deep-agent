import express, { Request, Response } from "express";
import { DeepProcurmentAgentService } from "./core/agent.core";
import { TestSchema, ConversationStatus } from "./types/conversation.types";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Store agent instances by session ID
const agentSessions = new Map<string, DeepProcurmentAgentService>();

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Procurement Deep Agent API is running!" });
});

app.post("/agent/init", async (req: Request, res: Response) => {
  try {
    const { sessionId, config } = req.body as {
      sessionId: string;
      config: TestSchema;
    };

    if (!sessionId || !config) {
      return res
        .status(400)
        .json({ error: "sessionId and config are required" });
    }

    // Validate config
    if (!config.productId || !config.supplierId || !config.companyId) {
      return res.status(400).json({
        error: "config must include productId, supplierId, and companyId",
      });
    }

    // Set default status if not provided
    if (!config.conversationStatus) {
      config.conversationStatus = ConversationStatus.INITIAL_RESEARCH;
    }

    const agentService = new DeepProcurmentAgentService(config);
    agentSessions.set(sessionId, agentService);

    res.json({
      success: true,
      message: "Agent initialized successfully",
      config: agentService.getConfig(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/agent/query", async (req: Request, res: Response) => {
  try {
    const { sessionId, query, threadId } = req.body;

    if (!sessionId || !query) {
      return res
        .status(400)
        .json({ error: "sessionId and query are required" });
    }

    const agentService = agentSessions.get(sessionId);
    if (!agentService) {
      return res
        .status(404)
        .json({ error: "Agent session not found. Please initialize first." });
    }

    const response = await agentService.processQuery(query, threadId);
    res.json({
      success: true,
      data: response,
      config: agentService.getConfig(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/agent/stream", async (req: Request, res: Response) => {
  try {
    const { sessionId, query, threadId } = req.body;

    if (!sessionId || !query) {
      return res
        .status(400)
        .json({ error: "sessionId and query are required" });
    }

    const agentService = agentSessions.get(sessionId);
    if (!agentService) {
      return res
        .status(404)
        .json({ error: "Agent session not found. Please initialize first." });
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

app.post("/agent/status", async (req: Request, res: Response) => {
  try {
    const { sessionId, status, note } = req.body;

    if (!sessionId || !status) {
      return res
        .status(400)
        .json({ error: "sessionId and status are required" });
    }

    const agentService = agentSessions.get(sessionId);
    if (!agentService) {
      return res
        .status(404)
        .json({ error: "Agent session not found. Please initialize first." });
    }

    agentService.updateStatus(status, note);
    res.json({
      success: true,
      config: agentService.getConfig(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
