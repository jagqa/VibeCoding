# This is a simplified example. Your actual implementation will vary.
from azure.devops.connection import Connection
from msrest.authentication import BasicAuthentication
from azure.devops.v7_1.core.core_client import CoreClient
from azure.devops.v7_1.work.work_client import WorkClient
from azure.devops.v7_1.work_item_tracking.work_item_tracking_client import WorkItemTrackingClient

def get_projects(org_url: str, pat: str):
    """
    Connects to Azure DevOps and fetches a list of projects.
    """
    if not org_url or not pat:
        raise ValueError("Organization URL and PAT are required.")

    # Use the provided credentials to connect
    credentials = BasicAuthentication('', pat)
    connection = Connection(base_url=org_url, creds=credentials)
    core_client: CoreClient = connection.get_client('azure.devops.v7_1.core.core_client.CoreClient')

    projects = core_client.get_projects()
    
    # Format projects to a simpler list of dictionaries
    project_list = [{"id": p.id, "name": p.name} for p in projects]
    
    return project_list

def get_sprints(org_url: str, pat: str, project_id: str):
    """
    Connects to Azure DevOps and fetches a list of sprints for a given project.
    """
    if not org_url or not pat or not project_id:
        raise ValueError("Organization URL, PAT, and Project ID are required.")

    credentials = BasicAuthentication('', pat)
    connection = Connection(base_url=org_url, creds=credentials)

    # Get the required clients
    core_client: CoreClient = connection.get_client('azure.devops.v7_1.core.core_client.CoreClient')
    work_client: WorkClient = connection.get_client('azure.devops.v7_1.work.work_client.WorkClient')

    # Get the default team for the project to find its iterations
    teams = core_client.get_teams(project_id=project_id, top=1)
    if not teams:
        # If no teams, there are no sprints to fetch
        return []
    default_team = teams[0]

    team_context = {"project_id": project_id, "team_id": default_team.id}

    # Get all iterations (sprints) for that team
    sprints = work_client.get_team_iterations(team_context=team_context)

    # Format the sprints into a simpler list of dictionaries
    sprint_list = [{
        "id": s.id, "name": s.name, "path": s.path,
        "startDate": s.attributes.start_date.isoformat() if s.attributes.start_date else None,
        "finishDate": s.attributes.finish_date.isoformat() if s.attributes.finish_date else None,
    } for s in sprints]

    return sprint_list

def get_user_stories(org_url: str, pat: str, project_id: str, sprint_path: str):
    """
    Fetches user stories for a given project and sprint iteration path.
    """
    if not org_url or not pat or not project_id or not sprint_path:
        raise ValueError("Organization URL, PAT, Project ID, and Sprint Path are required.")

    credentials = BasicAuthentication('', pat)
    connection = Connection(base_url=org_url, creds=credentials)
    wit_client: WorkItemTrackingClient = connection.get_client('azure.devops.v7_1.work_item_tracking.work_item_tracking_client.WorkItemTrackingClient')

    # Use WIQL (Work Item Query Language) to get user stories in the specified sprint
    wiql_query = {
        "query": f"SELECT [System.Id], [System.Title], [System.State] FROM workitems WHERE [System.TeamProject] = @project AND [System.WorkItemType] = 'User Story' AND [System.IterationPath] = '{sprint_path}'"
    }

    query_result = wit_client.query_by_wiql(wiql_query, project=project_id)

    if not query_result.work_items:
        return []

    # Fetch the full details for the work items found
    work_item_ids = [item.id for item in query_result.work_items]
    work_items = wit_client.get_work_items(ids=work_item_ids, fields=["System.Id", "System.Title", "System.State"])

    # Format the user stories into a simpler list
    user_stories = [{
        "id": wi.id,
        "title": wi.fields["System.Title"],
        "state": wi.fields["System.State"]
    } for wi in work_items]

    return user_stories

# Note: Any other functions in this service that interact with ADO
# (e.g., get_user_stories, create_task) will also need to be updated
# to accept org_url and pat as arguments.