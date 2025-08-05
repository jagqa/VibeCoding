import os
from pydantic_settings import BaseSettings


# Pydantic's BaseSettings can automatically read from a .env file
# if python-dotenv is installed, so you don't need to call load_dotenv() explicitly.

class Settings(BaseSettings):
    # Pydantic will automatically read these from environment variables or a .env file.
    # It will raise a clear validation error on startup if a required variable is missing.
    ADO_ORGANIZATION_URL: str | None = None
    ADO_PAT: str | None = None
    GEMINI_API_KEY: str | None = None # This remains optional

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Create a single, validated settings instance to be imported by other modules.
settings = Settings()