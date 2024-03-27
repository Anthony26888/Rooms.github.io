<template lang="">
  <form >
    <v-card-text>
      <VRow>
        <VCol cols="4">
          <v-card>
            <v-card-text>Thời gian: {{ DateNow }}</v-card-text>
          </v-card>
        </VCol>

        <VCol cols="6"></VCol>
      </VRow>

      <VRow>
        <VCol cols="2">
          <h3 class="text-start mt-4">Điện</h3>
        </VCol>
        <VCol cols="3">
          <v-text-field
            variant="outlined"
            label="Số cũ"
            v-model="ElectricOld"
            type="number"
            suffix="Kw"
            :rules="[rules.required]"
          ></v-text-field>
        </VCol>
        <VCol cols="3">
          <v-text-field
            variant="outlined"
            label="Số mới"
            v-model="ElectricNew"
            type="number"
            suffix="Kw"
            :rules="[rules.required]"
          ></v-text-field>
        </VCol>
        <VCol cols="4">
          <div class="d-flex text-center mt-4">
            <h3>= {{ ResultElectric }}</h3>
            <p class="ms-2">Kw</p>
          </div>
        </VCol>
      </VRow>

      <!--
      <VRow>
        <VCol cols="2">
          <h3 class="text-center mt-4">Nước</h3>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số cũ"
            v-model="WaterOld"
            type="num"
            suffix="m3"
            :rules="[rules.required]"
            disabled
          ></v-text-field>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số mới"
            v-model="WaterNew"
            type="num"
            suffix="m3"
            :rules="[rules.required]"
            disabled
          ></v-text-field>
        </VCol>
        <VCol cols="2">
          <div class="d-flex text-center mt-4">
            <h3>= {{ ResultWater }}</h3>
            <p class="ms-2">m³</p>
          </div>
        </VCol>
      </VRow>
      -->

      <VRow>
        <VCol cols="2">
          <h3 class="text-start mt-4">Tiền khác</h3>
        </VCol>
        <VCol cols="8">
          <v-text-field v-model="OtherCharge" suffix="vnđ"></v-text-field>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="2">
          <h3 class="text-start mt-4">Tiền nợ</h3>
        </VCol>
        <VCol cols="8">
          <v-text-field v-model="DebtCharge" suffix="vnđ"></v-text-field>
        </VCol>
      </VRow>

      <v-divider :thickness="5"></v-divider>

      <table class="table w-100 pa-3 pb-3">
        <tbody class="table-group-divider">
          <tr>
            <th scope="row" class="text-start">Tiền phòng</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ RoomCharge }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Điện</th>
            <td></td>
            <td></td>
            <td class="text-end">
              {{ ElectricCharge }}
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-start">
              Nước ({{ store.editRoom.qty }} người)
            </th>
            <td></td>
            <td></td>
            <td class="text-end">{{ WaterCharge }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Rác</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ TrashCharge.toLocaleString("en-US") }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Wifi</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ WifiCharge.toLocaleString("en-US") }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Cáp</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ CableCharge.toLocaleString("en-US") }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Tiền khác</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ OtherCharge.toLocaleString("en-US") }}</td>
          </tr>
        </tbody>
      </table>

      <v-divider :thickness="2"></v-divider>

      <VRow class="mt-2">
        <VCol cols="2">
          <h2 class="ma-1 mb-1 mt-2">Tổng:</h2>
        </VCol>
        <VCol cols="8"></VCol>
        <VCol cols="2" class="text-end">
          <h3>{{ Total.toLocaleString("en-US") }}</h3>
        </VCol>
      </VRow>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        color="primary"
        @click="
          store.CaculatorCharge(
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
            Status,
          );
          store.Parameter(ElectricNew);
          store.Debt(Total)
        "
        >Lưu</v-btn
      >
    </v-card-actions>
  </form>
</template>
<script setup>
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
store.fetchService();
export default {
  name: "RoomCharge",
  data() {
    return {
      List: ["Tiền phòng", "Điện", "Nước", "Rác + Wifi", "Tiền khác"],

      ElectricOld: store.editRoom.electric,
      ElectricNew: 0,
      WaterOld: 0,
      WaterNew: 0,
      ResultElectric: 0,
      ResultWater: 0,

      OtherCharge: 0,
      Total: 0,
      WaterCharge: 0,
      ElectricCharge: 0,
      RoomCharge: store.editRoom.roomcharge,
      TrashCharge: store.service.Trash,
      WifiCharge: 0,
      CableCharge: 0,
      DebtCharge: 0,

      DateNow: "",
      NameRoom: store.editRoom.number,
      Status: false,
      rules: {
        required: (value) => !!value || "Nhập thông tin",
      },
      Month:0,
      Year:0,
      Time:"",     
    };
  },
  mounted() {
    setInterval(() => {
      //Old and New
      this.ResultElectric = this.ElectricNew - this.ElectricOld;
      this.ResultWater = this.WaterNew - this.WaterOld;

      //Electric
      const Charge0 = store.service.Electric0;
      const Charge50 = store.service.Electric50;
      const Charge100 = store.service.Electric100;
      const Charge200 = store.service.Electric200;
      const Charge300 = store.service.Electric300;
      if (this.ResultElectric <= 50) {
        this.ElectricCharge = this.ResultElectric * Charge0;
      } else if (this.ResultElectric > 50 && this.ResultElectric <= 100) {
        this.ElectricCharge =
          (this.ResultElectric - 50) * Charge50 + Charge0 * 50;
      } else if (this.ResultElectric > 100 && this.ResultElectric <= 200) {
        this.ElectricCharge =
          (this.ResultElectric - 100) * Charge100 +
          Charge50 * 50 +
          Charge0 * 50;
      } else if (this.ResultElectric > 200 && this.ResultElectric <= 300) {
        this.ElectricCharge =
          (this.ResultElectric - 200) * Charge200 +
          Charge100 * 100 +
          Charge50 * 50 +
          Charge0 * 50;
      } else if (this.ResultElectric > 300 && this.ResultElectric <= 400) {
        this.ElectricCharge =
          (this.ResultElectric - 300) * Charge300 +
          Charge200 * 100 +
          Charge100 * 100 +
          Charge50 * 50 +
          Charge0 * 50;
      } else {
        this.ElectricCharge = 0;
      }

      //Water
      this.WaterCharge = store.service.Water * store.editRoom.qty;

      //Service
      if (store.editRoom.cable == "true") {
        this.CableCharge = store.service.Cable;
      } else {
        this.CableCharge = 0;
      }

      if (store.editRoom.wifi == "true") {
        this.WifiCharge = store.service.Wifi;
      } else {
        this.WifiCharge = 0;
      }

      //Total
      this.Total =
        Number(this.RoomCharge) +
        this.ElectricCharge +
        this.WaterCharge +
        Number(this.WifiCharge) +
        Number(this.CableCharge) +
        Number(this.TrashCharge) +
        Number(this.OtherCharge) -
        Number(this.DebtCharge);


      const now = new Date()
      const Day = now.getDate()
      const Month = now.getMonth() +1
      const Year = now.getFullYear()
      this.Time = Month + "/" +Year
      this.DateNow = Year + "-" + Month + "-" + Day
    }, 10);
  },
  computed: {
    
  },
};
</script>
<style lang=""></style>
