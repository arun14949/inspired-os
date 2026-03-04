import { defineStore } from "pinia";
import projectsData from "~/content/projects.json";
import gamesData from "~/content/games.json";
import experimentsData from "~/content/experiments.json";

export const useContentStore = defineStore("content", {
  state: () => ({
    projects: projectsData,
    games: gamesData,
    experiments: experimentsData,
  }),

  actions: {
    getItemsByType(type) {
      return this[type] || [];
    },
  },
});
