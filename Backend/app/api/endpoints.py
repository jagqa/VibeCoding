import logging
from fastapi import APIRouter, HTTPException, status
from app import schemas
from ..Services.ado_service import get_projects, get_sprints, get_user_stories

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/api/connect")
async def connect_and_get_projects(request: schemas.ADOConnectRequest):
    """
    Accepts ADO credentials, connects to Azure DevOps,
    and returns a list of projects.
    """
    try:
        projects = get_projects(
            org_url=request.ado_organization_url,
            pat=request.ado_pat
        )
        return {"projects": projects}
    except ValueError as e:
        logger.warning(f"Connection failed due to invalid input: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception:
        logger.error("An unexpected error occurred while connecting to ADO.", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred while connecting to Azure DevOps.")

@router.post("/api/sprints")
async def get_project_sprints(request: schemas.ADOSprintsRequest) -> dict:
    logger.info(f"Received request with body: {request.dict()}")
    """
    Accepts ADO credentials and a project ID, and returns a list of sprints.
    """
    try:
        sprints = get_sprints(
            org_url=request.ado_organization_url,
            pat=request.ado_pat,
            project_id=request.project_id
        )
        return {"sprints": sprints}
    except ValueError as e:
        logger.warning(f"Failed to get sprints due to invalid input: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception:
        logger.error(f"Failed to fetch sprints for project {request.project_id}", exc_info=True)
        
@router.post("/api/user-stories")
async def get_sprint_user_stories(request: schemas.ADOUserStoriesRequest) -> dict:
    """
    Accepts ADO credentials, project ID, and sprint path, and returns a list of user stories.
    """
    try:
        stories = get_user_stories(
            org_url=request.ado_organization_url,
            pat=request.ado_pat,
            project_id=request.project_id,
            sprint_path=request.sprint_path
        )
        return {"user_stories": stories}
    except ValueError as e:
        logger.warning(f"Failed to get user stories due to invalid input: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception:
        logger.error(f"Failed to fetch user stories for project {request.project_id}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred while fetching user stories.")
@router.post("/api/generate-gherkin")
async def generate_gherkin(request: schemas.GherkinRequest):
    """
    Accepts a user story ID and generates Gherkin steps.
    This is a placeholder and needs to be implemented.
    """
    try:
        # Here you would call a service to:
        # 1. Fetch the user story from Azure DevOps using the ID.
        # 2. Call the Gemini API to generate Gherkin steps.
        # 3. Return the generated Gherkin.
        return {"gherkin": f"Gherkin for user story {request.user_story_id} will be generated here."}
    except Exception:
        logger.error(f"Failed to generate Gherkin for story {request.user_story_id}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred while generating Gherkin steps.")

# Remember to include this router in your main FastAPI app.