<template>
  <v-app class="bg-grey-lighten-4">  
    <DefaultView/> 
        
    <DefaultNavigation/> 
    <DefaultBar/>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultNavigation from './Navigation.vue'
</script>
