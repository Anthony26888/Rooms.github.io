<template lang="">
  <v-card class="mt-3 mx-auto">
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
        <tr v-for="item in store.pay">
          <td>Phòng {{ item.name }}</td>
          <td >            
            <p v-if="item.stauts = 'false'" class="text-red">Chưa thanh toán</p>
            <p v-else color="success">Đã thanh toán</p>
          </td>
          <td>{{ item.total.toLocaleString("en-US") }}</td>
          <td>{{ item.month }}/{{ item.year }}</td> 
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
              @click="
                notifyMember = true;
                store.GetIdMember(item.id);
              "
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script setup>
import { useAppStore } from "@/store/app";
const store = useAppStore();
store.fetchPay()
</script>
<script>
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      headers: [
        {
          align: "start",
          key: "name",
          sortable: true,
          title: "Phòng",
        },
        { title: "Tình trạng", key: "calories" },
        { title: "Tổng tiền", key: "fat" },
        { title: "Thời gian", key: "protein" },
        { title: "", key: "iron" },
      ],      
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.desserts.length / this.itemsPerPage);
    },
  },
};
</script>

<style lang=""></style>
