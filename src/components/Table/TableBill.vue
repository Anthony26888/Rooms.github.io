<template lang="">
  <table class="table w-100 pa-3 pb-3">
    <tbody class="table-group-divider">
      <tr>
        <td scope="row" class="text-start text-table">Tiền phòng:</td>
        <td></td>
        <td></td>
        <td class="text-end">
          {{ Number(store.editPay.roomcharge).toLocaleString("en-GB") }}
        </td>
      </tr>
      <tr>
        <td scope="row" class="text-start text-table">
          Điện:<br />
          {{ store.editPay.electricnew }} - {{ store.editPay.electricold }} =
          {{ store.editPay.resultElectric }} kW
        </td>
        <td></td>
        <td></td>
        <td class="text-end">
          {{ Number(store.editPay.electric).toLocaleString("en-GB") }}
        </td>
      </tr>
      <tr>
        <td scope="row" class="text-start text-table">
          Nước: ({{ store.editPay.qtyMember }} người)
        </td>
        <td></td>
        <td></td>
        <td class="text-end">
          {{ Number(store.editPay.water).toLocaleString("en-GB") }}
        </td>
      </tr>
      <tr>
        <td scope="row" class="text-start text-table">Rác:</td>
        <td></td>
        <td></td>
        <td class="text-end">
          {{ Number(store.editPay.trash).toLocaleString("en-GB") }}
        </td>
      </tr>
      <tr>
        <td scope="row" class="text-start text-table">Wifi:</td>
        <td></td>
        <td></td>
        <td class="text-end">
          {{ Number(store.editPay.wifi).toLocaleString("en-GB") }}
        </td>
      </tr>
      <tr>
        <td scope="row" class="text-start text-table">Cáp:</td>
        <td></td>
        <td></td>
        <td class="text-end">
          {{ Number(store.editPay.cable).toLocaleString("en-GB") }}
        </td>
      </tr>
      <tr>
        <td scope="row" class="text-start text-table">Tiền nợ:</td>
        <td></td>
        <td></td>
        <td class="text-end">
          {{ Number(store.editPay.debt).toLocaleString("en-GB") }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" class="text-start"><h3>Tổng:</h3></th>
        <td></td>
        <td></td>
        <td class="text-end">
          <h3>
            {{ Number(store.editPay.total).toLocaleString("en-GB") }}
          </h3>
        </td>
      </tr>
    </tfoot>
  </table>
  <!--
    <v-img  
    width="200" 
    class="mx-auto mb-1" 
    aspect-ratio="1/1"
    cover
    :src= "UrlBank"
  ></v-img>
  -->
</template>
<script setup>
import { useAppStore } from "@/store/app";
</script>
<script>
const store = useAppStore();
export default {
  data() {
    return {
      UrlBank: `https://img.vietqr.io/image/STB-060109675711-qr_only.png?amount=${store.editPay.total}&addInfo=Phong${store.editPay.name}%20Chuyen%20Tien`,
    };
  },
};
</script>
<style lang=""></style>
