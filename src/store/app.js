// Utilities
import axios from "axios";
import { defineStore } from "pinia";
import User from "@/api/User.json";
import { useLocalStorage } from "@vueuse/core";
export const useAppStore = defineStore("app", {
  state: () => {
    return {
      User,
      NumberRoom: useLocalStorage("NumberRoom", ""),
      IdRoom: useLocalStorage("IdRoom", ""),
      IdMember: useLocalStorage("IdMember", ""),
      data: [],
      profile: [],
      member: [],
      pay: [],
      editRoom: [],
      service: [],
      payment:0,
      debt:0,
    };
  },
  getters: {
    FilterPaid() {
      return this.pay.filter((value) => value.status === "true");
    },
    FilterNotPay() {
      return this.pay.filter((value) => value.status === "false");
    },
  },
  actions: {
     //Fetch service Charge
    FetchService() {
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/Service");
      this.service = await res.json();  
      }, 100); 
      
    },

    //Fetch api room
    fetchRoom() {
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/Room");
        this.data = await res.json();
      }, 100);      
    },

    //Fetch api list of member
    fetchProfile(number) {
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/Profile?room=" + number);
        this.profile = await res.json();
      }, 100);
      // Assuming your JSON file is in the public folder
      
    },

    //Fetch api pay of room
    fetchPay(){
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/History") 
        this.pay = await res.json();
      }, 100);
    },
   

    //Fetch api payment of room
    fetchPayment() {      
      // Assuming your JSON file is in the public folder
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/Profit/0");
        this.payment = await res.json();
      }, 100);
    },

    //Fetch api debt of room
    fetchDebt() {      
      // Assuming your JSON file is in the public folder
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/Profit/0");
        this.debt = await res.json();
      }, 100);
    },





    GetDetail(id) {
      this.Info = this.data.find((value) => value.id === id);
    },
    GetRoom(number, id) {
      //Get id room for create new member
      this.NumberRoom = number;
      this.IdRoom = id;
    },
    GetIdMember(id) {
      this.IdMember = id;
    },

    //Create a new room
    CreateRoom(
      LocationRoom,
      QtyMember,
      NameRoom,
      RoomCharge,
      DateRoom,
      WifiService,
      CableService,
      LastElectric
    ) {
      axios
        .post("http://localhost:3000/Room", {
          number: NameRoom,
          qty: QtyMember,
          location: LocationRoom,
          date: DateRoom,
          roomcharge: RoomCharge,
          wifi: WifiService,
          cable: CableService,
          electric: LastElectric,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Create a new member in that room
    CreateMember(
      NameMember,
      BirthMember,
      PhoneMember,
      SexMember,
      CccdMember,
      WorkMember,
      LocationMember
    ) {
      axios
        .post("http://localhost:3000/Profile", {
          room: this.NumberRoom,
          name: NameMember,
          birth: BirthMember,
          location: LocationMember,
          phone: PhoneMember,
          sex: SexMember,
          cccd: CccdMember,
          work: WorkMember,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Edit profile of member
    EditMember(
      IdMember,
      NameMember,
      BirthMember,
      PhoneMember,
      SexMember,
      CccdMember,
      WorkMember,
      LocationMember
    ) {
      axios
        .put(`http://localhost:3000/Profile/${IdMember}`, {
          name: NameMember,
          room: this.NumberRoom,
          birth: BirthMember,
          location: LocationMember,
          phone: PhoneMember,
          sex: SexMember,
          cccd: CccdMember,
          work: WorkMember,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Edit profile of room
    EditRoom(
      LocationRoom,
      NameRoom,
      QtyMember,
      RoomCharge,
      DateRoom,
      WifiService,
      CableService
    ) {
      axios
        .put(`http://localhost:3000/Room/${this.IdRoom}`, {
          location: LocationRoom,
          number: NameRoom,
          qty: QtyMember,
          roomcharge: RoomCharge,
          date: DateRoom,
          wifi: WifiService,
          cable: CableService,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Delete profile of member
    DeleteMember() {
      axios
        .delete("http://localhost:3000/Profile/" + this.IdMember)
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Delete room
    DeleteRoom() {
      axios
        .delete("http://localhost:3000/Room/" + this.IdRoom)
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

   

    //Fetch api profile of member
    fetchMember(id) {
      // Assuming your JSON file is in the public folder
      this.member = this.profile.find((value) => value.name === id);
    },

    //Fetch api profile of room for edit
    fetchEditRoom(id) {
      // Assuming your JSON file is in the public folder
      this.editRoom = this.data.find((value) => value.id === id);
    },

    //Caculator Room Charge
    CaculatorCharge(
      DateNow,
      NameRoom,
      RoomCharge,
      ElectricCharge,
      WaterCharge,
      TrashCharge,
      WifiCharge,
      CableCharge,
      OtherCharge,
      Total,
      Status
    ) {
      axios
        .post("http://localhost:3000/History", {
          status: Status,
          date: DateNow,
          name: NameRoom,
          roomcharge: RoomCharge,
          electric: ElectricCharge,
          water: WaterCharge,
          trash: TrashCharge,
          wifi: WifiCharge,
          cable: CableCharge,
          other: OtherCharge,
          total: Total,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Parameter of Electric and Water
    Parameter(ElectricNew) {
      axios
        .patch(`http://localhost:3000/Room/${this.IdRoom}`, {
          electric: ElectricNew,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Accept paid room charge
    PaidCharge(id) {
      axios
        .patch("http://localhost:3000/History/" + id, {
          status: "true",
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },


    //Payment
    Payment(total) {      
      axios
        .put(`http://localhost:3000/Profit/0`, {
          income: this.payment.income + Number(total),
          debt: 0         
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });      
    },
  },
});
