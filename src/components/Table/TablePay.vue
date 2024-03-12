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
              prepend-icon="mdi-cash-check" 
              variant="tonal"             
              @click="                
                store.PaidCharge(item.id);
                store.Payment(item.total);
              "
            >Thanh Toán</v-btn>  
            
            <v-btn              
              color="red"
              prepend-icon="mdi-delete" 
              variant="tonal" 
              class="ms-2"             
              @click="                
                store.DeletePaid(item.id);                
              "
            >Xóa</v-btn> 
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script setup>
import { useAppStore } from "@/store/app";


</script>
<script>
const store = useAppStore();
store.fetchPay()
export default {
  name:"TablePay",
  data() {
    return {
      Now:"",

      headers: [
        {title: "Phòng"},
        { title: "Tình trạng"},
        { title: "Tổng tiền"},
        { title: "Thời gian"},
        { title: ""},
      ], 
       
    };
  },
  mounted() {
    setInterval(()=>{
      const date = new Date()
      const now = date.toISOString().substring(0,10) 
      this.Now = now
    },10);

  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    
   
  },

};
</script>

<style lang=""></style>
