"""POST /research/deepsearch — multi-source research."""
from fastapi import APIRouter

router = APIRouter()


@router.post("/research/deepsearch")
async def deep_search(project_id: str):
    # TODO: call ai_layer.deepsearch_graph (Phase 2)
    return {"message": "deepsearch endpoint stub", "project_id": project_id}
