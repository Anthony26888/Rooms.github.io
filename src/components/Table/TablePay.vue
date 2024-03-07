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
            <p v-if="item.status == 'false'" class="text-red">Chưa thanh toán</p>
            <p v-else class="text-success">Đã thanh toán</p>
          </td>
          <td>{{ item.total.toLocaleString("en-US") }}</td>
          <td>{{ item.date }}</td> 
          <td>
            <v-btn              
              color="success"
              variant="text"              
              @click="                
                store.PaidCharge(item.id);
                reloadPage();
              "
            >Thanh toán</v-btn>            
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
      Now:"",

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
  mounted() {
    setInterval(()=>{
      const date = new Date()
      const now = date.toISOString().substring(0,10) 
      this.Now = now
    })
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },

};
</script>

<style lang=""></style>
