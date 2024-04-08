<template lang="">
  <v-btn
    prepend-icon="mdi-plus"
    color="success"
    variant="tonal"
    class="mb-3 mt-1"
    @click="store.AddRoomDialog = true"
  >
    Thêm phòng
  </v-btn>
  
  <v-dialog v-model="store.AddRoomDialog" width="500">
    <v-card title="Tạo phòng">
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-close"
          @click="store.AddRoomDialog = false"
        ></v-btn>
      </template>
      <v-card-text>
        <FormAdd />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import FormAdd from "@/components/Form/AddRoom.vue";
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
export default {
  data() {
    return {
      form: false,      
    };
  }
  
};
</script>
<style lang=""></style>
