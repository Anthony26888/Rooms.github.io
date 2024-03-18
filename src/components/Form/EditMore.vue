<template lang="">
  <v-form>
    <v-card-text>
      <v-text-field
        label="Giá tiền rác"
        variant="outlined"
        v-model="Trash"
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
      Trash: store.service.Trash,
    };
  },
};
</script>
<style lang=""></style>
