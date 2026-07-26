"""POST /discover — problem discovery & validation."""
from fastapi import APIRouter

router = APIRouter()


@router.post("/discover")
async def discover_idea(idea: str):
    # TODO: call ai_layer.discovery_graph (Phase 1)
    return {"message": "discovery endpoint stub", "idea": idea}
