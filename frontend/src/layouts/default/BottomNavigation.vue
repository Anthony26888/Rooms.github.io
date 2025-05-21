<template lang="">
  <v-bottom-navigation :elevation="7" color="green-darken-1" class="bg-grey-lighten-2" grow>
    <div v-for="item in List" :key="item">
        <router-link :to="item.router" style="text-decoration: none; color: inherit">
            <v-btn >
                <v-icon>{{ item.icon }}</v-icon>

                <span>{{ item.title }}</span>
            </v-btn>
      </router-link>
    </div>
  </v-bottom-navigation>
</template>
<script>
export default {
    data() {
        return {
            List:[
                {title:"Phòng trọ", icon:"mdi-home", router:"/"},
            ]
        }
    },
};
</script>
<style lang=""></style>
