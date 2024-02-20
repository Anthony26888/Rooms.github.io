<template lang="">
  <v-card>
    <v-card-title>Phòng cũ</v-card-title>
    <v-card-text>
      <div class="d-flex" v-for="item in store.Old">
        <v-card variant="tonal" color="primary">
          <v-card-title>Phòng {{ item.number }}</v-card-title>
          <v-card-actions>
            <v-btn>Click me</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang=""></style>
