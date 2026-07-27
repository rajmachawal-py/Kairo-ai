// API wrappers for project-related endpoints
import apiClient from './client';

export interface DiscoveryResult {
  project_id: string;
  title: string;
  core_problem: string;
  domain: string;
  sub_domains: string[];
  target_users: string[];
  refined_idea: string;
  needs_clarification: boolean;
  clarifying_questions: string[];
  feasibility_score: number;
  technical_feasibility: { score: number; reasoning: string };
  market_need: { score: number; reasoning: string };
  novelty: { score: number; reasoning: string };
  implementation_complexity: { level: string; reasoning: string };
  strengths: string[];
  risks: string[];
  suggestions: string[];
  problem_statement: string;
  elevator_pitch: string;
  key_objectives: string[];
  success_metrics: string[];
}

export const discoverIdea = async (idea: string): Promise<DiscoveryResult> => {
  const response = await apiClient.post<DiscoveryResult>('/discover', { idea });
  return response.data;
};

export const getProject = async (projectId: string) => {
  const response = await apiClient.get(`/projects/${projectId}`);
  return response.data;
};
