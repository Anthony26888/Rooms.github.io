<template lang="">
  <v-form v-on:submit.prevent="store.FilterTimePay(SelectMonth)">
    <VRow>
      <VCol cols="3">
        <v-select
          v-model="SelectMonth"
          label="Chọn thời gian"
          :items="List"
          variant="solo"
        ></v-select>
      </VCol>
      <VCol cols="2">
        <VBtn type="submit" class="mt-2">Tìm kiếm</VBtn>
      </VCol>
      <VCol cols="7"></VCol>
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
    const now = new Date();
    const Month = now.getMonth() + 1;
    const Year = now.getFullYear();
    this.SelectMonth = Month + "/" + Year
  },
};
</script>
<style lang=""></style>
