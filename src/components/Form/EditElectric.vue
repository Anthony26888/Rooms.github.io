<template lang="">
  <v-form v-on:submit="store.EditElectric(Electric0, Electric50,Electric100, Electric200, Electric300)">
    <v-card-text>        
        <v-text-field label="51 - 100 Kw" variant="outlined" v-model="Electric0"></v-text-field>
        <v-text-field label="301 - 400 Kw" variant="outlined" v-model="Electric50"></v-text-field>
        <v-text-field label="101 - 200 Kw" variant="outlined" v-model="Electric100"></v-text-field>
        <v-text-field label="201 - 300 Kw" variant="outlined" v-model="Electric200"></v-text-field>
        <v-text-field label="301 - 400 Kw" variant="outlined" v-model="Electric300"></v-text-field>
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
    name:"EditElectric",
    data() {
        return {            
            Electric0:store.service.Electric0,
            Electric50:store.service.Electric50,
            Electric100:store.service.Electric100,
            Electric200:store.service.Electric200,
            Electric300:store.service.Electric300,
        }
    },
};
</script>
<style lang=""></style>
