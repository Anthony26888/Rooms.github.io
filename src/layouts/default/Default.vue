<template>
  <v-app class="bg-grey-lighten-4">  
    <div class="d-none d-lg-flex d-xl-none">
      <DefaultView/> 
      <DefaultNavigation/>
    </div>
    <div class="d-lg-none d-xl-flex">
      <DefaultView/> 
      <DefaultBottom/>
    </div>
    
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultNavigation from './Navigation.vue'
  import DefaultBottom from './BottomNavigation.vue'
</script>
