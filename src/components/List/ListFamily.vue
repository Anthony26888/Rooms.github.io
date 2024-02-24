<template lang="">
  
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import ListInfo from "@/components/List/ListInfo.vue";
export default {
  components: "InfoRoom",
  setup() {
    const store = useAppStore();
    const { Info } = storeToRefs(store);
    return { Info };
  },
  data() {
    return {
      reveal: false,
    };
  },
};
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
