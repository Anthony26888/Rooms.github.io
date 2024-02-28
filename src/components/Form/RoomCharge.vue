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
          ></v-text-field>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số mới"
            v-model="WaterNew"
            type="num"
            suffix="m3"
          ></v-text-field>
        </VCol>
        <VCol cols="2">
          <div class="d-flex text-center mt-4">
            <h3>= {{ ResultWater }}</h3>
            <p class="ms-2">m³</p>
          </div>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="2">
          <h3 class="text-center mt-4">Tiền khác</h3>
        </VCol>
        <VCol cols="10">
          <v-text-field model-value="0" suffix="vnđ"></v-text-field>
        </VCol>
      </VRow>

      <v-divider :thickness="5"></v-divider>

      <table class="table table-borderless w-100 pa-3 pb-3">     
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
            <td class="text-end">{{ ElectricCharge }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Nước</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ WaterCharge }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Wifi + Rác</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ ServiceCharge }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Tiền khác</th>
            <td></td>
            <td></td>
            <td class="text-end">{{ OtherCharge }}</td>
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
          <h2>{{ Total }}</h2>
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
      ResultWater: "",
      RoomCharge: Number(store.editRoom.roomcharge),
      OtherCharge: "",
      ServiceCharge:"",
      Total:"",
      WaterCharge:"0",
      ElectricCharge:"0"
    };
  },
  mounted() {
    setInterval(() => {
      this.ResultElectric = this.ElectricNew - this.ElectricOld;
      this.ResultWater = this.WaterNew - this.WaterOld;
      this.Total = this.RoomCharge + (this.ResultElectric * 35000) + (this.ResultWater * 20000);
      this.ElectricCharge = this.ResultElectric * 35000
      this.WaterCharge = this.ResultWater * 35000
    }, 10);
  },
};
</script>
<style lang=""></style>
