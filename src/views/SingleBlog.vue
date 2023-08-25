<template>
    <div class="m-4 md:w-[80%] md:mx-auto ">
        <div class="p-4 md:p-8 bg-white rounded-lg shadow-lg">
            <div>
                <h1 class="capitalize font-medium md:text-[1.5rem] text-[1.2rem] pl-4 py-2">{{ this.currentBlog[0].blogTitle }}</h1>
                <span class="text-gray-400 text-[12px] pl-4 ">Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString('en-us',{dateStyle:"long"})}}
                </span>
                <div class=" flex justify-center w-32 md:w-60 items-center mx-auto  ">
                <video :src="this.currentBlog[0].blogCoverVideo" controls class="my-2 w-full "></video>
                </div>
                <div class="p-2 text-[1rem] text-left">{{ this.currentBlog[0].blogDescription }}</div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'SingleBlog',
    data() {
        return {
            currentBlog: null,
        }
    },
    async mounted() {
        this.currentBlog = await this.$store.state.blogPosts.filter(post => {
            return post.blogTitle === this.$route.params.blogTitle
        })
    }
}
</script>
