"""Business logic for problem discovery & validation.

Orchestrates: create project → run discovery graph → persist results → return.
"""

import uuid
import json

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from ai_layer.integrations.gemini_client import GeminiClient
from ai_layer.graphs.discovery_graph import run_discovery
from backend.app.schemas.discovery import DiscoverResponse, FeasibilityDetail, ComplexityDetail


async def discover_idea(
    idea: str,
    gemini: GeminiClient,
    db: AsyncSession,
) -> DiscoverResponse:
    """Run the full discovery pipeline and persist the result.

    Args:
        idea: Raw project idea string from the user.
        gemini: Initialized GeminiClient.
        db: Async database session.

    Returns:
        DiscoverResponse with all discovery results.
    """
    # 1. Run the discovery graph
    result = await run_discovery(raw_idea=idea, gemini=gemini)

    # 2. Generate a project ID
    project_id = str(uuid.uuid4())

    # 3. Build the problem_statement and validation_summary JSON payloads
    problem_statement_payload = {
        "title": result.get("title", ""),
        "core_problem": result.get("core_problem", ""),
        "domain": result.get("domain", ""),
        "sub_domains": result.get("sub_domains", []),
        "target_users": result.get("target_users", []),
        "refined_idea": result.get("refined_idea", ""),
        "problem_statement": result.get("problem_statement", ""),
        "elevator_pitch": result.get("elevator_pitch", ""),
        "key_objectives": result.get("key_objectives", []),
        "success_metrics": result.get("success_metrics", []),
        "needs_clarification": result.get("needs_clarification", False),
        "clarifying_questions": result.get("clarifying_questions", []),
    }

    validation_summary_payload = {
        "feasibility_score": result.get("feasibility_score", 0),
        "technical_feasibility": result.get("technical_feasibility", {}),
        "market_need": result.get("market_need", {}),
        "novelty": result.get("novelty", {}),
        "implementation_complexity": result.get("implementation_complexity", {}),
        "strengths": result.get("strengths", []),
        "risks": result.get("risks", []),
        "suggestions": result.get("suggestions", []),
    }

    # 4. Persist to PostgreSQL
    # Using a mock user_id for now (no auth in hackathon mode)
    mock_user_id = "00000000-0000-0000-0000-000000000001"

    # Ensure mock user exists
    await db.execute(
        text("""
            INSERT INTO users (id, email, hashed_password, full_name)
            VALUES (:id, :email, :pw, :name)
            ON CONFLICT (id) DO NOTHING
        """),
        {
            "id": mock_user_id,
            "email": "demo@insights.dev",
            "pw": "not-a-real-hash",
            "name": "Demo User",
        },
    )

    # Insert project
    await db.execute(
        text("""
            INSERT INTO projects (id, user_id, raw_idea, problem_statement, validation_summary)
            VALUES (:id, :user_id, :raw_idea, :problem_statement, :validation_summary)
        """),
        {
            "id": project_id,
            "user_id": mock_user_id,
            "raw_idea": idea,
            "problem_statement": json.dumps(problem_statement_payload),
            "validation_summary": json.dumps(validation_summary_payload),
        },
    )

    await db.commit()

    # 5. Build response
    return DiscoverResponse(
        project_id=project_id,
        title=result.get("title", ""),
        core_problem=result.get("core_problem", ""),
        domain=result.get("domain", ""),
        sub_domains=result.get("sub_domains", []),
        target_users=result.get("target_users", []),
        refined_idea=result.get("refined_idea", ""),
        needs_clarification=result.get("needs_clarification", False),
        clarifying_questions=result.get("clarifying_questions", []),
        feasibility_score=result.get("feasibility_score", 0),
        technical_feasibility=FeasibilityDetail(**result.get("technical_feasibility", {})),
        market_need=FeasibilityDetail(**result.get("market_need", {})),
        novelty=FeasibilityDetail(**result.get("novelty", {})),
        implementation_complexity=ComplexityDetail(**result.get("implementation_complexity", {})),
        strengths=result.get("strengths", []),
        risks=result.get("risks", []),
        suggestions=result.get("suggestions", []),
        problem_statement=result.get("problem_statement", ""),
        elevator_pitch=result.get("elevator_pitch", ""),
        key_objectives=result.get("key_objectives", []),
        success_metrics=result.get("success_metrics", []),
    )
