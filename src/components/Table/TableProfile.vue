<template lang="">
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
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<script>
export default {
  data() {
    return {
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
<style lang=""></style>
