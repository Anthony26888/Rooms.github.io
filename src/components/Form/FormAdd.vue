<template>
  <v-card-text>
    <v-text-field label="Nhập tên phòng"></v-text-field>
    <v-text-field label="Nhập số tiền phòng"></v-text-field>
    <div class="d-flex justify-center">
      <v-checkbox label="Điện" color="red"></v-checkbox>
      <v-checkbox label="Nước" color="primary"></v-checkbox>
      <v-checkbox label="Rác" color="success"></v-checkbox>
      <v-checkbox label="Wifi" color="secondary"></v-checkbox>
      <v-checkbox label="Cáp" color="orange"> </v-checkbox>
    </div>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary">Tạo</v-btn>
  </v-card-actions>
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
      steps: 2,
    };
  },
  computed: {
    disabled() {
      return this.e1 === 1
        ? "prev"
        : this.e1 === this.steps
        ? "next"
        : undefined;
    },
  },
};
</script>
<style lang=""></style>
