"""Application settings loaded from environment variables."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Postgres
    POSTGRES_USER: str = "insights"
    POSTGRES_PASSWORD: str = "insights"
    POSTGRES_DB: str = "insights"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432

    # Direct database URL override (takes priority if set)
    DATABASE_URL: str = ""

    # Auth
    SECRET_KEY: str = "change-me-in-production"

    # External APIs
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.6-flash"
    LLM_API_KEY: str = ""
    LLM_BASE_URL: str = ""
    TAVILY_API_KEY: str = ""
    GITHUB_TOKEN: str = ""
    NEWSAPI_KEY: str = ""
    TELEGRAM_BOT_TOKEN: str = ""

    @property
    def database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"


settings = Settings()
