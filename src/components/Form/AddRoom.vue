<template>
  <form
    v-on:submit="
      store.CreateRoom(
        LocationRoom,
        QtyMember,
        NameRoom,
        RoomCharge,
        DateRoom,
        WifiService,
        CableService,
        LastElectric
      )
    "
  >
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
      <v-select
        v-model="QtyMember"
        label="Số lượng người"
        :items="['1', '2', '3', '4', '5', '6']"
      ></v-select>
      <v-text-field
        label="Ngày vào"
        type="date"
        v-model="DateRoom"
      ></v-text-field>
      <v-text-field
        label="Số điện cuối"
        type="number"
        v-model="LastElectric"
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
          disabled
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
      <v-btn type="submit" color="primary">Tạo</v-btn>
    </v-card-actions>
  </form>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
export default {
  name: "FormRoom",
  data() {
    return {
      LocationRoom: "",
      NameRoom: "",
      RoomCharge: "",
      DateRoom: "",
      QtyMember: "",
      LastElectric:"",
      WifiService: false,
      CableService: false,
    };
  },
};
</script>
<style lang=""></style>
