<template>
  <form
    v-on:submit.prevent="
      store.CreateRoom(
        LocationRoom,
        QtyMember,
        NameRoom,
        RoomCharge,
        DateRoom,
        WifiService,
        CableService,
        LastElectric,
        Deposit
      );
      store.AlertSuccess = true
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
            required
          ></v-select>
          <v-text-field
            variant="outlined"
            label="Nhập tên phòng"
            v-model="NameRoom"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            label="Nhập số tiền phòng"
            type="number"
            v-model="RoomCharge"
            required
          ></v-text-field>
          <v-text-field
            variant="outlined"
            label="Số điện cuối"
            type="number"
            v-model="LastElectric"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            variant="outlined"
            v-model="QtyMember"
            label="Số lượng người"
            :items="['1', '2', '3', '4', '5', '6']"
            required
          ></v-select>
          <v-text-field
            variant="outlined"
            label="Ngày vào"
            type="date"
            v-model="DateRoom"
            required
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
              variant="outlined"
              label="Wifi"
              color="secondary"
              value="true"
              v-model="WifiService"
            ></v-checkbox>
            <v-checkbox
              variant="outlined"
              label="Cáp"
              color="orange"
              value="true"
              v-model="CableService"
            ></v-checkbox>
          </div>
        </v-col>
      </v-row>
      <v-btn class="w-100" type="submit" color="primary">Tạo</v-btn>
    </v-card-text>
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
      Deposit: 0,
      LastElectric: 0,
      WifiService: false,
      CableService: false,      
      
    };
  },
  methods: {
    
  },
};
</script>
<style lang=""></style>
