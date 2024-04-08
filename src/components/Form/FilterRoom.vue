<template lang="">
  <v-form v-on:submit.prevent="store.FilterRooms(Select)">
    <v-row>
      <v-col cols="8">
        <v-select
          v-model="Select"
          label="Chọn dãy"
          density="compact"
          :items="['Tất cả', 'Dãy A', 'Dãy B']"
          variant="solo"
        ></v-select>
      </v-col>
      <v-col cols="4">
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
      Select: "Tất cả",
    };
  },
};
</script>
<style lang=""></style>
