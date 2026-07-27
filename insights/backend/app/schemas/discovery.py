"""Pydantic models for the Discovery endpoint."""

from pydantic import BaseModel, Field


class DiscoverRequest(BaseModel):
    """Request body for POST /discover."""
    idea: str = Field(..., min_length=10, max_length=2000, description="The raw project idea")


class FeasibilityDetail(BaseModel):
    score: int = 0
    reasoning: str = ""


class ComplexityDetail(BaseModel):
    level: str = "medium"
    reasoning: str = ""


class DiscoverResponse(BaseModel):
    """Response from POST /discover."""
    # Project metadata
    project_id: str

    # Parsed idea
    title: str
    core_problem: str
    domain: str
    sub_domains: list[str] = []
    target_users: list[str] = []
    refined_idea: str = ""

    # Clarification
    needs_clarification: bool = False
    clarifying_questions: list[str] = []

    # Feasibility
    feasibility_score: int = 0
    technical_feasibility: FeasibilityDetail = FeasibilityDetail()
    market_need: FeasibilityDetail = FeasibilityDetail()
    novelty: FeasibilityDetail = FeasibilityDetail()
    implementation_complexity: ComplexityDetail = ComplexityDetail()
    strengths: list[str] = []
    risks: list[str] = []
    suggestions: list[str] = []

    # Structured output
    problem_statement: str = ""
    elevator_pitch: str = ""
    key_objectives: list[str] = []
    success_metrics: list[str] = []
