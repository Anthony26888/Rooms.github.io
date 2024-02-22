<template lang="">
  <v-dialog  width="300" transition="dialog-bottom-transition">
    <v-card title="Thông tin">
      <v-card-text>
        <v-list lines="two" v-for="item in store.Info.Family" :key="item">
          <v-list-item :title="item.name" :subtitle="item.member">
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
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
      </v-card-actions>
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

export default {
  components: "InfoProduct",
  setup() {
    const store = useAppStore();
    const { Info } = storeToRefs(store);
    return { Info };
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>
