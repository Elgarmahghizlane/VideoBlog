<template>

    <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
        <div class="bg-white rounded-lg shadow-lg w-[50%] relative ">
            <div @click="closePreview" class="rounded-full p-1 text-sm bg-gray-200 flex items-end w-[2rem] absolute right-2 top-2 ">
            <Close />
            </div>
            <div class="m-4
            p-4">                   
                <video :src="this.blogCoverVideo" alt="Not Uploaded yet" class="mx-auto w-full h-full">
                    </video>
            </div>
        </div>
    </div>
</template>
<script>
import Close from "./icons/CloseIcon.vue"
export default {
    components:{
        Close
    },
    methods: {
        closePreview() {
            this.$store.commit("openVideoPreview")
        }
    },
    computed: {
        blogCoverVideo() {
            return this.$store.state.blogVideoFileURL
        }
    }
}
</script>