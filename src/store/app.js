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
      NumberRoom: useLocalStorage("NumberRoom", ""), 
      IdMember: useLocalStorage("IdMember", ""),    
      data:[],
      profile:[],
      member:[]
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
    GetNumberRoom(id){
      //Get id room for create new member
      this.NumberRoom = id
    },
    GetIdMember(id){
      this.IdMember=id
    },

    //Create a new room
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

    //Create a new member in that room
    CreateMember(NameMember, BirthMember, PhoneMember, SexMember, CccdMember, WorkMember, LocationMember){
      axios
        .post("http://localhost:3000/Profile",{
          room: this.IdRoom,
          name: NameMember,
          birth: BirthMember,
          location: LocationMember,
          phone: PhoneMember,
          sex:  SexMember,
          cccd: CccdMember,
          work: WorkMember
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Edit profile of member
    EditMember(IdMember, NameMember, BirthMember, PhoneMember, SexMember, CccdMember, WorkMember, LocationMember){
      axios
        .put(`http://localhost:3000/Profile/${IdMember}`,{          
          name: NameMember,
          room: this.IdRoom,
          birth: BirthMember,
          location: LocationMember,
          phone: PhoneMember,
          sex:  SexMember,
          cccd: CccdMember,
          work: WorkMember
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Delete profile of member
    DeleteMember(){
      axios
        .delete("http://localhost:3000/Profile/"+ this.IdMember)
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Fetch api room
    async fetchRoom() {
      // Assuming your JSON file is in the public folder
      const res = await fetch('http://localhost:3000/Room')
      this.data = await res.json()
    },

    //Fetch api list of member
    async fetchProfile(number) {
      // Assuming your JSON file is in the public folder
      const res = await fetch('http://localhost:3000/Profile?room=' + number)
      this.profile = await res.json()      
    },

    //Fetch api prpfile of member
    fetchMember(id) {
      // Assuming your JSON file is in the public folder
      this.member = this.profile.find((value) => value.name === id);
    }
  },
});
