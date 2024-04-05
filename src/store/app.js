// Utilities
import axios from "axios";
import { defineStore } from "pinia";
import User from "@/api/User.json";
import { useLocalStorage } from "@vueuse/core";
export const useAppStore = defineStore("app", {
  state: () => {
    return {
      User,
      NumberRoom: "",
      IdRoom: useLocalStorage("IdRoom", ""),
      IdMember: "",
      IdPay: "",
      Room: [],
      profile: [],
      member: [],
      pay: [],
      editRoom: [],
      editPay: [],
      service: [],
      FilterTime: null,
      FilterPay: [],
      Sum: 0,
      Debt: 0,
      Paid: 0,
      Pay: 0,
      NewProfile:false
    };
  },
  getters: {
    Filter() {
      let sum = 0;
      let debt = 0;
      const array = this.pay.filter((value) => value.time === this.FilterTime);
      const checkTrue = array.filter((value) => value.status === true);
      const checkFalse = array.filter((value) => value.status === false);
      checkTrue.forEach(function (value) {
        sum += parseFloat(value.total);
      });
      checkFalse.forEach(function (value) {
        debt += parseFloat(value.total);
      });
      this.Sum = sum;
      this.Debt = debt;
      this.Paid = checkTrue.length;
      this.Pay = checkFalse.length;
      if (this.FilterTime == null) {
        const array = this.pay;
        const checkTrue = array.filter((value) => value.status === true);
        const checkFalse = array.filter((value) => value.status === false);
        checkTrue.forEach(function (value) {
          sum += parseFloat(value.total);
        });
        checkFalse.forEach(function (value) {
          debt += parseFloat(value.total);
        });
        this.Sum = sum;
        this.Debt = debt;
        this.Paid = checkTrue.length;
        this.Pay = checkFalse.length;
        return array;
      }
      return array;
    },
  },
  actions: {
    //Fetch api room
    async fetchRoom() {
      setInterval(async () => {
        const res = await fetch("https://data-room-l5hx.onrender.com/Room");
        this.Room = await res.json();
      }, 1000);
      
    },

    //Create a new room
    async CreateRoom(
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
        .post("https://data-room-l5hx.onrender.com/Room", {
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
        .then((response) => console.log(response.data))
        .then((error) => console.log(error));
      
    },

    //Edit profile of room
    async EditRoom(
      LocationRoom,
      NameRoom,
      QtyMember,
      RoomCharge,
      DateRoom,
      WifiService,
      CableService
    ) {      
      axios
        .put(`https://data-room-l5hx.onrender.com/Room/${this.IdRoom}`, {
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
    async Checkout() {
      axios
        .patch("https://data-room-l5hx.onrender.com/Room/" + this.IdRoom, {
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
      const res = await fetch("https://data-room-l5hx.onrender.com/Profile?room=" + number);
      this.profile = await res.json();
      this.NumberRoom = number
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
      this.NewProfile = false
      axios
        .post("https://data-room-l5hx.onrender.com/Profile", {
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
        .put(`https://data-room-l5hx.onrender.com/Profile/${IdMember}`, {
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
        .delete("https://data-room-l5hx.onrender.com/Profile/" + this.IdMember)
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },

    //Fetch service Charge
    fetchService() {
      setInterval(async () => {
        this.service = this.User.Service[0];
      }, 100);
    },

    //Edit Electric
    EditElectric(Electric0, Electric50, Electric100, Electric200, Electric300) {
      axios
        .patch(`https://data-room-l5hx.onrender.com/Service/0`, {
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
        .patch(`https://data-room-l5hx.onrender.com/Service/0`, {
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
        .patch(`https://data-room-l5hx.onrender.com/Service/0`, {
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
        .patch(`https://data-room-l5hx.onrender.com/Service/0`, {
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
        this.pay = this.User.History;
      }, 100);
    },

    //Fetch select time for pay

    FilterTimePay(select) {
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
        .post("https://data-room-l5hx.onrender.com/History", {
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
    DeletePaid() {
      axios
        .delete("https://data-room-l5hx.onrender.com/History/" + this.IdPay)
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
        .patch("https://data-room-l5hx.onrender.com/Room/" + this.IdRoom, {
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
        .patch("https://data-room-l5hx.onrender.com/History/" + id, {
          status: true,
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
      this.editRoom = this.Room.find((value) => value.id === id);
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
