/**
 * Conversation status enum for tracking procurement negotiation stages
 */
export enum ConversationStatus {
  INITIAL_RESEARCH = "INITIAL_RESEARCH",
  SPECIFICATION_CONFIRMATION = "SPECIFICATION_CONFIRMATION",
  QUOTATION_REQUEST_SUBMITTED = "QUOTATION_REQUEST_SUBMITTED",
  NEGOTIATION_TURN = "NEGOTIATION_TURN",
  AWAITING_COUNTERPARTY_RESPONSE = "AWAITING_COUNTERPARTY_RESPONSE",
  FINAL_AGREEMENT_READY = "FINAL_AGREEMENT_READY",
  CONVERSATION_CLOSED_FAILURE = "CONVERSATION_CLOSED_FAILURE",
}

/**
 * Test schema configuration for agent initialization
 */
export interface TestSchema {
  supplierId: string;
  productId: string;
  companyId: string;
  note?: string;
  conversationStatus: ConversationStatus;
}
