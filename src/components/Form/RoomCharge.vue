<template lang="">
  <form
    v-on:submit.prevent="
      store.CaculatorCharge(
        DateNow,        
        NameRoom,
        RoomCharge,
        ElectricCharge,
        WaterCharge,
        TrashCharge,
        WifiCharge,
        CableCharge,
        DebtCharge,
        Total,
        Status
      );
      store.Parameter(ElectricNew);
    "
  >
    <v-card-text>
      <VRow>
        <VCol xs="12" sm="4">
          <v-card>
            <v-card-text>Thời gian: {{ DateNow }}</v-card-text>
          </v-card>
        </VCol>
      </VRow>
      <h3 class="text-start mt-4">Điện</h3>
      <VRow class="mt-1">
        <VCol cols="5">
          <v-text-field
            variant="outlined"
            label="Số cũ"
            v-model="ElectricOld"
            type="number"
            suffix="Kw"
            :rules="[rules.required]"
            readonly
          ></v-text-field>
        </VCol>
        <VCol cols="5">
          <v-text-field
            variant="outlined"
            label="Số mới"
            v-model="ElectricNew"
            type="number"
            suffix="Kw"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </VCol>
        <VCol cols="2">
          <div class="d-flex text-center mt-4">
            <h3>={{ ResultElectric }}</h3>
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

      <h3 class="text-start">Tiền nợ</h3>
      <VRow class="mt-1">
        <VCol cols="12">
          <v-text-field
            v-model="DebtCharge"
            suffix="vnđ"
            variant="outlined"
          ></v-text-field>
        </VCol>
      </VRow>

      <v-divider :thickness="5"></v-divider>

      <table class="table w-100 pa-3 pb-3">
        <tbody class="table-group-divider">
          <tr>
            <td scope="row" class="text-start">Tiền phòng:</td>
            <td></td>
            <td></td>
            <td class="text-end">{{ Number(RoomCharge).toLocaleString("en-GB") }}</td>
          </tr>
          <tr>
            <td scope="row" class="text-start">Điện:</td>
            <td></td>
            <td></td>
            <td class="text-end">
              {{ Number(ElectricCharge).toLocaleString("en-GB") }}
            </td>
          </tr>
          <tr>
            <td scope="row" class="text-start">
              Nước: ({{ store.editRoom.qty }} người)
            </td>
            <td></td>
            <td></td>
            <td class="text-end">{{ Number(WaterCharge).toLocaleString("en-GB") }}</td>
          </tr>
          <tr>
            <td scope="row" class="text-start">Rác:</td>
            <td></td>
            <td></td>
            <td class="text-end">{{ Number(TrashCharge).toLocaleString("en-GB") }}</td>
          </tr>
          <tr>
            <td scope="row" class="text-start">Wifi:</td>
            <td></td>
            <td></td>
            <td class="text-end">{{ Number(WifiCharge).toLocaleString("en-GB") }}</td>
          </tr>          
          <tr>
            <td scope="row" class="text-start">Tiền nợ</td>
            <td></td>
            <td></td>
            <td class="text-end">{{ Number(DebtCharge).toLocaleString("en-GB") }}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th scope="row" class="text-start"><h3>Tổng:</h3></th>
            <td></td>
            <td></td>
            <th class="text-end"><h3>{{ Number(Total).toLocaleString("en-GB") }}</h3></th>
          </tr>
        </tfoot>
      </table>
    <v-btn class="w-100 2" type="submit" color="primary">Lưu</v-btn>

    </v-card-text>
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

      Total: 0,
      WaterCharge: 0,
      ElectricCharge: 0,
      RoomCharge: store.editRoom.roomcharge,
      TrashCharge: store.service[0].Trash,
      WifiCharge: 0,      
      DebtCharge: 0,

      DateNow: "",
      NameRoom: store.editRoom.number,
      Status: false,
      rules: {
        required: (value) => !!value || "Nhập thông tin",
      }, 
    };
  },
  mounted() {
    setInterval(() => {
      //Old and New

      const checkElectric = this.ElectricNew - this.ElectricOld;
      if (checkElectric > 0) {
        this.ResultElectric = checkElectric;
      } else {
        this.ResultElectric = 0;
      }
      //const checkWater = this.WaterNew - this.WaterOld;
      //if( checkWater > 0){
      // this.ResultWater = checkWater
      //}else{
      // this.ResultWater = 0
      //}

      //Electric
      const Charge0 = store.service[0].Electric0;
      const Charge50 = store.service[0].Electric50;
      const Charge100 = store.service[0].Electric100;
      const Charge200 = store.service[0].Electric200;
      const Charge300 = store.service[0].Electric300;
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
      this.WaterCharge = store.service[0].Water * store.editRoom.qty;

      //Service
      if (store.editRoom.wifi == "true") {
        this.WifiCharge = store.service[0].Wifi;
      } else {
        this.WifiCharge = 0;
      }

      //Total
      this.Total =
        Number(this.RoomCharge) +
        this.ElectricCharge +
        this.WaterCharge +
        Number(this.WifiCharge) +        
        Number(this.TrashCharge) -
        Number(this.DebtCharge);

      const now = new Date();
      const Day = now.getDate();
      const Month = now.getMonth() + 1;
      const Year = now.getFullYear();      
      this.DateNow = Day + "/" + Month + "/" + Year;
    }, 10);
  },
  computed: {},
};
</script>
<style lang=""></style>
