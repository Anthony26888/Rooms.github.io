<template lang="">
  <form v-on:submit.prevent="store.CreateMember(NameMember, BirthMember, PhoneMember, SexMember, CccdMember, WorkMember, LocationMember);store.AlertSuccess = true">
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Họ và tên" v-model="NameMember"></v-text-field>
          <v-text-field label="Năm sinh" type="date" v-model="BirthMember"></v-text-field>
          <v-text-field label="Số điện thoại" v-model="PhoneMember"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            label="Giới tính"
            :items="['Nam', 'Nữ']"
            v-model="SexMember"
          ></v-select>
          <v-text-field
            label="Căn cước công nhân"
            v-model="CccdMember"
          ></v-text-field>
          <v-text-field label="Công việc" v-model="WorkMember"></v-text-field>
        </v-col>
        <v-text-field label="Quê quán" v-model="LocationMember"></v-text-field>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="submit" color="primary">Lưu</v-btn>
    </v-card-actions>
  </form>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
export default {
  name:"FormNewMember",
  data() {
    return {
      NameMember: "",
      SexMember: "",
      BirthMember: "",
      CccdMember: "",
      PhoneMember: "",
      WorkMember: "",
      LocationMember: "",
    };
  },
};
</script>
<style lang=""></style>
