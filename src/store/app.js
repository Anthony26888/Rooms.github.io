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
      profile:[]
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
    CreateRoom(LocationRoom, NameRoom, RoomCharge, DateRoom, WifiService, CableService) {      
      axios
        .post("http://localhost:3000/Room",{
          number:NameRoom,
          type: LocationRoom,
          qty: "0",
          date: DateRoom,
          roomcharge: RoomCharge,
          wifi:  WifiService,
          cable: CableService
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },
    CreateMember(NameMember, BirthMember, PhoneMember, SexMember, CccdMember, WorkMember, LocationMember){
      axios
        .post("http://localhost:3000/Room",{
          room: NameMember,
          type: LocationRoom,
          qty: "0",
          date: DateRoom,
          roomcharge: RoomCharge,
          wifi:  WifiService,
          cable: CableService
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },
    async fetchRoom() {
      // Assuming your JSON file is in the public folder
      const res = await fetch('http://localhost:3000/Room')
      this.data = await res.json()
    },
    async fetchProfile(number) {
      // Assuming your JSON file is in the public folder
      const res = await fetch('http://localhost:3000/Profile?room=' + number)
      this.profile = await res.json()
      
    }
  },
});
