<template lang="">
  <v-card class="mt-3 mx-auto">
    <v-data-table-virtual
      :headers="Headers"
      :items="store.Filter"
      item-value="name"
      
    >
      <template v-slot:item.status="{ value }">
        <v-chip color="red" v-if="value == false"
          ><v-icon>mdi-window-close</v-icon></v-chip
        >
        <v-chip color="green" v-else class="text-green"
          ><v-icon>mdi-check</v-icon></v-chip
        >
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          icon="mdi-eye"
          color="success"
          @click="store.fetchEditPay(item.id); ViewPay=true"
        ></v-icon>
      </template>
    </v-data-table-virtual>
  </v-card>

  <!--Notifition Delete Room-->
  <v-dialog
    v-model="notify"
    width="500"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card title="Bạn có muốn xóa?">
      <VSpacer />
      <template v-slot:actions class="mx-auto">
        <div class="mx-auto">
          <v-btn @click="notify = false" color="primary"> Từ chối </v-btn>

          <v-btn
            @click="
              notify = false;
              store.DeletePaid();
            "
            color="red"
          >
            Đồng ý
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>

  <!--Notifition View Pay-->
  <v-dialog
    v-model="ViewPay"
    width="500"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card>
      <v-card-title class="text-center">HÓA ĐƠN TIỀN PHÒNG</v-card-title>
      <v-card-subtitle class="text-center">Phòng: {{NumberRoom}}</v-card-subtitle>
      <v-card-subtitle class="text-center">Tháng {{TimeRoom}}</v-card-subtitle>
      
      <v-card-text>
        <table class="table w-100 pa-3 pb-3">
          <v-divider :thickness="2" ></v-divider>
          <tbody class="table-group-divider">
            <tr>
              <td scope="row" class="text-start text-table">Tiền phòng:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ RoomCharge }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Điện:</td>
              <td></td>
              <td></td>
              <td class="text-end">
                {{ ElectricCharge }}
              </td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">
                Nước: ({{ store.editRoom.qty }} người)
              </td>
              <td></td>
              <td></td>
              <td class="text-end">{{ WaterCharge }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Rác:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ TrashCharge }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Wifi:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ WifiCharge }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Cáp:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ CableCharge }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Tiền khác:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ OtherCharge }}</td>
            </tr>
          </tbody>
          <v-divider :thickness="2"></v-divider>
          <tfoot>
            <tr>
              <th scope="row" class="text-start "><h2>Tổng:</h2></th>
              <td></td>
              <td></td>
              <td class="text-end">{{ RoomCharge }}</td>
            </tr>
          </tfoot>
        </table>
      </v-card-text>
      <v-btn @click='store.PaidCharge(item.id)' class='w-100 bg-green m-2'>Thanh toán</v-btn>
      <v-btn @click='ViewPay=false' class='bg-gray'>Quay lại</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
store.fetchPay();
export default {
  name: "TablePay",
  data() {
    return {
      Now: "",
      ViewPay: false,
      notify: false,
      NumberRoom:store.editPay.name,
      TimeRoom:store.editPay.time,
      headers: [
        { title: "Phòng" },
        { title: "Tình trạng" },
        { title: "Tổng tiền" },
        { title: "Thời gian" },
        { title: "" },
      ],

      Headers: [
        { title: "Phòng", align: "start", key: "name" },
        { title: "Tình trạng", align: "start", key: "status" },
        { title: "Tổng tiền", align: "start", key: "total" },
        { title: "Thời gian", align: "start", key: "date" },
        { title: "Tùy chỉnh", align: "start", key: "actions", sortable: false },
      ],
    };
  },
  computed: {
    check() {
      if ((store.FilterTime = null)) {
        return store.pay;
      } else {
        return store.FilterPay;
      }
    },
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },

    DeletePaid() {},
    getColor(status) {
      if (status == false) return "text-red";
      else return "text-green";
    },
  },
};
</script>

<style scoped>
.text-table{
  font-size: 15px;
}
@media only screen and (min-width: 400px) {
  .text-title {
    font-size: 13px;
  }

  td {
    font-size: 13px;
  }

  .button {
    width: 12px;
    height: 12pxl;
  }
}

@media only screen and (min-width: 700px) {
  .text-title {
    font-size: 18px;
  }

  td {
    font-size: 18px;
  }
}

@media only screen and (min-width: 1024px) {
  .text-title {
    font-size: 18px;
  }

  td {
    font-size: 18px;
  }
}
</style>
