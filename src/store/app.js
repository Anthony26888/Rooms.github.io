// Utilities
import { defineStore } from "pinia";
import User from "@/api/User.json";
import { useLocalStorage } from "@vueuse/core";
export const useAppStore = defineStore("app", {
  state: () => {
    return {
      User,
      Info: useLocalStorage("Info", []),    
      Person: useLocalStorage("Person", []),
    };
  },
  getters: {
    Old() {
      return this.User.filter((value) => value.type == "Old");
    },
    
  },
  actions: {
    GetDetail(id){
      this.Info = this.User.find(value => value.id === id)      
    },
    GetPerson(id){     
      this.Person = this.Info.Family.find(value => value.id === id)      
    }
  },
});
