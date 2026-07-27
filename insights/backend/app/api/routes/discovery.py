"""POST /discover — problem discovery & validation."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.config import settings
from backend.app.core.db import get_db
from backend.app.schemas.discovery import DiscoverRequest, DiscoverResponse
from backend.app.services.discovery_service import discover_idea
from ai_layer.integrations.gemini_client import GeminiClient

router = APIRouter()


@router.post("/discover", response_model=DiscoverResponse)
async def discover(
    request: DiscoverRequest,
    db: AsyncSession = Depends(get_db),
):
    """Take a raw idea and return a validated, structured problem statement.

    This endpoint runs the full discovery pipeline:
    1. Parse the idea (extract domain, users, core problem)
    2. Check if clarifying questions are needed
    3. Validate feasibility (technical, market, novelty)
    4. Produce a structured problem statement

    The result is persisted as a new Project in the database.
    """
    if not settings.GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY not configured. Set it in your .env file.",
        )

    gemini = GeminiClient(api_key=settings.GEMINI_API_KEY, model=settings.GEMINI_MODEL)

    try:
        result = await discover_idea(
            idea=request.idea,
            gemini=gemini,
            db=db,
        )
        return result
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Discovery failed: {str(e)}")
