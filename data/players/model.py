from fastapi import FastAPI
from pydantic import BaseModel

class Player(BaseModel):
    name: str
    team: str
    stats: dict
    