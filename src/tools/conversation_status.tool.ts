import { tool } from "langchain";
import { z } from "zod";
import { ConversationStatus } from "../types/conversation.types";

/**
 * Factory function to create conversation status update tool
 * @param updateCallback - Callback function to update the conversation status
 */
export const createUpdateConversationStatusTool = (
  updateCallback: (status: ConversationStatus, note?: string) => void
) => {
  return tool(
    async ({ status, note }: { status: ConversationStatus; note?: string }) => {
      try {
        updateCallback(status, note);
        return `Conversation status successfully updated to: ${status}${
          note ? `. Note: ${note}` : ""
        }`;
      } catch (error: any) {
        return `Failed to update conversation status: ${error.message}`;
      }
    },
    {
      name: "update_conversation_status",
      description: `Update the current conversation status during procurement negotiation. 
Available statuses:
- INITIAL_RESEARCH: Starting research phase
- SPECIFICATION_CONFIRMATION: Confirming product specifications
- QUOTATION_REQUEST_SUBMITTED: Quotation request has been submitted
- NEGOTIATION_TURN: Active negotiation in progress
- AWAITING_COUNTERPARTY_RESPONSE: Waiting for supplier response
- FINAL_AGREEMENT_READY: Agreement is ready to finalize
- CONVERSATION_CLOSED_FAILURE: Negotiation failed or closed

Use this tool to track progress through the procurement process.`,
      schema: z.object({
        status: z.enum(ConversationStatus).describe("New conversation status"),
        note: z
          .string()
          .optional()
          .describe("Optional note about the status change"),
      }),
    }
  );
};
