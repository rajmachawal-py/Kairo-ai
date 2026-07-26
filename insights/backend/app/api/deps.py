"""Shared FastAPI dependencies (DB session, current user, etc.)."""
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.db import get_db


async def get_session(db: AsyncSession = Depends(get_db)):
    return db
