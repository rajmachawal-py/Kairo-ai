"""Project HUB — roadmap & architecture generation."""
from fastapi import APIRouter

router = APIRouter()


@router.post("/projecthub/generate")
async def generate_roadmap(project_id: str):
    # TODO: call ai_layer.roadmap_graph (Phase 4)
    return {"message": "projecthub endpoint stub", "project_id": project_id}
