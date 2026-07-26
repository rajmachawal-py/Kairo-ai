"""Telegram / WhatsApp agent webhook & triggers."""
from fastapi import APIRouter

router = APIRouter()


@router.post("/agents/telegram/webhook")
async def telegram_webhook():
    # TODO: implement Telegram bot webhook handler (Phase 7)
    return {"message": "telegram webhook stub"}
