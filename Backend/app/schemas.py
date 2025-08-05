from pydantic import BaseModel

class ADOConnectRequest(BaseModel):
    ado_organization_url: str
    ado_pat: str

class ADOSprintsRequest(BaseModel):
    ado_organization_url: str
    ado_pat: str
    project_id: str

class ADOUserStoriesRequest(BaseModel):
    ado_organization_url: str
    ado_pat: str
    project_id: str
    sprint_path: str

class GherkinRequest(BaseModel):
    user_story_id: int