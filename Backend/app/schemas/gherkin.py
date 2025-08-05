from pydantic import BaseModel
from typing import List

# --- Request Schemas ---

class AdoRequest(BaseModel):
    project_name: str

class SprintRequest(BaseModel):
    project_name: str

class UserStoryRequest(BaseModel):
    project_name: str
    sprint_path: str

class GherkinGenerationRequest(BaseModel):
    user_story_description: str

class TaskCreationRequest(BaseModel):
    project_name: str
    user_story_id: int
    title: str
    description: str

# --- Response Schemas ---

class AdoItem(BaseModel):
    id: str
    name: str

class AdoWorkItem(BaseModel):
    id: int
    title: str
    description: str | None = None

class GherkinResponse(BaseModel):
    gherkin_syntax: str

class TaskResponse(BaseModel):
    id: int
    url: str