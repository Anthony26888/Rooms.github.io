<template lang="">
  <v-form v-model="form" v-on:submit="store.EditRoom(LocationRoom, NameRoom, QtyMember, RoomCharge, DateRoom, WifiService, CableService)">
    <v-card-text>
      <v-select
        variant="outlined"
        v-model="LocationRoom"
        label="Vị trí"
        :items="['Dãy A', 'Dãy B']"
      ></v-select>
      <v-text-field variant="outlined" label="Nhập tên phòng" v-model="NameRoom"></v-text-field>
      <v-text-field
        variant="outlined"
        label="Nhập số tiền phòng"
        v-model="RoomCharge"
      ></v-text-field>
      <v-select
        variant="outlined"
        v-model="QtyMember"
        label="Số lượng người"
        :items="['1', '2','3','4','5','6']"
      ></v-select>
      <v-text-field
        variant="outlined"
        label="Ngày vào"
        type="date"
        v-model="DateRoom"
        pattern="\d{4}-\d{2}-\d{2}"
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
      LocationRoom: store.editRoom.location,
      NameRoom: store.editRoom.number,
      QtyMember: store.editRoom.qty,
      RoomCharge: store.editRoom.roomcharge,
      DateRoom: store.editRoom.date,
      WifiService: store.editRoom.wifi,
      CableService: store.editRoom.cable

    };
  },
 
};
</script>
<style lang=""></style>
