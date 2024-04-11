<template lang="">
  <v-form v-on:submit="store.EditTrash(Trash);store.AlertSuccess = true">
    <v-card-text>
      <v-text-field
        label="Giá tiền rác"
        variant="outlined"
        v-model="Trash"
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
      Trash: store.service[0].Trash,
    };
  },
};
</script>
<style lang=""></style>
