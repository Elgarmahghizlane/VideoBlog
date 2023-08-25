<template>
    <div class="bg-[#eaf3f4] w-full md:flex md:justify-center">
        <div class="flex flex-col items-center justify-center p-8 gap-4">
            <h1 class="font-light text-[2.5rem] md:text-[3.4rem] text-[#5eaee1] tracking-[2px] uppercase mx-4">
                {{ post.title }}
            </h1>
            <div class=" md:mx-18 mx-4 text-left text-black text-base ">
                <h1 class="p-1 whitespace-nowrap">
                    {{ post.blogPost }}
                </h1>
                <h1 class="p-1">
                    {{ post.span }}
                </h1>
            </div>

            <router-link class="rounded-md text-white bg-black hover:bg-[#5eaee1] mt-2 p-3" v-if="post.welcomeScreen"
                to="/login" >Log In / Sign Up
            </router-link>
        </div>
        <div class="blogCover float-right">
            <img :src="require(`../assets/img/${post.photo}.png`)" alt="Banner">

        </div>
    </div>
</template>
<script>
export default {
    name: "BlogPost",
    props: ["post"],
}
</script>