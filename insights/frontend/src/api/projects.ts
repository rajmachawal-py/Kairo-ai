// API wrappers for project-related endpoints
import apiClient from './client';

export const discoverIdea = (idea: string) =>
  apiClient.post('/discover', { idea });

export const getProject = (projectId: string) =>
  apiClient.get(`/projects/${projectId}`);
