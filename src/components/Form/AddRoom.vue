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
        variant="outlined"
        v-model="LocationRoom"
        label="Vị trí"
        :items="['Dãy A', 'Dãy B']"
      ></v-select>
      <v-text-field variant="outlined" label="Nhập tên phòng" v-model="NameRoom"></v-text-field>
      <v-text-field
        variant="outlined"
        label="Nhập số tiền phòng"
        type="number"
        v-model="RoomCharge"
      ></v-text-field>
      <v-select
        variant="outlined"
        v-model="QtyMember"
        label="Số lượng người"
        :items="['1', '2', '3', '4', '5', '6']"
      ></v-select>
      <v-text-field
        variant="outlined"
        label="Ngày vào"
        type="date"
        v-model="DateRoom"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Số điện cuối"
        type="number"
        v-model="LastElectric"
      ></v-text-field>
      <b>Dịch vụ thêm:</b>
      <div class="d-flex">
        <v-checkbox
          variant="outlined"
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
      RoomCharge: 0,
      DateRoom: "",
      QtyMember: "",
      LastElectric:0,
      WifiService: false,
      CableService: false,
    };
  },
};
</script>
<style lang=""></style>
