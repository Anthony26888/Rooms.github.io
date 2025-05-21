<template lang="">
  <v-btn class="bg-primary text-caption" @click="emitSave()"
    >Nhập dữ liệu</v-btn
  >
</template>
<script>
export default {
  methods: {
    emitSave() {
      this.$emit("save"); // Phát sự kiện lên page
    },
  },
};
</script>
<style lang=""></style>
