<template>
  <VRow class="mt-1">
    <VCol cols="3">
      <v-card title="Tổng Thu" class="w-100">
        <v-card-text class="text-center text text-green">{{ Payment }}</v-card-text>
      </v-card>
    </VCol>
    <VCol cols="3">
      <v-card title="Tổng Nợ" class="w-100">
        <v-card-text class="text-center text text-red">0</v-card-text>
      </v-card>
    </VCol>
    <VCol cols="3">
      <v-card title="Phòng đã đóng tiền" class="w-100">
        <v-card-text class="text-center text text-blue" v-if="store.FilterPaid.length == null">0</v-card-text>
        <v-card-text class="text-center text text-blue" v-else>{{ store.FilterPaid.length }}</v-card-text>
      </v-card>
    </VCol>
    <VCol cols="3">
      <v-card title="Phòng chưa đóng tiền" class="w-100">
        <v-card-text class="text-center text text-deep-orange" v-if="store.FilterNotPay.length == null">0</v-card-text>
        <v-card-text class="text-center text text-deep-orange" v-else>{{ store.FilterNotPay.length }}</v-card-text>
      </v-card>
    </VCol>
  </VRow>
</template>
<script setup>
import { useAppStore } from "@/store/app";

</script>
<script>
const store = useAppStore();

export default {
  name:"Profit",
  data() {
    return {
      Charge:store.FilterPaid,
      Payment:"" 
    }
  },
  mounted() {
    
    this.payment()
    
  },
  methods: {
    payment(){
      this.Charge.forEach(value => {
        this.Payment += parseFloat(value.total)
      });
    }
  },
} 
</script>
<style scoped>
  .text{
    font-size: 35px;
    font-weight: 700;
  }
</style>
