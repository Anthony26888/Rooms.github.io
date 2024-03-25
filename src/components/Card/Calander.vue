<template lang="">
  <VRow>
    <VCol cols="3">
      <v-select
        v-model="SelectMonth"
        width="200"
        label="Chọn thời gian"
        :items="List"
        variant="solo"
        @click="store.FilterTimePay(SelectMonth)"
      ></v-select>
    </VCol>
    <VCol cols="9"></VCol>
    
  </VRow>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
export default {
  name: "Calender",
  data() {
    return {
      List: [
        "1/2024",
        "2/2024",
        "3/2024",
        "4/2024",
        "5/2024",
        "6/2024",
        "7/2024",
        "8/2024",
        "9/2024",
        "10/2024",
        "11/2024",
        "12/2024",
      ],
      SelectMonth: "",
    };
  },
  mounted(){
    const now = new Date()
    const Month = now.getMonth() +1
    const Year = now.getFullYear()
    this.SelectMonth = Month + "/" +Year
    
  }
};
</script>
<style lang=""></style>
