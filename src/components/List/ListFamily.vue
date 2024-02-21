<template lang="">
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
        <v-btn prepend-icon="mdi-account-search" color="primary" variant="tonal"  v-bind="props"> Thông tin </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {};
</script>
<style lang=""></style>
