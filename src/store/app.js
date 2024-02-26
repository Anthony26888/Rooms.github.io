// Utilities
import axios from 'axios';
import { defineStore } from "pinia";
import User from "@/api/User.json";
import { useLocalStorage } from "@vueuse/core";
export const useAppStore = defineStore("app", {
  state: () => {
    return {
      User,
      Info: useLocalStorage("Info", []),
      Person: useLocalStorage("Person", []),     
      data:[],
      NumberRoom:""

    };
  },
  getters: {
    Old() {
      return this.User.filter((value) => value.type == "Old");
    },
    
  },
  actions: {
    GetDetail(id) {
      this.Info = this.data.find((value) => value.id === id);
    },
    GetPerson(id) {
      this.Person = this.Info.Family.find((value) => value.id === id);
    },
    CreateRoom() {      
      axios
        .post("http://localhost:3000/Profile",{
          number:this.NumberRoom,
          type: "Old",
          qty: "4",
          date: "01/12/2023",
          roomcharge: "1500000",
          wifi: true,
          cable: false
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },
    async fetch() {
      // Assuming your JSON file is in the public folder
      const res = await fetch('http://localhost:3000/Profile')
      this.data = await res.json()
    }
  },
});
