<template>
  <v-app class="bg-grey-lighten-4">  
    <div class="d-none d-lg-flex d-xl-none">
      <default-view class="w-100"></default-view> 
      <default-navigation></default-navigation>
    </div>
    <div class="d-lg-none d-xl-flex">
      <default-view class="w-100"></default-view>
      <default-bottom></default-bottom>
    </div>
    
  </v-app>
</template>

<script setup>
  
  import DefaultView from './View.vue'
  import DefaultNavigation from './Navigation.vue'
  import DefaultBottom from './BottomNavigation.vue'
</script>
