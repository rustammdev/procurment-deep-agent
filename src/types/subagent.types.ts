/**
 * Subagent Type Definitions
 *
 * Type definitions for subagents used with LangChain Deep Agents.
 */

import type {
  StructuredTool,
  AgentMiddleware,
  InterruptOnConfig,
} from "langchain";

/**
 * Dictionary-based SubAgent (Recommended)
 *
 * Use this with createDeepAgent for most use cases.
 * This is the standard way to define subagents.
 */
export interface SubAgent {
  /** Unique identifier for the subagent */
  name: string;

  /** Description of what this subagent does (used by main agent to decide when to delegate) */
  description: string;

  /** System prompt with instructions for the subagent */
  systemPrompt: string;

  /** Tools available to the subagent (optional, defaults to empty array) */
  tools?: StructuredTool[];

  /** Model to use for this subagent (optional, defaults to main agent's model) */
  model?: any; // Can be LanguageModelLike or string

  /** Additional middleware for custom behavior (optional) */
  middleware?: AgentMiddleware[];

  /** Human-in-the-loop configuration for specific tools (optional) */
  interruptOn?: Record<string, boolean | InterruptOnConfig>;
}
