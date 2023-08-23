<template>
    <nav class=" top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div class="flex items-center justify-between py-4 mx-4 md:mx-12 relative">

            <div class="md:hidden w-[2.5rem] " @click="showMenu = !showMenu">
                <MenuIcon />
            </div>
            <!-- Logo -->
            <div class="w-24 md:w-28  ">
                <img src="../assets/Logo.png" alt="" class="w-full ">
            </div>

            <div class="flex items-center gap-6 ">
                <div class=" hidden md:flex items-center md:gap-6 " v-for="(item, i ) in menuItems" :key="i">
                    <router-link :to="item.url" :class="[
                        'hover:bg-[#5eaee1] hover:rounded-md hover:text-white font-medium text-center text-base p-2 cursor-pointer tracking-[1px] ',
                        item.name === 'Create Post' ? 'bg-[#5eaee1] rounded-md text-white' : ''
                    ]">
                        {{ item.name }}
                    </router-link>
                </div>
                <div class="w-[2.3rem] ">
                    <img class="w-full" src="../assets/img/profile.png" alt="">
                </div>

                <!-- Mobile Menu -->

                <div v-if="showMenu" class="md:hidden absolute left-0 z-10 bg-white top-[5.5rem] w-full h-screen">
                    <div class="flex flex-col items-center gap-6 p-1 " v-for="(item, i ) in menuItems" :key="i">

                        <router-link :to="item.url"
                            :class="['hover:bg-[#5eaee1] hover:rounded-md hover:text-white font-bold text-center text-sm p-2 cursor-pointer w-full tracking-[1px]', item.name === 'Create Post' ? 'bg-[#5eaee1] rounded-md p-2 text-white font-bold text-sm' : '']">
                            {{ item.name }}
                        </router-link>

                    </div>
                </div>
            </div>

        </div>
    </nav>
</template>
    
<script>
import MenuIcon from './icons/MenuIcon.vue'
export default {
    components: {
        MenuIcon,
    },
    data() {
        return {
            name: 'Kalvin',
            showMenu: false,
            menuItems: [
                {
                    name: 'Home',
                    url: '/'
                },
                {
                    name: 'Blogs',
                    url: '/blogs'
                },
                {
                    name: 'Create Post',
                    url: '/create-post'
                },
            ]
        }
    },
};
</script>
    
<style scoped></style>
    