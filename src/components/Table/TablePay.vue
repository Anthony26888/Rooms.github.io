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
          @click="store.fetchEditPay(item.id); store.ViewPayDialog=true"
        ></v-icon>
      </template>
    </v-data-table-virtual>
  </v-card>

  <!--Notifition Delete Pay-->
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
              store.DeletePaid(store.editPay.id);
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
    v-model="store.ViewPayDialog"
    width="500"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card>
      <v-card-title class="text-center">HÓA ĐƠN TIỀN PHÒNG</v-card-title>
      <v-card-subtitle class="text-center">Phòng: {{store.editPay.name}}</v-card-subtitle>
      <v-card-subtitle class="text-center">Tháng {{store.editPay.time}}</v-card-subtitle>
      
      <v-card-text>
        <v-divider :thickness="2" ></v-divider>
        <table class="table w-100 pa-3 pb-3">          
          <tbody class="table-group-divider">
            <tr>
              <td scope="row" class="text-start text-table">Tiền phòng:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ Number(store.editPay.roomcharge).toLocaleString("en-GB") }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Điện:</td>
              <td></td>
              <td></td>
              <td class="text-end">
                {{ Number(store.editPay.electric).toLocaleString("en-GB") }}
              </td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">
                Nước: ({{ store.editRoom.qty }} người)
              </td>
              <td></td>
              <td></td>
              <td class="text-end">{{ Number(store.editPay.water).toLocaleString("en-GB") }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Rác:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ Number(store.editPay.trash).toLocaleString("en-GB") }}</td>
            </tr>
            <tr>
              <td scope="row" class="text-start text-table">Wifi:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ Number(store.editPay.wifi).toLocaleString("en-GB") }}</td>
            </tr>            
            <tr>
              <td scope="row" class="text-start text-table">Tiền nợ:</td>
              <td></td>
              <td></td>
              <td class="text-end">{{ Number(store.editPay.debt).toLocaleString("en-GB") }}</td>
            </tr>
          </tbody>          
          <tfoot>            
            <tr>
              <th scope="row" class="text-start "><h3>Tổng:</h3></th>
              <td></td>
              <td></td>
              <td class="text-end"><h3>{{ Number(store.editPay.total).toLocaleString("en-GB") }}</h3></td>
            </tr>
          </tfoot>
        </table>
        <v-btn v-if="store.editPay.status == false"  @click='store.PaidCharge(store.editPay.id);' class='w-100 bg-green m-2'>Thanh toán</v-btn>
        <v-btn v-else disabled class='w-100 bg-green m-2'>Đã Thanh toán</v-btn>
        <v-btn @click='notify = true' class='w-100 mt-2 bg-red m-2'>Xóa</v-btn>
        <v-btn @click='store.ViewPayDialog=false' class='w-100 mt-2 bg-gray'>Quay lại</v-btn>
      </v-card-text>
      
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
      notify: false,        
      headers: [
        { title: "Phòng" },
        { title: "Tình trạng" },
        { title: "Tổng tiền" },
        { title: "Thời gian" },
        { title: "" },
      ],

      Headers: [
        { title: "Phòng", align: "center", key: "name" },
        { title: "Tình trạng", align: "center", key: "status" },
        { title: "Tổng tiền", align: "center", key: "total" },
        { title: "Thời gian", align: "center", key: "date" },
        { title: "Tùy chỉnh", align: "center", key: "actions", sortable: false },
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
