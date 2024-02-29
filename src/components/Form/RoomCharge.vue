<template lang="">
  <form>
    <v-card-text>
      <v-select
        class="w-25"
        label="Tháng"
        :items="Calander"
        variant="underlined"
      ></v-select>

      <VRow>
        <VCol cols="2">
          <h3 class="text-center mt-4">Điện</h3>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số cũ"
            v-model="ElectricOld"
            type="num"
            suffix="Kw"
          ></v-text-field>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số mới"
            v-model="ElectricNew"
            type="num"
            suffix="Kw"
          ></v-text-field>
        </VCol>
        <VCol cols="2">
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
            disabled
          ></v-text-field>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số mới"
            v-model="WaterNew"
            type="num"
            suffix="m3"
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
          <h3 class="text-center mt-4">Tiền khác</h3>
        </VCol>
        <VCol cols="8">
          <v-text-field v-model="OtherCharge" suffix="vnđ"></v-text-field>
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
            <td class="text-end">{{ TrashCharge }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Wifi</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ WifiCharge }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Cáp</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ CableCharge }}</td>
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
          <h3>{{ Total }}</h3>
        </VCol>
      </VRow>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="submit" color="primary">Lưu</v-btn>
    </v-card-actions>
  </form>
</template>
<script setup>
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
store.FetchService();
export default {
  name: "FormRoomCharge",
  data() {
    return {
      List: ["Tiền phòng", "Điện", "Nước", "Rác + Wifi", "Tiền khác"],
      Calander: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      ElectricOld: "",
      ElectricNew: "",
      WaterOld: "",
      WaterNew: "",
      ResultElectric: "",
      ResultWater: "1",
      OtherCharge: "0",
      Total: "",
      WaterCharge: "0",
      ElectricCharge: "0",
      RoomCharge: Number(store.editRoom.roomcharge).toLocaleString("en-US"),
      TrashCharge: Number(store.service[0].Trash).toLocaleString("en-US"),
      WifiCharge: "0",
      CableCharge: "0",
    };
  },
  mounted() {
    setInterval(() => {

      //Old and New
      this.ResultElectric = this.ElectricNew - this.ElectricOld;
      this.ResultWater = this.WaterNew - this.WaterOld;
      
      //Electric
      const Charge0 = store.service[0].Electric0
      const Charge50 = store.service[0].Electric50
      const Charge100 = store.service[0].Electric100
      const Charge200 = store.service[0].Electric200
      const Charge300 = store.service[0].Electric300
      if(this.ResultElectric < 50){
        this.ElectricCharge = Number(this.ResultElectric * Charge0).toLocaleString("en-US");
      }
      else if(this.ResultElectric > 50 && this.ResultElectric < 100){
        this.ElectricCharge = Number((this.ResultElectric - 50)*Charge50 + (Charge0*50)).toLocaleString("en-US");
      }
      else if(this.ResultElectric > 100 && this.ResultElectric < 200){
        this.ElectricCharge = Number((this.ResultElectric - 100)*Charge100 + (Charge50 *100)).toLocaleString("en-US");
      }
      else if(this.ResultElectric > 200 && this.ResultElectric < 300){
        this.ElectricCharge = Number((this.ResultElectric - 200)*Charge200 + (Charge100 *200)).toLocaleString("en-US");
      }
      else if(this.ResultElectric > 300 && this.ResultElectric < 400){
        this.ElectricCharge = Number((this.ResultElectric - 300)*Charge300 + (Charge200 *300)).toLocaleString("en-US");
      }
      else{
        this.ElectricCharge = 0
      }
      

      //Water
      this.WaterCharge = Number(
        store.service[0].Water * store.editRoom.qty
      ).toLocaleString("en-US");
      
      //Service
      if (store.editRoom.cable == "true") {
        this.CableCharge = Number(store.service[0].Cable).toLocaleString(
          "en-US"
        );
      }else{
        this.CableCharge=Number(0)
      }

      if (store.editRoom.wifi == "true") {
        this.WifiCharge = Number(store.service[0].Wifi).toLocaleString(
          "en-US"
        )
      }else{
        this.WifiCharge= Number(0)
      }

      //Total
      const Electric = this.ElectricCharge
      this.Total = (
        this.RoomCharge + Electric
      ).toLocaleString("en-US");
    }, 10);
  },
};
</script>
<style lang=""></style>
