<template lang="">
  <v-form v-on:submit.prevent="store.FilterRoom= Select">
    <v-row>
      <v-col cols="7">
        <v-select
          v-model="Select"
          label="Chọn dãy"
          density="compact"
          variant="solo"
          :items="List"         
        >
        <option>Dãy A</option>
        </v-select>
      </v-col>
      <v-col cols="5">
        <v-btn type="submit" color="success">Tìm</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
export default {
  name: "FilterRoom",
  data() {
    return {
      List:[
        'Tất cả',
        'Dãy A',
        'Dãy B'
      ],
      Select: "",
    };
  },
 
};
</script>
<style lang=""></style>
