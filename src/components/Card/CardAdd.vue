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
    <FormAdd />
  </v-dialog>
</template>
<script setup>
import FormAdd from "@/components/Form/FormEdit.vue";
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
