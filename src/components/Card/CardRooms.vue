<template lang="">
  <div class="d-flex flex-wrap justify-center algin-center">
    <div v-for="item in store.User" :key="item">
      <v-card
        class="ma-2 mb-2"
        width="350"
        :title="`Phòng ` + item.number"
        :subtitle="item.Family[0].name"
      >
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-icon icon="mdi-home"></v-icon>
          </v-avatar>
        </template>
        <v-card-text>
          <div class="d-flex">
            <v-icon icon="mdi-human"></v-icon>
            <p>: {{ item.qty }} người</p>
          </div>
          <div class="d-flex">
            <v-icon icon="mdi-currency-usd"></v-icon>
            <p>: {{ item.roomcharge }} vnđ</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="d-flex justify-center algin-center">
            <div class="ma-4 mb-4">
              <form-edit></form-edit>
            </div>
            <div class="ma-4 mb-4">
              <form-caculation></form-caculation>
            </div>
            
            
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
import FormEdit from '@/components/Form/FormEdit'
import FormCaculation from '@/components/Form/FormCaculation'
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>

</style>
