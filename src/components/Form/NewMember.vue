<template lang="">
  <v-card-text>
    <v-row>
      <v-col cols="6">
        <v-text-field label="Họ và tên" v-model="Name"></v-text-field>
        <v-text-field label="Năm sinh" v-model="Birth"></v-text-field>
        <v-text-field label="Số điện thoại" v-model="Phone"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select
          label="Giới tính"
          :items="['Nam', 'Nữ']"
          v-model="Sex"
        ></v-select>
        <v-text-field label="Căn cước công nhân" v-model="Cccd"></v-text-field>
        <v-text-field label="Công việc" v-model="Work"></v-text-field>
      </v-col>
      <v-text-field label="Quê quán" v-model="Location"></v-text-field>
    </v-row>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="edit = false">Lưu</v-btn>
  </v-card-actions>
</template>
<script>
export default {
  data() {
    return {
      Name: "",
      Sex: "",
      Birth: "",
      Cccd: "",
      Phone: "",
      Work: "",
      Location: "",
    };
  },
};
</script>
<style lang=""></style>
