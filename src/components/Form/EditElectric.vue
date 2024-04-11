<template lang="">
  <v-form v-on:submit.prevent="store.EditElectric(Electric0, Electric50,Electric100, Electric200, Electric300);store.AlertSuccess = true">
    <v-card-text>        
        <v-text-field label="0 - 50 Kw" variant="outlined" v-model="Electric0"></v-text-field>
        <v-text-field label="51 - 100 Kw" variant="outlined" v-model="Electric50"></v-text-field>
        <v-text-field label="101 - 200 Kw" variant="outlined" v-model="Electric100"></v-text-field>
        <v-text-field label="201 - 300 Kw" variant="outlined" v-model="Electric200"></v-text-field>
        <v-text-field label="301 - 400 Kw" variant="outlined" v-model="Electric300"></v-text-field>        
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
    name:"EditElectric",
    data() {
        return {            
            Electric0:store.service[0].Electric0,
            Electric50:store.service[0].Electric50,
            Electric100:store.service[0].Electric100,
            Electric200:store.service[0].Electric200,
            Electric300:store.service[0].Electric300,
        }
    },
};
</script>
<style lang=""></style>
