<template>
  <VRow class="mt-1">
    <VCol cols="3">
      <v-card title="Tổng Thu" class="w-100">
        <v-card-text class="text-center text text-green">{{ store.payment.income }}</v-card-text>
      </v-card>
    </VCol>
    <VCol cols="3">
      <v-card title="Tổng Nợ" class="w-100">
        <v-card-text class="text-center text text-red">{{ store.payment.debt }}</v-card-text>
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
const store = useAppStore();
store.fetchPayment();
store.fetchDebt()
</script>
<script>

export default {
  name: "Profit",
  data() {
    return {
      
    }
  },
  mounted() {
    


  },
  methods: {
    
  },
} 
</script>
<style scoped>
.text {
  font-size: 35px;
  font-weight: 700;
}
</style>
