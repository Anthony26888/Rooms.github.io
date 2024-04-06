<template lang="">
  <div class="d-flex flex-wrap justify-center algin-center">
    <div v-for="(item, index) in store.Room" :key="item">
      <v-card
        class="ma-2 mb-2 card-room"        
        :title="`Phòng ` + item.number"
        :subtitle="item.location"
      >
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-icon icon="mdi-home"></v-icon>
          </v-avatar>
        </template>
        <template v-slot:append>
          <div class="ribbon-wrap">
            <div class="ribbon bg-success" v-if="item.status == 'true'">
              Đã thuê
            </div>
            <div class="ribbon bg-red" v-else>Trống</div>
          </div>
        </template>
        <v-card-text>
          <p><b>Số người:</b> {{ item.qty }} người</p>
          <p><b>Tiền phòng:</b> {{ item.roomcharge }} vnđ</p>
          <div class="d-flex">
            <b>Dịch vụ thêm:</b>
            <p v-if="item.wifi == 'true'" class="ms-2">Wifi</p>
            <p v-if="item.cable == 'true'" class="ms-2">Cáp</p>
          </div>
          <p><b>Ngày vào:</b> {{ item.date }}</p>
        </v-card-text>
        <v-card-actions>
          <div class="d-flex flex-wrap justify-center algin-center mx-auto">
            <div class="ma-1 mb-1">
              <v-btn
                class="button-card"
                color="primary"
                variant="tonal"
                @click="
                  dialog = true;
                  store.fetchProfile(item.number);
                "
              >
                Thông tin
              </v-btn>
            </div>
            <div class="ma-1 mb-1">
              <v-btn
                class="button-card"
                color="orange"
                variant="tonal"
                @click="
                  store.EditRoomDialog = true;
                  store.fetchEditRoom(item.id);
                "
              >
                Sửa
              </v-btn>
            </div>
            <div class="ma-1 mb-1">
              <v-btn
                class="button-card"
                color="success"
                variant="tonal"
                @click="
                  caculator = true;
                  store.fetchEditRoom(item.id);
                "
                v-if="item.status == 'true'"
              >
                Tính tiền
              </v-btn>
              <v-btn
                class="button-card"
                color="success"
                variant="tonal"
                disabled
                @click="
                  caculator = true;
                  store.fetchEditRoom(item.id);
                "
                v-else
              >
                Tính tiền
              </v-btn>
            </div>

            <div class="ma-1 mb-1">
              <v-btn
                class="button-card"
                color="red"
                variant="tonal"
                @click="
                  notifyRoom = true;
                  store.fetchEditRoom(item.id);
                "
                v-if="item.status == 'true'"
              >
                Trả
              </v-btn>
              <v-btn
                color="red"
                variant="tonal"
                disabled
                @click="
                  notifyRoom = true;
                  store.fetchEditRoom(item.id);
                "
                v-else
              >
                Trả
              </v-btn>
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>

  <!--List of Profile-->
  <v-dialog v-model="dialog" width="800" transition="dialog-bottom-transition">
    <v-card title="Thông tin">
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
        <v-table>
          <thead>
            <tr>
              <th class="text-left" v-for="item in headers" :key="item">
                {{ item.title }}
              </th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.profile">
              <td>{{ item.name }}</td>
              <td>{{ item.sex }}</td>
              <td>{{ item.birth }}</td>
              <td>{{ item.cccd }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.location }}</td>
              <td>
                <v-btn
                  icon="mdi-pencil"
                  color="success"
                  variant="text"
                  size="10"
                  @click="
                    store.EditMemberDialog = true;
                    store.fetchMember(item.name, item.id);
                  "
                ></v-btn>
                <v-btn
                  icon="mdi-delete"
                  color="red"
                  variant="text"
                  size="10"
                  class="ms-5"
                  @click="
                    notifyMember = true;
                    store.fetchMember(item.name, item.id);
                  "
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!--Edit member-->
  <v-dialog
    v-model="store.EditMemberDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa">
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
    <v-card title="Chỉnh sửa">
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
    <v-card title="Thêm thành viên">
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
    v-model="caculator"
    width="700"
    transition="dialog-bottom-transition"
  >
    <v-card title="Tính tiền phòng ">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="caculator = false"
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
    <v-card title="Bạn có muốn xóa thành viên này?">
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
    <v-card title="Bạn có muốn trả phòng này?">
      <VSpacer />
      <template v-slot:actions class="mx-auto">
        <div class="mx-auto">
          <v-btn @click="notifyRoom = false" color="primary"> Từ chối </v-btn>

          <v-btn
            @click="
              notifyRoom = false;
              store.Checkout();
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
import EditRoom from "@/components/Form/EditRoom.vue";
import EditMember from "@/components/Form/EditMember.vue";
import NewMember from "@/components/Form/NewMember.vue";
import RoomCharge from "@/components/Form/RoomCharge.vue";
import { useAppStore } from "@/store/app";
const store = useAppStore();
store.fetchRoom();
store.fetchService();
</script>
<script>
export default {
  data() {
    return {
      dialog: false,      
      notifyMember: false,
      notifyRoom: false,
      caculator: false,
      headers: [
        { title: "Họ và Tên" },
        { title: "Giới tính" },
        { title: "Năm sinh" },
        { title: "CCCD" },
        { title: "SĐT" },
        { title: "Quê Quán" },
      ],
    };
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
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
@media only screen and (max-width: 700px) {
  .button-card{
    width: 50px;
    font-size:9px
    
  }
  .card-room{
    width: 350px;
  }
}
@media only screen and (max-width: 1024px) {
  .button-card{
    width: 70px;
    font-size:10px
    
  }
  .card-room{
    width: 350px;
  }
}
@media only screen and (max-width: 1440px) {
 
  .card-room{
    width: 350px;
  }
}
@media only screen and (max-width: 1920px) {
  
  .card-room{
    width: 380px;
  }
}
</style>
