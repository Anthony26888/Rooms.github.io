<template lang="">
  <v-form
    v-model="form"
    v-on:submit.prevent="
      store.EditRoom(
        LocationRoom,
        NameRoom,
        QtyMember,
        RoomCharge,        
        DateRoom,
        LastElectric,
        WifiService,
        CableService,
        Deposit,
      );
      store.AlertEditRoom = true
    "
  >
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-select
            variant="outlined"
            v-model="LocationRoom"
            label="Vị trí"
            :items="['Dãy A', 'Dãy B']"
          ></v-select>
          <v-text-field
            variant="outlined"
            label="Nhập tên phòng"
            v-model="NameRoom"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            label="Nhập số tiền phòng"
            v-model="RoomCharge"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            label="Số điện cuối"
            v-model="LastElectric"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
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
            pattern="\d{4}-\d{2}-\d{2}"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            label="Tiền cọc"
            type="number"
            v-model="Deposit"
            required
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
            ></v-checkbox>
          </div>
        </v-col>
      </v-row>
      <v-btn :disabled="!form" class="w-100" color="primary" type="submit"
        >Lưu</v-btn
      >
    </v-card-text>
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
      Deposit:store.editRoom.deposit,
      DateRoom: store.editRoom.date,
      LastElectric: store.editRoom.electric,
      WifiService: store.editRoom.wifi,
      CableService: store.editRoom.cable,
    };
  },
};
</script>
<style lang=""></style>
