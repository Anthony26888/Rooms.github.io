<template lang="">
  
  <div class="d-flex flex-wrap justify-center algin-center">
    <div v-for="item in store.User" :key="item">
      <v-card
        class="ma-2 mb-2"
        width="300"
        :title="`Phòng ` + item.number"
        :subtitle="item.Family[0].name"
      >
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-icon icon="mdi-home"></v-icon>
          </v-avatar>
        </template>
        <v-card-text>
          <div class="d-flex">
            <v-icon icon="mdi-human"></v-icon>
            <p>: {{ item.Family.length }} người</p>
          </div>
          <div class="d-flex">
            <v-icon icon="mdi-currency-usd"></v-icon>
            <p>: {{ item.roomcharge }} vnđ</p>
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
            <div class="ma-4 mb-4">
              
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>

  <!--List of family member-->
  <v-dialog v-model="dialog" width="400" transition="dialog-bottom-transition">
    <v-card title="Thông tin">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="dialog = false"
        ></v-btn>
      </template>
      <v-card-text>
        <v-list lines="two" v-for="item in store.Info.Family" :key="item">
          <v-list-item :title="item.name" :subtitle="item.birth">
            <template v-slot:prepend>
              <v-avatar color="blue">
                <v-icon color="white">mdi-account</v-icon>
              </v-avatar>
            </template>

            <template v-slot:append>
              <v-btn
                color="grey-lighten-1"
                icon="mdi-information"
                variant="text"
                @click="
                  detail = true;
                  store.GetPerson(item.id);
                "
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!--Detail of member-->
  <v-dialog v-model="detail" width="400" transition="dialog-bottom-transition">
    <v-card>
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          :title="store.Person.name"
          :subtitle="store.Person.birth"
          class="mx-auto"
        >
          <template v-slot:append>
            <v-btn
              class="mx-auto"
              variant="text"
              icon="mdi-close"
              @click="detail = false"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-title>Năm sinh:</v-list-item-title>

          <v-list-item-subtitle>
            {{ store.Person.birth }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Căn cước công dân:</v-list-item-title>

          <v-list-item-subtitle> {{ store.Person.cccd }} </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Số điện thoại:</v-list-item-title>

          <v-list-item-subtitle> {{ store.Person.sdt }} </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Nghề nghiệp:</v-list-item-title>

          <v-list-item-subtitle> {{ store.Person.work }} </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Quê quán:</v-list-item-title>

          <v-list-item-subtitle>
            {{ store.Person.location }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
import FormEdit from "@/components/Form/FormEdit";

export default {
  data() {
    return {
      dialog: false,
      detail: false,
    };
  },
};
</script>
<style scoped></style>
