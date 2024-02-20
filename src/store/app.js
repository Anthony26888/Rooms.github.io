// Utilities
import { defineStore } from "pinia";
import User from "@/api/User.json";
import { useLocalStorage } from "@vueuse/core";
export const useAppStore = defineStore("app", {
  state: () => {
    return {
      User,
      Info: useLocalStorage("Info", []),     
    };
  },
  getters: {
    Old() {
      return this.User.filter((value) => value.type == "Old");
    },
    
  },
  actions: {
    
  },
});
