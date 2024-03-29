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
      IdMember: "",
      IdPay: "",
      data: [],
      profile: [],
      member: [],
      pay: [],
      editRoom: [],
      editPay: [],
      service: [],
      payment: 0,
      debt: 0,
      FilterTime:"",
      Current:""
    };
  },
  getters: {
    FilterPaid() {
      return this.pay.filter((value) => value.status === true);
    },
    FilterNotPay() {
      return this.pay.filter((value) => value.status === false);
    },
    Time(){
      const now = new Date();
      const Month = now.getMonth() + 1;
      const Year = now.getFullYear();
      this.Current = Month + "/" + Year;
    },
    
    FilterPay(){
      if(this.FilterTime == ""){
        return this.pay.filter((value) => value.time === this.Current)
      }else{
        return this.pay.filter((value) => value.time === this.FilterTime)
      }
    }
  },
  actions: {
    //Fetch api room
    async fetchRoom() {
      const res = await fetch("http://localhost:3000/Room");
      this.data = await res.json();
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
          status: "true",
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
          status: "true",
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Delete room
    Checkout() {
      axios
        .patch("http://localhost:3000/Room/" + this.IdRoom, {
          qty: 0,
          status: false,
          date: "",
          wifi: false,
          cable: false,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Fetch api list of member
    async fetchProfile(number) {
      const res = await fetch("http://localhost:3000/Profile?room=" + number);
      this.profile = await res.json();
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



    //Fetch service Charge
    async fetchService() {
      const res = await fetch("http://localhost:3000/Service/0");
      this.service = await res.json();
    },

    //Edit Electric
    EditElectric(Electric0, Electric50, Electric100, Electric200, Electric300) {
      axios
        .patch(`http://localhost:3000/Service/0`, {
          Electric0: Electric0,
          Electric50: Electric50,
          Electric100: Electric100,
          Electric200: Electric200,
          Electric300: Electric300,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Edit Water
    EditWater(Water) {
      axios
        .patch(`http://localhost:3000/Service/0`, {
          Water: Water,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Edit Trash
    EditTrash(Trash) {
      axios
        .patch(`http://localhost:3000/Service/0`, {
          Trash: Trash,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Edit Wifi and Cable
    EditMore(Wifi, Cable) {
      axios
        .patch(`http://localhost:3000/Service/0`, {
          Wifi: Wifi,
          Cable: Cable,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },


    //Fetch api pay of room
    fetchPay() {
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/History");
        this.pay = await res.json();
      }, 100);
    },

    //Fetch select time for pay
    
    async FilterTimePay(select) {      
      this.FilterTime = select;
    },
    

    //Caculator Room Charge
    CaculatorCharge(
      DateNow,
      Time,
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
          time: Time,
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Delete Payment
    DeletePaid(id) {
      axios
        .delete("http://localhost:3000/History/" + id)
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },


    //Fetch api payment of room
    fetchPayment() {
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/Profit/0");
        this.payment = await res.json();
      }, 100);
    },

    fetchDebt() {
      setInterval(async () => {
        const res = await fetch("http://localhost:3000/Profit/0");
        this.debt = await res.json();
      }, 100);
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
          status: true,
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
        .patch(`http://localhost:3000/Profit/0`, {
          income: this.payment.income + Number(total),
          debt: this.payment.debt - Number(total),
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Debt
    Debt(total) {
      axios
        .patch(`http://localhost:3000/Profit/0`, {
          debt: this.payment.debt + Number(total),
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    

    DivPaid(total) {
      axios
        .patch(`http://localhost:3000/Profit/0`, {
          income: this.payment.income - Number(total),
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    DivPay(total) {
      axios
        .patch(`http://localhost:3000/Profit/0`, {
          debt: this.payment.debt - Number(total),
        })
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Fetch api profile of member
    fetchMember(name, id) {
      // Assuming your JSON file is in the public folder
      this.member = this.profile.find((value) => value.name === name);
      this.IdMember = id;
    },

    //Fetch api profile of room for edit
    fetchEditRoom(id) {
      // Assuming your JSON file is in the public folder
      this.editRoom = this.data.find((value) => value.id === id);
      this.IdRoom = id;
    },

    //Fetch api pay for edit
    fetchEditPay(id) {
      // Assuming your JSON file is in the public folder
      this.editPay = this.pay.find((value) => value.id === id);
    },

    

    GetIdPay(id) {
      this.IdPay = id;
    },

    
    

    
    
  },
});
