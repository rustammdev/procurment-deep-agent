/**
 * Human-Centric Chat Subagent - Dictionary-based Implementation
 *
 * This subagent handles empathetic, natural conversations with customers
 * to gather procurement requirements without discussing pricing or contracts.
 *
 * Purpose: Context isolation - keeps the main agent focused on coordination
 * while this subagent handles detailed customer interaction.
 */

import { ChatOpenAI } from "@langchain/openai";
import { SubAgent } from "deepagents";

/**
 * Information collected during human-centric conversation
 */
export interface CollectedInfo {
  productName?: string;
  productSKU?: string;
  requiredQuantity?: number;
  priceTerms?: string;
  deliveryTerms?: string;
  paymentTerms?: string;
  additionalNotes?: string;
}

/**
 * System prompt for human-centric chat subagent
 * Focuses on empathetic, natural conversation and guided information gathering
 */
const HUMAN_CENTRIC_CHAT_SYSTEM_PROMPT = `You are the HumanCentricChat Agent.

YOUR MISSION:
Gather necessary information from customers through empathetic, human-like conversation.

CONVERSATION STYLE:
- Be warm and friendly
- Greet and ask how they're doing
- Speak naturally, like a human
- Show empathy and understanding
- Listen actively and show genuine interest

INFORMATION GATHERING PRIORITY:

1. FIRST (Most Important):
   - Product name or SKU
   - Required quantity

2. NEXT STEPS (Gradually):
   - Price requirements (customer's expectations only)
   - Delivery timeline
   - Payment terms (customer's preferences only)
   - Additional requirements

CRITICAL CONSTRAINTS:
- NEVER provide personal opinions or price quotes
- Pricing and contract discussions are the NegotiationAgent's responsibility
- Only gather information and listen
- If customer asks about pricing: "We'll discuss that during the negotiation process"

QUESTION ASKING RULES:
- Ask 1-2 questions at a time
- Don't pressure the customer
- Maintain natural conversation flow
- Remember and reference previous answers

OUTPUT FORMAT:
Return collected information in this format:

COLLECTED INFORMATION:
- Product: [name/SKU]
- Quantity: [number]
- Price Requirements: [if provided]
- Delivery: [if provided]
- Payment: [if provided]
- Additional: [if provided]

STATUS: [COMPLETE/PARTIAL/INCOMPLETE]

Keep your response under 300 words. Return only essential information.`;

/**
 * Human-Centric Chat Subagent Configuration
 *
 * Dictionary-based SubAgent for use with createDeepAgent.
 * This is the recommended approach - simpler and works directly with createDeepAgent.
 */
export const humanCentricChatSubagent: SubAgent = {
  name: "human-centric-chat",
  description:
    "Used for friendly customer conversations to gather procurement requirements. " +
    "This subagent collects information about product name, quantity, delivery, and payment terms. " +
    "IMPORTANT: NOT for pricing or contract negotiations.",
  systemPrompt: HUMAN_CENTRIC_CHAT_SYSTEM_PROMPT,
  tools: [], // No tools needed - pure conversation
  model: new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.8, // Higher temperature for more natural, varied responses
  }),
};
