<template>
  <VRow class="mt-1">
    <VCol xs="6" sm="6" md="6">
      <v-skeleton-loader
        type="sentences"
        class="rounded-lg p-5 h-100"
        :loading="loading"
      >
        <v-card color="teal-lighten-1" variant="tonal" class="w-100 rounded-lg">
          <v-card-title class="text-title text-green">Tổng Thu</v-card-title>
          <v-card-text class="text-start text-num text-green">
            <h2>
              {{ Number(store.Sum).toLocaleString("en-GB") }}
            </h2>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </VCol>
    <VCol xs="6" sm="6" md="6">
      <v-skeleton-loader
        type="sentences"
        class="rounded-lg p-5 h-100"
        :loading="loading"
      >
        <v-card color="red-lighten-1 rounded-lg" class="w-100 rounded-lg" variant="tonal">
          <v-card-title class="text-title">Tổng Nợ</v-card-title>
          <v-card-text class="text-start text-num text-red">
            <h2>
              {{ Number(store.Debt).toLocaleString("en-GB") }}
            </h2>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </VCol>
  </VRow>
</template>
<script setup>
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
export default {
  name: "Profit",
  data() {
    return {
      Total: store.FilterPay,
      loading: true,
    };
  },
  mounted() {
    setTimeout(() =>{
      this.loading= false
    },1500)
  },
};
</script>
<style scoped>
@media only screen and (min-width: 300px) {
  .text-title {
    font-size: 14px;
  }

  .text-num {
    font-size: 16px;
    font-weight: 700;
  }
}

@media only screen and (min-width: 400px) {
  .text-title {
    font-size: 16px;
  }

  .text-num {
    font-size: 18px;
    font-weight: 700;
  }
}

@media only screen and (min-width: 700px) {
  .text-title {
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
