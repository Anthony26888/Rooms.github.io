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
          :disabled="checkPay"
          class="button"
          color="success"
          icon="mdi-check"
          variant="text"
          @click="store.PaidCharge(item.id)"
        ></v-btn>

        <v-btn
          class="button ms-5"
          color="red"
          icon="mdi-delete"
          variant="text"
          @click="
            notify = true;
            store.GetIdPay(item.id);
          "
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
    };
  },
  computed: {
    checkPay(){
     
    }
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
