<template lang="">
  <v-card class="mt-3 mx-auto">
    <v-table>
      <thead>
        <tr>
          <th class="text-left text-title" v-for="item in headers" :key="item">
            {{ item.title }}
          </th>
          <th class=""></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.pay">
          <td>Phòng {{ item.name }}</td>
          <td>
            <p v-if="item.status == false" class="text-red">Chưa thanh toán</p>
            <p v-else class="text-success">Đã thanh toán</p>
          </td>
          <td>{{ item.total.toLocaleString("en-US") }}</td>
          <td>{{ item.date }}</td>
          <td>
            <div class="d-flex">
              <v-btn
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
                disabled
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
              ></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
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
        store.DivPay(store.editPay.total);
        store.DeletePaid(store.IdPay);
      }
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
  .button{
    width:12px;
    height:12pxl
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
    font-size: 22px;
  }
  td {
    font-size: 22px;
  }
}
</style>
