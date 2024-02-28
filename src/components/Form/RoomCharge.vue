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
            suffix="Kw"
          ></v-text-field>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số mới"
            v-model="ElectricNew"
            suffix="Kw"
          ></v-text-field>
        </VCol>
        <VCol cols="2">
          <h3 class="text-center mt-4">= 35 Kw</h3>
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
            suffix="m3"
          ></v-text-field>
        </VCol>
        <VCol cols="4">
          <v-text-field
            label="Số mới"
            v-model="WaterNew"
            suffix="m3"
          ></v-text-field>
        </VCol>
        <VCol cols="2">
          <h3 class="text-center mt-4">= 35 m3</h3>
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

      <VRow class="mt-2">
        <VCol cols="2">
          <p v-for="item in List" :key="item" class="ma-1 mb-1">{{ item }}:</p>
        </VCol>
        <VCol cols="8"></VCol>
        <VCol cols="2" class="text-end">
          <p class="ma-1 mb-1">1500000</p>
          <p class="ma-1 mb-1">300000</p>
          <p class="ma-1 mb-1">65000</p>
          <p class="ma-1 mb-1">52000</p>
          <p class="ma-1 mb-1">0</p>
        </VCol>
      </VRow>

      <v-divider :thickness="2"></v-divider>

      <VRow class="mt-2">
        <VCol cols="2">
          <h2 class="ma-1 mb-1 mt-2">Tổng:</h2>
        </VCol>
        <VCol cols="8"></VCol>
        <VCol cols="2" class="text-end">
          <h2>1995000</h2>
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
const store = useAppStore();
</script>
<script>
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
    };
  },
};
</script>
<style lang=""></style>
