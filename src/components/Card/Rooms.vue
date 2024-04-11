<template lang="">
  <v-data-iterator
    :items="store.Room"
    :items-per-page="10"
    :search="search"    
  >
    <template v-slot:header>      
      <v-toolbar class="px-2">
        <add-room></add-room>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          density="comfortable"
          placeholder="Tìm kiếm"
          prepend-inner-icon="mdi-magnify"
          style="max-width: 300px"
          variant="solo"
          clearable
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>

    <template v-slot:default="{ items }">
      <div class="d-flex flex-wrap justify-center algin-center">
        <div v-for="(item, index) in items" :key="index">
          <v-card
            class="ma-2 mb-2 card-room rounded-lg"
            :title="`Phòng ` + item.raw.number"
            :subtitle="item.raw.location"
            max-width="320"
          >
            <template v-slot:prepend>
              <v-avatar color="blue-darken-2">
                <v-icon icon="mdi-home"></v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <div class="ribbon-wrap">
                <div class="ribbon bg-success" v-if="item.raw.status == 'true'">
                  Đã thuê
                </div>
                <div class="ribbon bg-red" v-else>Trống</div>
              </div>
            </template>
            <v-card-text>
              <p><b>Số người:</b> {{ item.raw.qty }} người</p>
              <p>
                <b>Tiền phòng:</b>
                {{ Number(item.raw.roomcharge).toLocaleString("en-GB") }}</p>
              <div class="d-flex">
                <b>Dịch vụ thêm:</b>
                <p v-if="item.raw.wifi == 'true'" class="ms-2">Wifi</p>
                <p v-if="item.raw.cable == 'true'" class="ms-2">Cáp</p>
              </div>
              <p><b>Tiền cọc:</b> {{ Number(item.raw.deposit).toLocaleString("en-GB")}}</p>
              <p><b>Ngày vào:</b> {{ item.raw.date }}</p>
            </v-card-text>
            <v-card-actions>
              <div class="d-flex flex-wrap justify-center algin-center mx-auto">
                <div class="ma-1 mb-1">
                  <v-btn
                    class="button-card"
                    color="primary"
                    variant="tonal"
                    icon="mdi-account-group"
                    @click="
                      dialog = true;
                      store.fetchProfile(item.raw.number);
                    "
                  >
                  </v-btn>
                </div>
                <div class="ma-1 mb-1">
                  <v-btn
                    class="button-card"
                    color="orange"
                    variant="tonal"
                    icon="mdi-home-edit"
                    @click="
                      store.EditRoomDialog = true;
                      store.fetchEditRoom(item.raw.id);
                    "
                  >
                  </v-btn>
                </div>
                <div class="ma-1 mb-1">
                  <v-btn
                    class="button-card"
                    color="success"
                    variant="tonal"
                    icon="mdi-calculator-variant"
                    @click="
                      store.CaculatorChargeDialog = true;
                      store.fetchEditRoom(item.raw.id);
                    "
                  >
                  </v-btn>
                </div>

                <div class="ma-1 mb-1">
                  <v-btn
                    class="button-card"
                    color="red"
                    variant="tonal"
                    icon="mdi-close-circle"
                    @click="
                      notifyRoom = true;
                      store.fetchEditRoom(item.raw.id);
                    "
                  >
                  </v-btn>
                </div>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </template>

    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
      <div class="d-flex align-center justify-center pa-4">
        <v-btn
          :disabled="page === 1"
          density="comfortable"
          icon="mdi-arrow-left"
          variant="tonal"
          rounded
          @click="prevPage"
        ></v-btn>

        <div class="mx-2 text-caption">Trang {{ page }} / {{ pageCount }}</div>

        <v-btn
          :disabled="page >= pageCount"
          density="comfortable"
          icon="mdi-arrow-right"
          variant="tonal"
          rounded
          @click="nextPage"
        ></v-btn>
      </div>
    </template>
  </v-data-iterator>

  <!--List of Profile-->
  <v-dialog v-model="dialog" width="800" transition="dialog-bottom-transition">
    <v-card title="Thông tin" class="rounded-lg">
      <template v-slot:append>
        <v-btn color="primary" variant="text" @click="store.NewProfile = true"
          >Thêm</v-btn
        >
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="dialog = false"
        ></v-btn>
      </template>
      <v-card-text>
        <table-profile></table-profile>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!--Edit member-->
  <v-dialog
    v-model="store.EditMemberDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa" class="rounded-lg">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.EditMemberDialog = false"
        ></v-btn>
      </template>
      <EditMember />
    </v-card>
  </v-dialog>

  <!--Edit room-->
  <v-dialog
    v-model="store.EditRoomDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa" class="rounded-lg">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.EditRoomDialog = false"
        ></v-btn>
      </template>
      <EditRoom />
    </v-card>
  </v-dialog>

  <!--Add New member-->
  <v-dialog
    v-model="store.NewProfile"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Thêm thành viên" class="rounded-lg">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.NewProfile = false"
        ></v-btn>
      </template>
      <NewMember />
    </v-card>
  </v-dialog>

  <!--Caculator Roomcharge-->
  <v-dialog
    v-model="store.CaculatorChargeDialog"
    width="700"
    transition="dialog-bottom-transition"
  >
    <v-card title="Tính tiền phòng " class="rounded-lg">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.CaculatorChargeDialog = false"
        ></v-btn>
      </template>
      <RoomCharge />
    </v-card>
  </v-dialog>

  <!--Notifition Delete Member-->
  <v-dialog
    v-model="notifyMember"
    width="500"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card title="Bạn có muốn xóa thành viên này?" class="rounded-lg">
      <VSpacer />
      <template v-slot:actions class="mx-auto">
        <div class="mx-auto">
          <v-btn @click="notifyMember = false" color="primary"> Từ chối </v-btn>

          <v-btn
            @click="
              notifyMember = false;
              store.DeleteMember();
              reloadPage();
            "
            color="red"
          >
            Đồng ý
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>

  <!--Notifition Checkout Room-->
  <v-dialog
    v-model="notifyRoom"
    width="500"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card title="Bạn có muốn trả phòng này?" class="rounded-lg">
      <VSpacer />
      <template v-slot:actions class="mx-auto">
        <div class="mx-auto">
          <v-btn @click="notifyRoom = false" color="primary"> Từ chối </v-btn>

          <v-btn
            @click="
              notifyRoom = false;
              store.Checkout(store.editPay.id);
            "
            color="red"
          >
            Đồng ý
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>

  <!--Alert Room-->
  <v-snackbar v-model="store.AlertSuccess" :timeout="Timeout" color="success">
    <v-icon class="me-4">mdi-check-circle-outline</v-icon>
    {{ TextAlert }}
  </v-snackbar>

</template>
<script setup>
import EditRoom from "@/components/Form/EditRoom.vue";
import EditMember from "@/components/Form/EditMember.vue";
import NewMember from "@/components/Form/NewMember.vue";
import RoomCharge from "@/components/Form/RoomCharge.vue";
import TableProfile from "@/components/Table/TableProfile.vue";
import AddRoom from "@/components/Card/AddRoom.vue"
import { useAppStore } from "@/store/app";
const store = useAppStore();
store.fetchRoom();
store.fetchService();
</script>
<script>
export default {
  data() {
    return {
      search:"",
      dialog: false,
      TextAlert: "Thành công",      
      Timeout:"3000",
      notifyRoom:false,
      notifyMember:false
 
    };
  },
  methods: {

  },
};
</script>
<style scoped>
.ribbon-wrap {
  width: 120px;
  height: 50px;
}
.ribbon {
  width: 200px;
  font-size: 0.8rem;
  text-align: center;
  padding: 5px 0;
  transform: rotate(40deg);
}
</style>
