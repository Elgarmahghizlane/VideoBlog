<template>
    <div class="bg-white rounded-md flex flex-col relative shadow ">
        <div v-show="editPost" class="icons absolute top-0 right-0 z-50 flex space-x-2 p-2">
            <div class="w-[2rem] bg-white rounded-full hover:bg-[#5eaee1] cursor-pointer ">
                <Edit class="icon m-1 " />
            </div>
            <div class="w-[2rem] bg-white rounded-full hover:bg-[#5eaee1] cursor-pointer " @click="deletePost">
                <Delete class="icon m-1"/>
            </div>
        </div>
        <div class="w-80 md:w-52 rounded-t-md p-4 mx-auto ">
            <video :src="post.blogCoverVideo" class="rounded-md " ></video>
        </div>
        <div class="p-4 ">
            <h1 class="capitalize text-[1.4rem] pb-2  ">{{ post.blogTitle }} </h1>
            <h1 class="font-light text-[0.8rem] text-gray-600 text-left ">
                Posted on : {{ new Date(post.blogDate).toLocaleString('en-us',{dateStyle:"long"}) }}
            </h1>
        </div>
        <router-link class="uppercase text-sm flex items-center gap-2 p-4 hover:text-[#5eaee1] " :to="`/single-blog/${post.blogTitle}`">View the post
            <span class="w-[1.8rem]">
                <Arrow />
            </span>
        </router-link>
    </div>
</template>
<script>
import Arrow from './icons/ArrowrRight.vue'
import Edit from './icons/EditIcon.vue'
import Delete from './icons/DeleteIcon.vue'

export default {
    name: "BlogCards",
    props: ["post"],
    components: {
        Arrow,
        Edit,
        Delete
    },
    methods:{
        deletePost() {
            this.$store.dispatch("deletePost",this.post.blogID)
        }
    },
    computed:{
        editPost(){
            return this.$store.state.editPost
        }
    }
}
</script>
<style>
.icon:hover path {
  stroke: white; }
</style>