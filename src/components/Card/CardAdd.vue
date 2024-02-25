<template lang="">
  <v-btn
    prepend-icon="mdi-plus"
    color="success"
    variant="tonal"
    class="mb-3"
    @click="form = true"
  >
    Thêm phòng
  </v-btn>
  <v-divider :thickness="2"></v-divider>
  <v-dialog v-model="form" width="auto">
    <v-card title="Tạo phòng">
      <template v-slot:append>
        <v-btn          
          variant="text"
          icon="mdi-close"
          @click="form = false"
        ></v-btn>
      </template>
      <v-card-text>
        <FormAdd/>
      </v-card-text>
    </v-card>    
  </v-dialog>
</template>
<script setup>
import FormAdd from "@/components/Form/FormAdd.vue";
</script>
<script>
export default {
  data() {
    return {
      form: false,
    };
  },
};
</script>
<style lang=""></style>
