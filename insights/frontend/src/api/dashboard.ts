// API wrappers for dashboard endpoints
import apiClient from './client';

export const getDashboard = (projectId: string) =>
  apiClient.get(`/dashboard/${projectId}`);
