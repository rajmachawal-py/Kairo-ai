"""Dashboard — aggregated project stats."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard/{project_id}")
async def get_dashboard(project_id: str):
    # TODO: aggregate project data (Phase 6)
    return {"message": "dashboard endpoint stub", "project_id": project_id}
