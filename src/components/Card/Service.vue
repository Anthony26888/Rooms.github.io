<template lang="">
  <div class="d-flex justify-item-start">
    <v-sheet
      class="pa-4 text-center mx-auto"
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
    v-model="editElectric"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa tiền điện">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="editElectric = false"
        ></v-btn>
      </template>
      <edit-electric></edit-electric>
    </v-card>
  </v-dialog>

  <!--Edit Electric-->
  <v-dialog
    v-model="editWater"
    width="500"
    transition="dialog-bottom-transition"
  >
    <v-card title="Chỉnh sửa tiền nước">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="editWater = false"
        ></v-btn>
      </template>
      <edit-water></edit-water>
    </v-card>
  </v-dialog>
</template>
<script setup>
import EditElectric from "@/components/Form/EditElectric.vue"
import EditWater from "@/components/Form/EditWater.vue"
</script>
<script>

export default {
  name:"Service",
  data() {
    return {
      List: [
        {
          id:"0",
          icon: "mdi-lightning-bolt",
          title: "ĐIỆN",
          color: "orange",
        },
        {
          id:"1",
          icon: "mdi-water",
          title: "NƯỚC",
          color: "primary",
        },
        {
          id:"2",
          icon: "mdi-trash-can",
          title: "RÁC",
          color: "green",
        },
        {
          id:"3",
          icon: "mdi-wifi",
          title: "WIFI",
          color: "indigo",
        },
        {
          id:"4",
          icon: "mdi-television-classic",
          title: "CÁP",
          color: "cyan",
        },
      ],
      editElectric: false,
      editWater:false,
      editTrash:false,
      editWifi:false,
      editCable:false
    };
  },
  methods: {
    edit(item){
      if(item == 0){
        return this.editElectric = true
      };

      if(item == 1){
        return this.editWater = true
      };

      if(item == 2){
        return this.editTrash = true
      };

      if(item == 3){
        return this.editWifi = true
      };

      if(item == 4){
        return this.editCable = true
      };
    }
  },
};
</script>
<style lang=""></style>
