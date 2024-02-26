<template>
  <VRow class="mt-1">
    <VCol cols="3">
      <v-card title="Tổng Thu" class="w-100">
        <v-card-text class="text-center text text-green">25,000,000 vnd</v-card-text>
      </v-card>
    </VCol>
    <VCol cols="3">
      <v-card title="Tổng Nợ" class="w-100">
        <v-card-text class="text-center text text-red">5,000,000 vnd</v-card-text>
      </v-card>
    </VCol>
    <VCol cols="3">
      <v-card title="Phòng đã thuê" class="w-100">
        <v-card-text class="text-center text text-blue">28</v-card-text>
      </v-card>
    </VCol>
    <VCol cols="3">
      <v-card title="Phòng trống" class="w-100">
        <v-card-text class="text-center text text-deep-orange">1</v-card-text>
      </v-card>
    </VCol>
  </VRow>
</template>

<script>
export default {
  data() {
    return {

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
