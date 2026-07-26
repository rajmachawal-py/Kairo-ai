"""Research workspace CRUD."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/workspace/{project_id}")
async def get_workspace(project_id: str):
    # TODO: implement (Phase 3)
    return {"message": "workspace endpoint stub", "project_id": project_id}
