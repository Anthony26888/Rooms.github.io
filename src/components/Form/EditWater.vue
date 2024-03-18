<template lang="">
  <v-form>
    <v-card-text>
      <v-text-field
        label="Giá tiền /m³"
        variant="outlined"
        v-model="Water"
      ></v-text-field>      
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" type="submit">Lưu</v-btn>
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
            Water:store.service.Water
        }
    },
};
</script>
<style lang=""></style>
