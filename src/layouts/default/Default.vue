<template>
  <v-app class="bg-grey-lighten-4">  
    <default-view class="w-100"></default-view> 
    <default-navigation class="d-none d-lg-flex"></default-navigation>
    <default-bottom class="d-lg-none d-md-flex"></default-bottom>

    
  </v-app>
</template>

<script setup>
  
  import DefaultView from './View.vue'
  import DefaultNavigation from './Navigation.vue'
  import DefaultBottom from './BottomNavigation.vue'
</script>
