<template>
    <div class="p-4 md:m-4">
        <div class="rounded-md md:p-8 p-2 bg-white shadow-lg ">
            <BlogCoverPreview v-show="this.$store.state.blogVideoPreview" />
            <div :class="{ invisible: !error }" class="bg-red-200 text-red-500 p-1 px-4 text-sm rounded-sm">
                <p><span>Error:</span> {{ this.errorMsg }}</p>
            </div>
            <div class="blog-info flex flex-col md:flex-row justify-start items-center p-2 ">
                <input class="bg-gray-50 border-b border-gray-400 text-gray-900 text-sm  focus:outline-none p-2 h-8"
                    type="text" placeholder="Enter Blog Title" v-model="$store.state.blogTitle">
                <div class="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 items-center ">
                    <label for="blog-video"
                        class="w-32 rounded-full md:ml-4 p-2 px-4 text-sm bg-black text-center text-white cursor-pointer hover:bg-[#c2c2c2c5] tracking-[0.01rem] whitespace-nowrap">Choose
                        Video
                        <input type="file" ref="blogVideo" accept="video/mp4,video/x-m4v,video/*" id="blog-video"
                            @change="fileChange" style="display: none;" />
                    </label>
                    <span class="text-sm mx-4">
                        {{ this.$store.state.blogVideoName }}
                    </span>
                    <div class="bg-gray-200 hover:bg-[#d5d9db] rounded-full hover:text-white text-sm text-center w-32 p-2 cursor-pointer tracking-[0.01rem] whitespace-nowrap"
                        :class="{ 'button-inactive': !this.$store.state.blogVideoFileURL }" @click="openPreview">
                        Preview Video
                    </div>

                </div>
            </div>
            <div>
                <textarea
                    class="w-full bg-gray-50 block p-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-[#5eaee1] focus:border-1"
                    name="" id="" cols="30" rows="10" v-model="$store.state.blogDescription"
                    placeholder="Write Your Blog Description Here ..."></textarea>
            </div>
            <div class="flex gap-4 first-letter my-4">
                <div class="bg-[#5eaee1] rounded-md text-white p-2 cursor-pointer tracking-[1px]" @click="uploadBlog">
                    Publish Blog
                </div>
                <router-link class="bg-[#5eaee1] rounded-md text-white p-2 cursor-pointer tracking-[1px]"
                    to="/post-preview">Post
                    Preview</router-link>
            </div>
        </div>
    </div>
</template>

<script>

import BlogCoverPreview from '../components/BlogCoverPreview.vue'
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import db from "../firebase/firebaseInit";

export default {
    components: {
        BlogCoverPreview,
    },
    name: "CreatePost",
    data() {
        return {
            fill: null,
            error: null,
            errorMsg: null,

        }
    },
    methods: {

        fileChange() {
            this.file = this.$refs.blogVideo.files[0]
            const fileName = this.file.name
            this.$store.commit("fileNameChange", fileName)
            this.$store.commit("createFileURL", URL.createObjectURL(this.file))

        },
        openPreview() {
            this.$store.commit("openVideoPreview")
        },

        uploadBlog() {
            if (this.blogTitle.length !== 0 && this.blogDescription.length !== 0) {
                if (this.file) {
                    const storageRef = firebase.storage().ref();
                    const docRef = storageRef.child(`documents/BlogPostsVideos/${this.$store.state.blogVideoName}`);

                    docRef.put(this.file).then(
                        async () => {
                            const downloadURL = await docRef.getDownloadURL();
                            const timestamp = Date.now();
                            const  dataBase = await db.collection("blogPosts").doc()

                            await dataBase.set({
                                blogID: dataBase.id,
                                blogTitle: this.blogTitle,
                                blogDescription: this.blogDescription,
                                blogCoverVideo: downloadURL,
                                blogVideoName: this.$store.state.blogVideoName,
                                date: timestamp,
                            });
                            
                            alert("Blog post uploaded successfully!");
                            this.$router.push("/view-blog");
                            console.log("Blog post added successfully")
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                    return;
                }
            alert("Blog post uploaded successfully!");
                this.errorMsg = "Make sure that u upload the video"
                setTimeout(() => {
                    this.error = false
                }, 5000)
                return
            }
            this.error = true
            this.errorMsg = "Make sure that u added title and description"
            setTimeout(() => {
                this.error = false
            }, 5000)
            return
        }
    },
    computed: {
        blogCoverPreview() {
            return this.$store.state.blogVideoName
        },
        blogTitle: {
            get() {
                return this.$store.state.blogTitle
            },
            set(payload) {
                this.$store.commit("updateBlogTitle", payload)
            }
        },
        blogDescription: {
            get() {
                return this.$store.state.blogDescription
            },
            set(payload) {
                this.$store.commit("updateBlogDescription", payload)
            }
        }
    }

}
</script>
<style  scoped></style>