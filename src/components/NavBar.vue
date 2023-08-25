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
                <div class=" hidden md:flex items-center md:gap-6 " >
                    <router-link to="/"
                            class="hover:bg-[#5eaee1] hover:rounded-md hover:text-white font-medium text-center text-base p-2 cursor-pointer tracking-[1px] ">
                            Home
                        </router-link>
                        <router-link to="/blogs"
                            class="hover:bg-[#5eaee1] hover:rounded-md hover:text-white font-medium text-center text-base p-2 cursor-pointer tracking-[1px] ">
                            Blogs
                        </router-link>
                        <router-link v-if="user" to="/create-post"
                            class="hover:rounded-md  font-bold text-center text-base p-2 cursor-pointer w-full tracking-[1px] bg-[#5eaee1] rounded-md  text-white ">
                            Create Post
                        </router-link>
                        <router-link v-if="!user" to="/login"
                            class="hover:rounded-md  font-bold text-center text-base p-2 cursor-pointer w-full tracking-[1px] bg-[#5eaee1] rounded-md  text-white">
                            Login
                        </router-link>
                </div>
                <div class="w-[2.3rem]" v-if="user" @click="profileDropdown = !profileDropdown">
                    <img class="w-full" src="../assets/img/profile.png" alt="">

                    <div v-if="profileDropdown"
                        class="absolute right-0 z-50 top-[3.7rem] mt-4  w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="flex flex-col justify-center items-center  ">
                            <span class="py-1 text-sm text-gray-400  w-full text-center">{{
                                this.$store.state.profileUserName }}</span>
                            <span class="py-1 text-sm text-gray-400  w-full text-center border border-b">{{
                                this.$store.state.profileEmail }}</span>
                            <!-- <span
                            class="py-1 text-sm text-gray-400  w-full text-center border border-b">{{ this.$store.state.profileUrl }}</span> -->


                            <span
                                class="py-1 text-sm text-gray-400 hover:bg-[#5eaee1] hover:text-white hover:rounded-md text-center w-full"
                                @click="logOut">Log out</span>
                        </div>
                    </div>
                </div>
                <!-- Mobile Menu -->

                <div v-if="showMenu" class="md:hidden absolute left-0 z-10 bg-white top-[5.5rem] w-full h-screen">
                    <div class="flex flex-col items-center gap-6 p-1 " >
                        <router-link to="/"
                            class="hover:bg-[#5eaee1] hover:rounded-md hover:text-white font-bold text-center text-sm p-2 cursor-pointer w-full tracking-[1px]">
                            Home
                        </router-link>
                        <router-link to="/blogs"
                            class="hover:bg-[#5eaee1] hover:rounded-md hover:text-white font-bold text-center text-sm p-2 cursor-pointer w-full tracking-[1px]">
                            Blogs
                        </router-link>
                        <router-link v-if="user" to="/create-post"
                            class="hover:rounded-md  font-bold text-center text-sm p-2 cursor-pointer w-full tracking-[1px] bg-[#5eaee1] rounded-md  text-white text-sm'">
                            Create Post
                        </router-link>
                        <router-link v-if="!user" to="/login"
                            class="hover:bg-[#5eaee1] hover:rounded-md hover:text-white font-bold text-center text-sm p-2 cursor-pointer w-full tracking-[1px]">
                            Login
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </nav>
</template>
    
<script>
import firebase from "firebase/compat/app"
import MenuIcon from './icons/MenuIcon.vue'
export default {
    components: {
        MenuIcon,
    },
    data() {
        return {
            name: 'Kalvin',
            showMenu: false,
            profileDropdown: false
        }
    },
    methods: {
        logOut() {
            firebase.auth().signOut();
            window.location.reload()

        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    }
};
</script>
    
<style scoped></style>
    