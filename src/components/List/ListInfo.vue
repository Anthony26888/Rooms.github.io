<template lang="">
  
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
export default {
  components: "InfoPerson",
  setup() {
    const store = useAppStore();
    const { Person } = storeToRefs(store);
    return { Person };
  },
  data() {
    return {};
  },
};
</script>
<style lang=""></style>
