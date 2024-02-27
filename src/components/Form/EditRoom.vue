<template lang="">
  <form v-on:submit.prevent="store.EditRoom(LocationRoom, NameRoom, RoomCharge, DateRoom, WifiService, CableService)">
    <v-card-text>
      <v-select
        v-model="LocationRoom"
        label="Vị trí"
        :items="['Dãy A', 'Dãy B']"
      ></v-select>
      <v-text-field label="Nhập tên phòng" v-model="NameRoom"></v-text-field>
      <v-text-field
        label="Nhập số tiền phòng"
        v-model="RoomCharge"
      ></v-text-field>
      <v-text-field
        label="Ngày vào"
        type="date"
        v-model="DateRoom"
      ></v-text-field>
      <b>Dịch vụ thêm:</b>
      <div class="d-flex">
        <v-checkbox
          label="Wifi"
          color="secondary"
          value="true"
          v-model="WifiService"
        ></v-checkbox>
        <v-checkbox
          label="Cáp"
          color="orange"
          value="true"
          v-model="CableService"
        >
        </v-checkbox>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="edit = false" type="submit">Lưu</v-btn>
    </v-card-actions>
  </form>
</template>
<script setup>
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
export default {
  data() {
    return {
      IdMember: store.member.id,
      NumberRoom: store.member.number,
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
