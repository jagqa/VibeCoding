import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = () => apiClient.get('/projects');
export const getSprints = (projectName) => apiClient.post('/sprints', { project_name: projectName });
export const getUserStories = (projectName, sprintPath) => apiClient.post('/userstories', { project_name: projectName, sprint_path: sprintPath });
export const generateGherkin = (userStoryDescription) => apiClient.post('/generate-gherkin', { user_story_description: userStoryDescription });
export const createTask = (projectName, userStoryId, title, description) => apiClient.post('/create-task', {
  project_name: projectName,
  user_story_id: userStoryId,
  title: title,
  description: description,
});