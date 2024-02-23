<template lang="">
  <v-list>
    <v-list-item
      prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
      :title="store.Person.name"
      :subtitle="store.Person.birth"
      class="mx-auto"
    >
    </v-list-item>
  </v-list>

  <v-divider></v-divider>

  <v-list>
    <v-list-item>
      <v-list-item-title>Quan hệ:</v-list-item-title>

      <v-list-item-subtitle>
        {{ store.Person.member }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>Năm sinh:</v-list-item-title>

      <v-list-item-subtitle>
        {{ store.Person.birth }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>Căn cước công dân:</v-list-item-title>

      <v-list-item-subtitle> 025421428 </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>Số điện thoại:</v-list-item-title>

      <v-list-item-subtitle> 0908799042 </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>Nghề nghiệp:</v-list-item-title>

      <v-list-item-subtitle> Nhân viên văn phòng </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>Quê quán:</v-list-item-title>

      <v-list-item-subtitle>
        {{ store.Person.location }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
export default {
  components: "InfoPerson",
  setup() {
    const store = useAppStore();
    const { Person } = storeToRefs(store);
    return { Person };
  },
  data() {
    return {};
  },
};
</script>
<style lang=""></style>
