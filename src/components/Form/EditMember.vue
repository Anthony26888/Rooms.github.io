<template lang="">
  <v-card-text>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="Họ và tên"
          v-model="store.Person.name"
        ></v-text-field>
        <v-text-field
          label="Năm sinh"
          v-model="store.Person.birth"
        ></v-text-field>
        <v-text-field
          label="Số điện thoại"
          v-model="store.Person.sdt"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select
          label="Giới tính"
          :items="['Nam', 'Nữ']"
          v-model="store.Person.sex"
        ></v-select>
        <v-text-field
          label="Căn cước công nhân"
          v-model="store.Person.cccd"
        ></v-text-field>
        <v-text-field
          label="Công việc"
          v-model="store.Person.work"
        ></v-text-field>
      </v-col>
      <v-text-field
        label="Quê quán"
        v-model="store.Person.location"
      ></v-text-field>
    </v-row>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="edit = false">Lưu</v-btn>
  </v-card-actions>
</template>
<script setup>
import NewMember from "@/components/Form/NewMember.vue"
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
export default {
  data() {
    return {     
      
    };
  },
};
</script>
<style lang=""></style>
