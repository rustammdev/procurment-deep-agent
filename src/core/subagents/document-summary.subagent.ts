/**
 * Document Summary Subagent - Dictionary-based Implementation
 *
 * This subagent handles document analysis and summarization for uploaded files.
 * It classifies document types and extracts key information while keeping
 * the main agent's context clean.
 *
 * Purpose: Context isolation - processes large documents without cluttering
 * the main agent's context with full document content.
 */

import { ChatOpenAI } from "@langchain/openai";
import { readDocumentTool } from "../../tools/document_reader.tool";

/**
 * Document types that can be classified
 */
export type DocumentType =
  | "quote"
  | "specifications"
  | "catalog"
  | "certificate"
  | "general"
  | "commercial_proposal";

/**
 * Extracted information from document
 */
export interface DocumentSummary {
  documentType: DocumentType;
  date?: string;
  parties?: string[];
  amount?: string;
  keyTerms?: string[];
  summary: string[];
}

/**
 * System prompt for document summary subagent
 * Focuses on classification, extraction, and concise summarization
 */
const DOCUMENT_SUMMARY_SYSTEM_PROMPT = `You are a Document Analysis Agent specialized in rapid and accurate document analysis.

YOUR MISSION:

1. CLASSIFICATION:
   Identify the uploaded file type:
   - quote: Price quotation from supplier
   - specifications: Technical specifications document
   - catalog: Product catalog
   - certificate: Quality or compliance certificate
   - commercial_proposal: Commercial proposal
   - general: General document

2. EXTRACTION:
   Extract the following key information from the document:
   - Date
   - Parties/Companies involved
   - Amount/Price
   - Key terms and conditions
   - Product/Service names
   - Quantities
   - Delivery timeline
   - Payment terms

3. SUMMARY:
   Provide a concise summary in bullet-point format:
   - Each point should be clear and brief
   - Include only important information
   - Show numbers and dates precisely

OUTPUT FORMAT:

DOCUMENT TYPE: [Document Type]

KEY INFORMATION:
- Date: [date if found]
- Parties: [parties if found]
- Amount: [amount if found]
- Product: [product if found]
- Quantity: [quantity if found]

KEY TERMS:
- [key term 1]
- [key term 2]
- [key term 3]

SUMMARY:
- [summary point 1]
- [summary point 2]
- [summary point 3]

IMPORTANT RULES:
- Keep your response under 400 words
- Only include information found in the document
- If information is not found, write "Not found"
- Be precise and professional
- Use bullet-point format`;

/**
 * Document Summary Subagent Configuration
 *
 * Dictionary-based SubAgent for use with createDeepAgent.
 * Handles document analysis and summarization to keep main agent context clean.
 */
export const documentSummarySubagent = {
  name: "document-summary",
  description:
    "Analyzes and summarizes uploaded documents (PDF, contracts, RFQs, specifications). " +
    "Classifies document type, extracts key information (dates, parties, amounts, terms), " +
    "and returns concise bullet-point summary. " +
    "Use when: Customer uploads a document that needs analysis. " +
    "IMPORTANT: Returns structured summary to keep main agent context clean.",
  systemPrompt: DOCUMENT_SUMMARY_SYSTEM_PROMPT,
  tools: [readDocumentTool],
  model: new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.3,
  }),
};
