<template lang="">
  <v-form v-on:submit.prevent="store.FilterTimePay(SelectMonth)">
    <VRow>
      <VCol xs="12" md="3">
        <v-select
          v-model="SelectMonth"
          label="Chọn thời gian"
          :items="List"
          variant="solo"
          density="compact"
        ></v-select>
      </VCol>
      <VCol xs="12" md="3">
        <VBtn type="submit" color="success">Tìm kiếm</VBtn>
      </VCol>
      
    </VRow>
  </v-form>
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
  mounted() {
    
  },
};
</script>
<style lang=""></style>
