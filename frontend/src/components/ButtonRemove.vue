<template lang="">
  <v-btn @click="emitRemove()" variant="tonal" color="error" class="text-caption"
    >Xoá</v-btn
  >
</template>
<script>
export default {
  methods: {
    emitRemove() {
      this.$emit("remove"); // Phát sự kiện lên page
    },
  },
};
</script>
<style lang=""></style>
