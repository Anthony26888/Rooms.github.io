<template lang="">
  <v-dialog width="500" transition="dialog-bottom-transition">
    <v-card title="Thông tin" height="450">
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
                @click="reveal = true; store.GetPerson(item.id)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-expand-transition>
        <v-card v-if="reveal" class="v-card--reveal" style="height: 100%">
          <list-info></list-info>
          <v-card-actions>                      
            <v-btn class="mx-auto" text="Đóng" @click="reveal = false"></v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();

</script>
<script>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import ListInfo from "@/components/List/ListInfo.vue"
export default {
  components: "InfoRoom",
  setup() {
    const store = useAppStore();
    const { Info } = storeToRefs(store);
    return { Info };
  },
  data() {
    return {
      reveal: false,
    };
  },
};
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
