<template lang="">
  <v-form v-on:submit="store.EditMore(Wifi, Cable);store.AlertSuccess = true">
    <v-card-text>
      <v-text-field
        label="Giá tiền wifi"
        variant="outlined"
        v-model="Wifi"
      ></v-text-field>
      <v-text-field
        label="Giá tiền cáp"
        variant="outlined"
        v-model="Cable"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>      
      <v-btn type="submit" class="w-100 bg-primary">Lưu</v-btn>
    </v-card-actions>
  </v-form>
</template>
<script setup>
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
store.fetchService();
export default {
  data() {
    return {
      Wifi: store.service[0].Wifi,
      Cable: store.service[0].Cable,
    };
  },
};
</script>
<style lang=""></style>
