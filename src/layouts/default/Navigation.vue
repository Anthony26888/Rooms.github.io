<template>
    <v-main>
        <v-navigation-drawer location="left">
            <template v-slot:prepend>
                <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                    :title="title"></v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list density="compact" nav >
                <router-link to="/" style="text-decoration: none; color: inherit">
                    <v-list-item prepend-icon="mdi-monitor" title="Trang chủ" value="home"></v-list-item>
                </router-link>                
                <router-link to="/Rooms" style="text-decoration: none; color: inherit">
                    <v-list-item prepend-icon="mdi-home" title="Phòng trọ" value="rooms"></v-list-item>
                </router-link>      
                <router-link to="/Service" style="text-decoration: none; color: inherit">
                    <v-list-item prepend-icon="mdi-check" title="Dịch vụ" value="service"></v-list-item> 
                </router-link>   
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <router-link to="/" style="text-decoration: none; color: inherit">
                        <v-list-item prepend-icon="mdi-logout" title="Đăng xuất"></v-list-item>
                    </router-link> 
                </div>
            </template>
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