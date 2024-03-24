<template lang="">
  <div class="d-flex">
    <v-card width="200">
      <v-card-text>Tháng 02/2024</v-card-text>
    </v-card>
    <v-select
      width="200"
      label="Thời gian"
      :items="List"
      item-title="title"
      variant="outlined"
    ></v-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      List: [
        { title: "01/2024", value: "12024" },
        { title: "02/2024", value: "22024" },
        { title: "03/2024", value: "32024" },
        { title: "04/2024", value: "42024" },
        { title: "05/2024", value: "52024" },
        { title: "06/2024", value: "62024" },
        { title: "07/2024", value: "72024" },
        { title: "08/2024", value: "82024" },
        { title: "09/2024", value: "92024" },
        { title: "10/2024", value: "102024" },
        { title: "11/2024", value: "112024" },
        { title: "12/2024", value: "122024" },
      ],
    };
  },
};
</script>
<style lang=""></style>
