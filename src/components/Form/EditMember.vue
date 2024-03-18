<template lang="">
  <v-form v-model="form" v-on:submit.prevent="store.EditMember(IdMember, NameMember, BirthMember, PhoneMember, SexMember, CccdMember, WorkMember, LocationMember)">
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            clearable
            label="Họ và tên"            
            v-model="NameMember"
          ></v-text-field>
          <v-text-field type="date" label="Năm sinh" v-model="BirthMember"></v-text-field>
          <v-text-field
            label="Số điện thoại"
            v-model="PhoneMember"
          ></v-text-field>
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
      <v-btn :disabled="!form" color="primary" type="submit">Lưu</v-btn>
    </v-card-actions>
  </v-form> 
</template>
<script setup>
import { useAppStore } from "@/store/app";

</script>
<script>
const store = useAppStore();
export default {
  data() {
    return {
      form: false,
      IdMember:store.member.id,
      NumberRoom:store.member.number,
      NameMember: store.member.name,
      SexMember: store.member.sex,
      BirthMember: store.member.birth,
      CccdMember: store.member.cccd,
      PhoneMember: store.member.phone,
      WorkMember: store.member.work,
      LocationMember: store.member.location,
    };
  },
};
</script>
<style lang=""></style>
