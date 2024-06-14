<template lang="">
  <div class="d-flex flex-wrap justify-center algin-center">   
    <v-sheet
      class="ma-2 mb-2 pa-4 text-center mx-auto"
      elevation="5"
      width="150"
      height="120"
      rounded="lg"
      v-for="item in List"
      :key="item"
      @click="edit(item.id)"
    >
      <v-icon
        class="mb-3"
        :color="item.color"
        :icon="item.icon"
        size="50"
      ></v-icon>
      <h4 class="b-6">{{ item.title }}</h4>
    </v-sheet>
  </div>

  <!--Edit Electric-->
  <v-dialog
    v-model="store.EditElectricDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa tiền điện">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.EditElectricDialog = false"
        ></v-btn>
      </template>
      <edit-electric></edit-electric>
    </v-card>
  </v-dialog>

  <!--Edit Water-->
  <v-dialog
    v-model="store.EditWaterDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa tiền nước">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.EditWaterDialog = false"
        ></v-btn>
      </template>
      <edit-water></edit-water>
    </v-card>
  </v-dialog>

  <!--Edit Trash-->
  <v-dialog
    v-model="store.EditTrashDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa tiền rác">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.EditTrashDialog = false"
        ></v-btn>
      </template>
      <edit-trash></edit-trash>
    </v-card>
  </v-dialog>

  <!--Edit Wifi-->
  <v-dialog
    v-model="store.EditMoreDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa tiền wifi và cáp">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="store.EditMoreDialog = false"
        ></v-btn>
      </template>
      <edit-more></edit-more>
    </v-card>
  </v-dialog>
  <!--Alert-->
  <v-snackbar v-model="store.AlertSuccess" :timeout="Timeout" color="success">
    <v-icon class="me-4">mdi-check-circle-outline</v-icon>
    {{ TextAlert }}
  </v-snackbar>
</template>
<script setup>
import EditElectric from "@/components/Form/EditElectric.vue";
import EditWater from "@/components/Form/EditWater.vue";
import EditTrash from "@/components/Form/EditTrash.vue";
import EditMore from "@/components/Form/EditMore.vue";
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
export default {
  name: "Service",
  data() {
    return {
      List: [
        {
          id: "0",
          icon: "mdi-lightning-bolt",
          title: "ĐIỆN",
          color: "orange",
        },
        {
          id: "1",
          icon: "mdi-water",
          title: "NƯỚC",
          color: "primary",
        },
        {
          id: "2",
          icon: "mdi-trash-can",
          title: "RÁC",
          color: "green",
        },
        {
          id: "3",
          icon: "mdi-view-grid-plus",
          title: "Dịch vụ thêm",
          color: "indigo",
        },
      ],
      editElectric: false,
      editWater: false,
      editTrash: false,
      editMore: false,
      Timeout:1000,
      TextAlert: "Thành công",
    };
  },
  methods: {
    edit(item) {
      if (item == 0) {
        return (store.EditElectricDialog = true);
      }

      if (item == 1) {
        return (store.EditWaterDialog = true);
      }

      if (item == 2) {
        return (store.EditTrashDialog = true);
      }

      if (item == 3) {
        return (store.EditMoreDialog = true);
      }
    },
  },
};
</script>
<style lang=""></style>
