<template>
  <VRow class="mt-1">
    <VCol  xs="12">
      <v-card>
        <v-card-title class="text-title">Tổng Thu</v-card-title>
        <v-card-text class="text-center text-num text-green">{{ store.payment.income }}</v-card-text>
      </v-card>
    </VCol>
    <VCol xs="12">
      <v-card>
        <v-card-title class="text-title">Tổng Nợ</v-card-title>
        <v-card-text class="text-center text-num text-red">{{ store.payment.debt }}</v-card-text>
      </v-card>
    </VCol>
    <VCol xs="6">
      <v-card>
        <v-card-title class="text-title">Đã đóng</v-card-title>
        <v-card-text class="text-center text-num text-blue" v-if="store.FilterPaid.length == null">0</v-card-text>
        <v-card-text class="text-center text-num text-blue" v-else>{{ store.FilterPaid.length }}</v-card-text>
      </v-card>
    </VCol>
    <VCol xs="6">
      <v-card>
        <v-card-title class="text-title">Chưa đóng </v-card-title>
        <v-card-text class="text-center text-num text-deep-orange" v-if="store.FilterNotPay.length == null">0</v-card-text>
        <v-card-text class="text-center text-num text-deep-orange" v-else>{{ store.FilterNotPay.length }}</v-card-text>
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

@media only screen and (min-width: 400px) {
  .text-title{
    font-size: 20px;
  }
  .text-num {
    font-size: 20px;
    font-weight: 700;
  }
}
@media only screen and (min-width: 700px) {
  .text-title{
    font-size: 18px;
  }
  .text-num {
    font-size: 18px;
    font-weight: 700;
  }
}
@media only screen and (min-width: 1024px) {
  .text-num {
    font-size: 25px;
    font-weight: 700;
  }
}
</style>
