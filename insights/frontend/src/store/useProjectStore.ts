import { create } from 'zustand';

interface ProjectState {
  currentProjectId: string | null;
  setCurrentProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProjectId: null,
  setCurrentProject: (id) => set({ currentProjectId: id }),
}));
