"""LangGraph: Problem discovery & validation flow.

Takes a raw idea → parse → clarify (optional) → validate feasibility
→ structure output.

Graph flow:
  parse_idea → check_clarity → [validate | ask_questions] → structure_output
"""

from __future__ import annotations

import json
from typing import TypedDict, Any

from langgraph.graph import StateGraph, END

from ai_layer.integrations.gemini_client import GeminiClient
from ai_layer.prompts.discovery_prompts import (
    PARSE_IDEA_SYSTEM,
    PARSE_IDEA_PROMPT,
    CLARIFYING_QUESTIONS_SYSTEM,
    CLARIFYING_QUESTIONS_PROMPT,
    VALIDATE_FEASIBILITY_SYSTEM,
    VALIDATE_FEASIBILITY_PROMPT,
    STRUCTURE_OUTPUT_SYSTEM,
    STRUCTURE_OUTPUT_PROMPT,
)


# ── State schema ──────────────────────────────────────────

class DiscoveryState(TypedDict, total=False):
    """State object threaded through the discovery graph."""
    # Input
    raw_idea: str

    # After parse_idea
    core_problem: str
    domain: str
    sub_domains: list[str]
    target_users: list[str]
    key_assumptions: list[str]
    refined_idea: str

    # After clarifying questions
    needs_clarification: bool
    clarifying_questions: list[str]

    # After validate_feasibility
    feasibility_score: int
    technical_feasibility: dict
    market_need: dict
    novelty: dict
    implementation_complexity: dict
    strengths: list[str]
    risks: list[str]
    suggestions: list[str]

    # After structure_output
    problem_statement: str
    title: str
    elevator_pitch: str
    key_objectives: list[str]
    success_metrics: list[str]

    # Error tracking
    error: str | None


# ── Node functions ────────────────────────────────────────

async def parse_idea(state: DiscoveryState, gemini: GeminiClient) -> dict:
    """Extract structured info from the raw idea."""
    prompt = PARSE_IDEA_PROMPT.format(idea=state["raw_idea"])
    result = await gemini.generate_json(prompt, system_instruction=PARSE_IDEA_SYSTEM)

    return {
        "core_problem": result.get("core_problem", ""),
        "domain": result.get("domain", ""),
        "sub_domains": result.get("sub_domains", []),
        "target_users": result.get("target_users", []),
        "key_assumptions": result.get("key_assumptions", []),
        "refined_idea": result.get("refined_idea", ""),
    }


async def check_clarity(state: DiscoveryState, gemini: GeminiClient) -> dict:
    """Determine if the idea needs clarifying questions."""
    prompt = CLARIFYING_QUESTIONS_PROMPT.format(
        core_problem=state["core_problem"],
        domain=state["domain"],
        target_users=", ".join(state.get("target_users", [])),
        refined_idea=state["refined_idea"],
    )
    result = await gemini.generate_json(prompt, system_instruction=CLARIFYING_QUESTIONS_SYSTEM)

    return {
        "needs_clarification": result.get("needs_clarification", False),
        "clarifying_questions": result.get("questions", []),
    }


async def validate_feasibility(state: DiscoveryState, gemini: GeminiClient) -> dict:
    """Assess feasibility, market need, novelty."""
    prompt = VALIDATE_FEASIBILITY_PROMPT.format(
        core_problem=state["core_problem"],
        domain=state["domain"],
        target_users=", ".join(state.get("target_users", [])),
        refined_idea=state["refined_idea"],
    )
    result = await gemini.generate_json(prompt, system_instruction=VALIDATE_FEASIBILITY_SYSTEM)

    return {
        "feasibility_score": result.get("feasibility_score", 0),
        "technical_feasibility": result.get("technical_feasibility", {}),
        "market_need": result.get("market_need", {}),
        "novelty": result.get("novelty", {}),
        "implementation_complexity": result.get("implementation_complexity", {}),
        "strengths": result.get("strengths", []),
        "risks": result.get("risks", []),
        "suggestions": result.get("suggestions", []),
    }


async def structure_output(state: DiscoveryState, gemini: GeminiClient) -> dict:
    """Produce final structured problem statement."""
    prompt = STRUCTURE_OUTPUT_PROMPT.format(
        original_idea=state["raw_idea"],
        core_problem=state["core_problem"],
        domain=state["domain"],
        target_users=", ".join(state.get("target_users", [])),
        refined_idea=state["refined_idea"],
        feasibility_score=state.get("feasibility_score", 0),
        strengths=json.dumps(state.get("strengths", [])),
    )
    result = await gemini.generate_json(prompt, system_instruction=STRUCTURE_OUTPUT_SYSTEM)

    return {
        "problem_statement": result.get("problem_statement", ""),
        "title": result.get("title", ""),
        "elevator_pitch": result.get("elevator_pitch", ""),
        "key_objectives": result.get("key_objectives", []),
        "success_metrics": result.get("success_metrics", []),
    }


# ── Graph builder ─────────────────────────────────────────

def build_discovery_graph(gemini: GeminiClient) -> StateGraph:
    """Build and compile the discovery LangGraph.

    Args:
        gemini: Initialized GeminiClient instance.

    Returns:
        Compiled LangGraph that can be invoked with a DiscoveryState.
    """

    # Wrap node functions to inject the gemini client
    async def _parse_idea(state: DiscoveryState) -> dict:
        return await parse_idea(state, gemini)

    async def _check_clarity(state: DiscoveryState) -> dict:
        return await check_clarity(state, gemini)

    async def _validate_feasibility(state: DiscoveryState) -> dict:
        return await validate_feasibility(state, gemini)

    async def _structure_output(state: DiscoveryState) -> dict:
        return await structure_output(state, gemini)

    # Build graph
    graph = StateGraph(DiscoveryState)

    graph.add_node("parse_idea", _parse_idea)
    graph.add_node("check_clarity", _check_clarity)
    graph.add_node("validate_feasibility", _validate_feasibility)
    graph.add_node("structure_output", _structure_output)

    # Edges
    graph.set_entry_point("parse_idea")
    graph.add_edge("parse_idea", "check_clarity")

    # Conditional: if needs clarification, still validate but flag it
    # For the hackathon, we always proceed to validation
    # (clarifying questions are returned in the response for the user to see)
    graph.add_edge("check_clarity", "validate_feasibility")
    graph.add_edge("validate_feasibility", "structure_output")
    graph.add_edge("structure_output", END)

    return graph.compile()


async def run_discovery(raw_idea: str, gemini: GeminiClient) -> DiscoveryState:
    """Run the full discovery pipeline on a raw idea.

    Args:
        raw_idea: The user's raw project idea string.
        gemini: Initialized GeminiClient.

    Returns:
        Final DiscoveryState with all fields populated.
    """
    graph = build_discovery_graph(gemini)
    initial_state: DiscoveryState = {"raw_idea": raw_idea}
    result = await graph.ainvoke(initial_state)
    return result
