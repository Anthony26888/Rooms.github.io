<template lang="">
  <v-card class="mt-3 mx-auto">
    <v-data-table-virtual
      :headers="Headers"
      :items="store.FilterPay"      
      item-value="name"
    >
      <template v-slot:item.status="{ value }">
        <p v-if="value == false" class="text-red">Chưa thanh toán</p>
        <p v-else class="text-green">Đã thanh toán</p>  
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          disabled
          class="button"
          color="success"
          icon="mdi-check"
          variant="text"
          @click="
            store.PaidCharge(item.id);
            store.Payment(item.total);
          "
          v-if="store.pay.status == false"
        ></v-btn>
        <v-btn
          class="button"
          color="success"
          icon="mdi-check"
          variant="text"
          @click="
            store.PaidCharge(item.id);
            store.Payment(item.total);
          "
          v-else
        ></v-btn>  

        <v-btn
          class="button ms-5"
          color="red"
          icon="mdi-delete"
          variant="text"
          @click="
            notify = true;
            store.GetIdPay(item.id);
            store.fetchEditPay(item.id);
          "
          v-if="store.pay.status == false"
        ></v-btn>
        <v-btn
          class="button ms-5"
          color="red"
          icon="mdi-delete"
          variant="text"
          @click="
            notify = true;
            store.GetIdPay(item.id);
            store.fetchEditPay(item.id);
          "
          v-else
        ></v-btn>
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
              DeletePaid();
            "
            color="red"
          >
            Đồng ý
          </v-btn>
        </div>
      </template>
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
        { title: "Phòng", align: "start", key: "name" },
        { title: "Tình trạng", align: "start", key: "status" },
        { title: "Tổng tiền", align: "start", key: "total" },
        { title: "Thời gian", align: "start", key: "date" },
        { title: "Tùy chỉnh", align: "start", key: "actions", sortable: false },
      ],

      boats: [
        {
          name: "Speedster",
          speed: 35,
          length: 22,
          price: 300000,
          year: 2021,
        },
        {
          name: "OceanMaster",
          speed: 25,
          length: 35,
          price: 500000,
          year: 2020,
        },
        {
          name: "Voyager",
          speed: 20,
          length: 45,
          price: 700000,
          year: 2019,
        },
        {
          name: "WaveRunner",
          speed: 40,
          length: 19,
          price: 250000,
          year: 2022,
        },
        {
          name: "SeaBreeze",
          speed: 28,
          length: 31,
          price: 450000,
          year: 2018,
        },
        {
          name: "HarborGuard",
          speed: 18,
          length: 50,
          price: 800000,
          year: 2017,
        },
        {
          name: "SlickFin",
          speed: 33,
          length: 24,
          price: 350000,
          year: 2021,
        },
        {
          name: "StormBreaker",
          speed: 22,
          length: 38,
          price: 600000,
          year: 2020,
        },
        {
          name: "WindSail",
          speed: 15,
          length: 55,
          price: 900000,
          year: 2019,
        },
        {
          name: "FastTide",
          speed: 37,
          length: 20,
          price: 280000,
          year: 2022,
        },
      ],
    };
  },
  mounted() {
    setInterval(() => {
      const date = new Date();
      const now = date.toISOString().substring(0, 10);
      this.Now = now;
    }, 10);
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },

    DeletePaid() {
      if (store.editPay.status == "true") {
        store.DivPaid(store.editPay.total);
        store.DeletePaid(store.IdPay);
      } else {
        if (store.service == 0) {
          store.DeletePaid(store.IdPay);
        } else {
          store.DivPay(store.editPay.total);
          store.DeletePaid(store.IdPay);
        }
      }
    },
    getColor(status){
      if(status == false) return 'text-red'
      else return 'text-green'
    }
  },
};
</script>

<style scoped>
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
