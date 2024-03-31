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
      FilterTime: null,
      Filter: [],
      FilterPay: [],
      Sum: 0,
      Debt: 0,
      Paid: 0,
      Pay: 0,
    };
  },
  getters: {
    Filter() {
      const now = new Date();
      const Month = now.getMonth() + 1;
      const Year = now.getFullYear();
      const Current = Month + "/" + Year;
      if (this.FilterTime == null) {
        return this.pay.filter((value) => value.time === Current);
      } else {
        return this.pay.filter((value) => value.time === this.FilterTime);
      }
    },
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
      const res = await fetch(`http://localhost:3000/History?time=${select}`);
      this.FilterPay = await res.json();
      let sum = 0;
      let debt = 0;
      const checkTrue = this.FilterPay.filter((value) => value.status === true);
      const checkFalse = this.FilterPay.filter(
        (value) => value.status === false
      );
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
    DeletePaid() {
      axios
        .delete("http://localhost:3000/History/" + this.IdPay)
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
        .patch("http://localhost:3000/Room/" + this.IdRoom, {
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
