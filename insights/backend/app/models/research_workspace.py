"""ResearchWorkspace ORM model."""
from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid

from backend.app.core.db import Base


class ResearchWorkspace(Base):
    __tablename__ = "research_workspaces"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    deepsearch_results = Column(JSONB, nullable=True)
    clusters = Column(JSONB, nullable=True)
    gap_analysis = Column(JSONB, nullable=True)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
