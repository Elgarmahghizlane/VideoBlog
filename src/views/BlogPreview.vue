<template>
    <div class="m-4 md:w-[80%] md:mx-auto ">
        <div class="p-4 md:p-8 bg-white rounded-lg shadow-lg">
            <h1 class="capitalize font-semibold md:text-[1.5rem] text-[1.2rem] pl-4 py-2">{{ this.blogTitle }}</h1>
            <div class=" flex justify-center items-center ">
                <video :src="blogCoverVideo" alt="Not Uploaded yet"  controls class="mx-auto my-2 w-[90%] md:w-[60%]  ">
                </video>
            </div>
            <div class="p-2 text-[1rem]" v-html="blogDescription">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostPreview",
    computed: {
        blogTitle() {
            return this.$store.state.blogTitle
        },
        blogDescription() {
            return this.$store.state.blogDescription
        },
        blogCoverVideo() {
            return this.$store.state.blogVideoFileURL
        },
    }
}
</script>