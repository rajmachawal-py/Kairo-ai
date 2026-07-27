"""Thin async client for Google Gemini API.

Uses the official `google-genai` SDK.
Provides a unified interface for chat completions with JSON mode support.
"""

import json
from google import genai
from google.genai import types


class GeminiClient:
    """Async wrapper around the Google Gemini API."""

    def __init__(self, api_key: str, model: str = "gemini-1.5-flash"):
        self.client = genai.Client(api_key=api_key)
        self.model = model

    async def generate(
        self,
        prompt: str,
        system_instruction: str | None = None,
        temperature: float = 0.7,
        json_mode: bool = False,
    ) -> str:
        """Generate a completion from Gemini.

        Args:
            prompt: The user message / prompt.
            system_instruction: Optional system instruction for the model.
            temperature: Sampling temperature (0.0 - 2.0).
            json_mode: If True, instructs the model to return valid JSON.

        Returns:
            The generated text response.
        """
        config = types.GenerateContentConfig(
            temperature=temperature,
            system_instruction=system_instruction,
        )

        if json_mode:
            config.response_mime_type = "application/json"

        response = await self.client.aio.models.generate_content(
            model=self.model,
            contents=prompt,
            config=config,
        )

        return response.text

    async def generate_json(
        self,
        prompt: str,
        system_instruction: str | None = None,
        temperature: float = 0.4,
    ) -> dict:
        """Generate a JSON response from Gemini.

        Convenience method that enables JSON mode and parses the response.

        Args:
            prompt: The user message / prompt.
            system_instruction: Optional system instruction.
            temperature: Sampling temperature (lower = more deterministic).

        Returns:
            Parsed JSON as a Python dict.
        """
        text = await self.generate(
            prompt=prompt,
            system_instruction=system_instruction,
            temperature=temperature,
            json_mode=True,
        )

        return json.loads(text)
