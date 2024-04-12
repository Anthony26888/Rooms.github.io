<template lang="">
  <v-skeleton-loader
    type="table-heading, table-thead,table-tbody"
    class="mt-3 mx-auto rounded-lg h-100"
    :loading="loading"
  >
    <v-card class="w-100 h-100 rounded-lg">
      <v-card-title class="d-flex align-center pe-2">
        <h3>Thanh toán</h3>

        <v-spacer></v-spacer>

        <v-select
          v-model="SelectMonth"
          label="Chọn thời gian"
          :items="Month"
          variant="solo"
          density="compact"
          class="mt-4 rounded-lg"
        ></v-select>
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table-virtual
        :headers="Headers"
        :items="store.Filter"
        item-value="name"
        :search="SelectMonth"
        v-model:page="page"
        :items-per-page="itemsPerPage"
      >
        <template v-slot:item.status="{ value }">
          <v-chip color="red" v-if="value == false"
            ><v-icon>mdi-window-close</v-icon></v-chip
          >
          <v-chip color="green" v-else class="text-green"
            ><v-icon>mdi-check</v-icon></v-chip
          >
        </template>
        <template v-slot:item.total="{ value }">
          {{ Number(value).toLocaleString("en-GB") }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            icon="mdi-eye"
            color="success"
            @click="
              store.fetchEditPay(item.id);
              store.ViewPayDialog = true;
            "
          ></v-icon>
        </template>
        <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </template>
      </v-data-table-virtual>
    </v-card>
  </v-skeleton-loader>

  <!--Notifition Delete Pay-->
  <v-dialog
    v-model="notify"
    width="500"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card title="Bạn có muốn xóa?" class="rounded-lg">
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
    <v-card class="rounded-lg">
      <v-card-title class="text-center">HÓA ĐƠN TIỀN PHÒNG</v-card-title>
      <v-card-subtitle class="text-center"
        >Phòng: {{ store.editPay.name }}</v-card-subtitle
      >
      <v-card-subtitle class="text-center"
        >Vị trí: {{ store.editPay.location }}</v-card-subtitle
      >
      <v-card-subtitle class="text-center"
        >Thời gian: {{ store.editPay.date }}</v-card-subtitle
      >

      <v-card-text>
        <v-divider :thickness="2"></v-divider>
        <table-bill></table-bill>
        <v-btn
          v-if="store.editPay.status == false"
          @click="
            store.PaidCharge(store.editPay.id);
            store.AlertSuccess = true;
          "
          class="w-100 bg-green m-2"
          >Thanh toán</v-btn
        >
        <v-btn v-else disabled class="w-100 bg-green m-2">Đã Thanh toán</v-btn>
        <v-btn @click="notify = true" class="w-100 mt-2 bg-red m-2">Xóa</v-btn>
        <v-btn @click="store.ViewPayDialog = false" class="w-100 mt-2 bg-gray"
          >Quay lại</v-btn
        >
      </v-card-text>
    </v-card>
  </v-dialog>
  <!--Alert-->
  <v-snackbar v-model="store.AlertSuccess" :timeout="Timeout" color="success">
    <v-icon class="me-4">mdi-check-circle-outline</v-icon>
    {{ TextAlert }}
  </v-snackbar>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import TableBill from "@/components/Table/TableBill";
</script>
<script>
const store = useAppStore();
store.fetchPay();

export default {
  name: "TablePay",
  data() {
    return {
      SelectMonth: "",
      Now: "",
      notify: false,
      TextAlert: "Thành công",
      Timeout: "1000",
      page: 1,
      itemsPerPage: 10,

      Headers: [
        { title: "Phòng", align: "center", key: "name" },
        { title: "Tình trạng", align: "center", key: "status" },
        { title: "Tổng tiền", align: "center", key: "total" },
        { title: "Thời gian", align: "center", key: "date" },
        {
          title: "Tùy chỉnh",
          align: "center",
          key: "actions",
          sortable: false,
        },
      ],
      Month: [
        "1/2024",
        "2/2024",
        "3/2024",
        "4/2024",
        "5/2024",
        "6/2024",
        "7/2024",
        "8/2024",
        "9/2024",
        "10/2024",
        "11/2024",
        "12/2024",
      ],
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>

<style scoped>
.text-table {
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
