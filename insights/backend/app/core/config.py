"""Application settings loaded from environment variables."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Postgres
    POSTGRES_USER: str = "insights"
    POSTGRES_PASSWORD: str = "insights"
    POSTGRES_DB: str = "insights"
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: int = 5432

    # Auth
    SECRET_KEY: str = "change-me-in-production"

    # External APIs
    OPENAI_API_KEY: str = ""
    TAVILY_API_KEY: str = ""
    GITHUB_TOKEN: str = ""
    NEWSAPI_KEY: str = ""
    TELEGRAM_BOT_TOKEN: str = ""

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"


settings = Settings()
