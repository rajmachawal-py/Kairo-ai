"""FastAPI application entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes import (
    discovery,
    deepsearch,
    workspace,
    projecthub,
    resources,
    dashboard,
    agents,
)

app = FastAPI(
    title="iNSIGHTS API",
    version="0.1.0",
    description="AI-Powered Research & Innovation Copilot backend",
)

# CORS — allow frontend origin in dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(discovery.router, tags=["Discovery"])
app.include_router(deepsearch.router, tags=["DeepSearch"])
app.include_router(workspace.router, tags=["Workspace"])
app.include_router(projecthub.router, tags=["Project HUB"])
app.include_router(resources.router, tags=["Resources"])
app.include_router(dashboard.router, tags=["Dashboard"])
app.include_router(agents.router, tags=["Agents"])


@app.get("/health")
async def health_check():
    return {"status": "ok"}
