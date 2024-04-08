<template>
  <vContainer>
    <v-row>
      <v-col cols="6">
        <Add />
      </v-col>
      <v-col cols="6">
        <Filter/>
      </v-col>
    </v-row>
    <v-divider :thickness="2"></v-divider>
    <List />
  </vContainer>
</template>
  
<script setup>
import List from '@/components/Card/Rooms.vue'
import Filter from '@/components/Form/FilterRoom.vue'
import Add from '@/components/Card/AddRoom.vue'
</script>