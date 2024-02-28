<template lang="">
  <div class="d-flex flex-wrap justify-center algin-center">
    <div v-for="item in store.data" :key="item">
      <v-card class="ma-2 mb-2" width="400" :title="`Phòng ` + item.number" :subtitle="item.location">
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-icon icon="mdi-home"></v-icon>
          </v-avatar>
        </template>
        <v-card-text>
          <p><b>Số người:</b> người</p>
          <p><b>Tiền phòng:</b> {{ item.roomcharge }} vnđ</p>
          <div class="d-flex">
            <b>Dịch vụ thêm:</b>
            <p v-if="item.wifi == 'true'" class="ms-2">Wifi</p>
            <p v-if="item.cable == 'true'" class="ms-2">Cáp</p>
          </div>
          <p><b>Ngày vào:</b> {{ item.date }}</p>
        </v-card-text>
        <v-card-actions>
          <div class="d-flex justify-center algin-center">
            <div class="ma-1 mb-1">
              <v-btn                
                color="primary"
                variant="tonal"
                @click="
                  dialog = true;
                  store.fetchProfile(item.number);
                  store.GetRoom(item.number, item.id);
                "
              >
                Thông tin
              </v-btn>
            </div>
            <div class="ma-1 mb-1">
              <v-btn                
                color="orange"
                variant="tonal"
                @click="
                  editRoom = true;
                  store.fetchEditRoom(item.id);
                  store.GetRoom(item.number, item.id);
                "
              >
                Sửa
              </v-btn>
            </div>
            <div class="ma-1 mb-1">
              <v-btn                
                color="success"
                variant="tonal"
                @click="
                  caculator = true;
                  store.fetchEditRoom(item.id);
                  store.GetRoom(item.number, item.id);
                "
              >
                Tính tiền
              </v-btn>
            </div>

            <div class="ma-1 mb-1">
              <v-btn                
                color="red"
                variant="tonal"
                @click="
                  
                "
              >
                Xóa
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
        <v-btn color="primary" variant="text" @click="news = true">Thêm</v-btn>
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
                    editMember = true;
                    store.fetchMember(item.name);                    
                  "
                ></v-btn>
                <v-btn
                  icon="mdi-delete"
                  color="red"
                  variant="text"
                  size="10"
                  class="ms-5"
                  @click="notify = true; store.GetIdMember(item.id);"
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!--Edit member-->
  <v-dialog v-model="editMember" width="500" transition="dialog-bottom-transition">
    <v-card title="Chỉnh sửa">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="editMember = false"
        ></v-btn>
      </template>
      <EditMember />
    </v-card>
  </v-dialog>

  <!--Edit room-->
  <v-dialog v-model="editRoom" width="500" transition="dialog-bottom-transition">
    <v-card title="Chỉnh sửa">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="editRoom = false"
        ></v-btn>
      </template>
      <EditRoom />
    </v-card>
  </v-dialog>

  <!--Add New member-->
  <v-dialog v-model="news" width="500" transition="dialog-bottom-transition">
    <v-card title="Thêm thành viên">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="news = false"
        ></v-btn>
      </template>
      <NewMember />
    </v-card>
  </v-dialog>

  <!--Caculator Roomcharge-->
  <v-dialog v-model="caculator" width="700" transition="dialog-bottom-transition">
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

  <!--Notifition -->
  <v-dialog
    v-model="notify"
    width="500"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card      
      title="Bạn có muốn xóa thành viên này?"
    >
      <VSpacer/>
      <template v-slot:actions class="mx-auto">
        <div class="mx-auto">
          <v-btn @click="notify = false" color="primary"> Từ chối </v-btn>

          <v-btn
            @click="
              notify = false;              
              store.DeleteMember();
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
</script>
<script>
export default {
  data() {
    return {
      dialog: false,
      editMember: false,
      editRoom:false,
      news: false,
      notify: false,
      caculator:false,
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
};
</script>
<style scoped></style>
