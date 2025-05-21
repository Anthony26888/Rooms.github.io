<template lang="">
  <v-btn @click="emitCancel()" variant="tonal" class="text-caption">Huỷ</v-btn>
</template>
<script>
export default {
  methods: {
    emitCancel() {
      this.$emit("cancel"); // Phát sự kiện lên page
    },
  },
};
</script>
<style lang=""></style>
