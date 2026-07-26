// API wrappers for research / DeepSearch endpoints
import apiClient from './client';

export const runDeepSearch = (projectId: string) =>
  apiClient.post(`/research/deepsearch`, { project_id: projectId });
