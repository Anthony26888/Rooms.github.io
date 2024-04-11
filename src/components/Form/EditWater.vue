<template lang="">
  <v-form v-on:submit="store.EditWater(Water);store.AlertSuccess = true">
    <v-card-text>
      <v-text-field
        label="Giá tiền nước /m³"
        variant="outlined"
        v-model="Water"
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
      Water: store.service[0].Water,
    };
  },
};
</script>
<style lang=""></style>
