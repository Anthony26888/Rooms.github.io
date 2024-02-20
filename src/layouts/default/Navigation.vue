<template>
    <v-main>
        <v-navigation-drawer permanent location="left">
            <template v-slot:prepend>
                <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                    :title="title" subtitle="Đăng xuất"></v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list density="compact" nav >
                <router-link to="/" style="text-decoration: none; color: inherit">
                    <v-list-item prepend-icon="mdi-monitor-dashboard" title="Trang chủ" value="home"></v-list-item>
                </router-link>                
                <router-link to="/Rooms" style="text-decoration: none; color: inherit">
                    <v-list-item prepend-icon="mdi-home-city" title="Phòng" value="rooms"></v-list-item>
                </router-link>                
                <v-list-item prepend-icon="mdi-check-decagram" title="Dịch vụ" value="service"></v-list-item>                
            </v-list>
        </v-navigation-drawer>
    </v-main>
</template>
<script>
export default {
    data() {
        return {
            title:"Nhà Trọ Mỹ Hạnh",            
        }
    },
}
</script>
<style lang="">
    
</style>