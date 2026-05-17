from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "MarketMind"
    OLLAMA_MODEL: str = "llama3"

    class Config:
        env_file = ".env"

settings = Settings()