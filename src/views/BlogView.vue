<template>
    <div class="p-4 ">
        <div class="p-4 mr-0 flex justify-end">
            <span class="capitalize mr-4">
                Toggle Editing post
            </span>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="editPost" class="sr-only peer">
                <div
                    class="w-11 h-6 bg-gray-200 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5eaee1]">
                </div>
            </label>
        </div>
        <div  class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <BlogCards :post="post" v-for="(post, i) in blogPosts " :key="i" />
        </div>
    </div>
</template>
<script>
import BlogCards from "../components/BlogCards.vue"
export default {
    name: "BlogView",
    components: { BlogCards },
    computed: {
        blogPosts() {
            return this.$store.state.blogPosts
        },
        editPost:{
            get(){
                return this.$store.state.editPost
            },
            set(payload){
                this.$store.commit("toggleEditPost", payload);
            }
        }
    },
    beforeDestroy(){
        this.$store.commit("toggleEditPost", false)
    }
}
</script>