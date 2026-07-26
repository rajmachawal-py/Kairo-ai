"""ChatSession ORM model (Telegram/WhatsApp agent conversations)."""
from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid

from backend.app.core.db import Base


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    platform = Column(String, nullable=False)  # telegram | whatsapp
    messages = Column(JSONB, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
