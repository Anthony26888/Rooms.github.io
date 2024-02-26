<template lang="">
  <div class="d-flex flex-wrap justify-center algin-center">
    <div v-for="item in store.data" :key="item">
      <v-card
        class="ma-2 mb-2"
        width="300"
        :title="`Phòng ` + item.number"       
      >
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-icon icon="mdi-home"></v-icon>
          </v-avatar>
        </template>
        <v-card-text>
          <p><b>Số người:</b>  người</p>
          <p><b>Tiền phòng:</b> {{ item.roomcharge }} vnđ</p>
          <div class="d-flex">
            <b>Dịch vụ:</b>
            <p v-if="item.wifi == true" class="ms-2">Wifi</p>
            <p v-if="item.cable == true" class="ms-2">Cáp</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="d-flex justify-center algin-center">
            <div class="ma-1 mb-1">
              <v-btn
                prepend-icon="mdi-pen"
                color="primary"
                variant="tonal"
                @click="
                  dialog = true;
                  store.GetDetail(item.id);
                "
              >
                Thông tin
              </v-btn>
            </div>
            <div class="ma-4 mb-4"></div>
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>

  <!--List of Profile-->
  
  <v-dialog v-model="dialog" width="800" transition="dialog-bottom-transition">
    <v-card title="Thông tin">
      <template v-slot:append>
        <v-btn color="primary" variant="text" @click="news=true">Thêm</v-btn>
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
            <tr v-for="item in store.Info.Family">
              <td>{{ item.name }}</td>
              <td>{{ item.sex }}</td>
              <td>{{ item.birth }}</td>
              <td>{{ item.cccd }}</td>
              <td>{{ item.sdt }}</td>
              <td>{{ item.location }}</td>
              <td>
                <v-btn
                  icon="mdi-pencil"
                  color="success"
                  variant="text"
                  size="10"
                  @click="
                    edit = true;
                    store.GetPerson(item.id);
                  "
                ></v-btn>
                <v-btn
                  icon="mdi-delete"
                  color="red"
                  variant="text"
                  size="10"
                  class="ms-3"
                ></v-btn>
              </td>
            </tr>            
          </tbody>  
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!--Edit of member-->
  <v-dialog v-model="edit" width="500" transition="dialog-bottom-transition">
    <v-card title="Chỉnh sửa">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="edit = false"
        ></v-btn>
      </template>
      <EditMember/>
    </v-card>
  </v-dialog>


  <!--New of member-->
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
      <NewMember/>
    </v-card>
  </v-dialog>
</template>
<script setup>
import EditMember from "@/components/Form/EditMember.vue";
import NewMember from "@/components/Form/NewMember.vue"
import { useAppStore } from "@/store/app";
const store = useAppStore();
store.fetch()
</script>
<script>
export default {
  data() {
    return {
      dialog: false,
      edit: false,
      news:false,
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
