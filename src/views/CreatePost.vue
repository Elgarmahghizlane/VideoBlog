<template>
    <div class="p-4 md:m-4">
        <div class="rounded-md md:p-8 p-2 bg-white shadow-lg ">
            <!-- <BlogCoverPreview v-show="this.$store.state.blogVideoPreview" /> -->
            <!-- <div :class="{ invisible: !error }" class="bg-red-200 text-red-500 p-1 px-4 text-sm rounded-sm">
                <p><span>Error:</span> {{ this.errorMsg }}</p>
            </div> -->
            <div class="blog-info flex flex-col md:flex-row justify-start items-center p-2 ">
                <input class="bg-gray-50 border-b border-gray-400 text-gray-900 text-sm  focus:outline-none p-2 h-8"
                    type="text" placeholder="Enter Blog Title" v-model="$store.state.blogTitle">
                <div class="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 items-center">
                    <div>
                        <label for="blog-video"
                            class="w-32 rounded-full md:ml-4 p-2 px-4 text-sm bg-black text-center text-white cursor-pointer hover:bg-[#c2c2c2c5] tracking-[0.01rem] whitespace-nowrap">Choose
                            Video
                            <input type="file" ref="blogVideo" accept="video/mp4,video/x-m4v,video/*" id="blog-video"
                                style="display: none;" @change="selectVideo" />
                        </label>
                        <span class="text-sm mx-4">
                            {{ selectedVideoFileName }}
                        </span>

                    </div>
                    <!-- <div @click="openPreview"
                        class="bg-gray-200 hover:bg-[#d5d9db] rounded-full hover:text-white text-sm text-center w-32 p-2 cursor-pointer tracking-[0.01rem] whitespace-nowrap"
                        :class="{ 'button-inactive': !this.$store.state.blogVideoFileURL }">
                        Preview Video
                    </div> -->

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
// import BlogCoverPreview from '../components/BlogCoverPreview.vue'

import { db, storage } from "../firebase/firebaseInit";

import { collection, addDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes } from "firebase/storage";


export default {
    // components: {
    //     BlogCoverPreview,
    // },
    name: "CreatePost",
    data() {
        return {
            videoFile: null,
            selectedVideoFileName: ""
        }
    },
    methods: {
        selectVideo(event) {
            this.videoFile = event.target.files[0];
            this.selectedVideoFileName = this.videoFile ? this.videoFile.name : "";
        },
        async uploadBlog() {
            console.log("Uploading blog...");
            try {
                const blogPostsCollection = collection(db, "blogPosts");
                console.log("Collection reference:", blogPostsCollection);
                // Upload the video file to Firebase Storage
                const storagePath = `videos/${this.videoFile.name}`;
                const storageFileRef = storageRef(storage, storagePath);
                await uploadBytes(storageFileRef, this.videoFile);

                // Get the download URL of the uploaded video
                const videoUrl = await storageFileRef.getDownloadURL();

                // Create a new document in Firestore
                await addDoc(blogPostsCollection, {
                    title: this.$store.state.blogTitle,
                    description: this.$store.state.blogDescription,
                    videoUrl: videoUrl
                });
                this.$store.commit("updateBlogTitle", ""); // Clear the title
                this.$store.commit("newBlogPost", ""); // Clear the description
                this.videoFile = null;

                console.log("Blog post uploaded successfully!");
            } catch (error) {
                console.error("Error uploading blog post:", error);
            }
        }
        // async selectVideo(event) {
        //     this.videoFile = event.target.files[0];
        // },
        // fileChange(event) {
        //     const selectedFile = event.target.files[0];
        //     if (selectedFile) {
        //         this.file = selectedFile;
        //         const fileName = this.file.name;
        //         this.$store.commit("fileNameChange", fileName);
        //         this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        //     }
        // },
        // openPreview() {
        //     this.$store.commit("openVideoPreview");
        // },
        // async publishBlog() {
        //     try {
        //         const blogPostsCollection = collection(db, "blogPosts");

        //         // Upload the video file to Firebase Storage
        //         const storagePath = `videos/${this.videoFile.name}`;
        //         const storageFileRef = storageRef(storage, storagePath);
        //         await uploadBytes(storageFileRef, this.videoFile);

        //         // Get the download URL of the uploaded video
        //         const videoUrl = await storageFileRef.getDownloadURL();

        //         const blogData = {
        //             title: this.blogTitle,
        //             description: this.blogDescription,
        //             videoUrl: videoUrl,
        //         };

        //         // Add blog data to Firestore collection
        //         await setDoc(doc(blogPostsCollection), blogData);

        //         // Clear data after successful publishing
        //         this.blogTitle = "";
        //         this.blogDescription = "";
        //         this.videoFile = null; // Use 'this.videoFile' instead of 'this.file'
        //         this.$store.commit("createFileURL", null);

        //         console.log("Blog published successfully!");
        //     } catch (error) {
        //         console.log("Error publishing blog:", error);
        //         this.error = true;
        //         this.errorMsg = "Error publishing blog. Please try again later.";
        //     }
        // },

    },
    // computed: {
    //     blogCoverPhotoName() {
    //         return this.$store.state.blogVideoName
    //     },
    //     blogTitle: {
    //         get() {
    //             return this.$store.state.blogTitle
    //         },
    //         set(payload) {
    //             this.$store.commit("updateBlogTitle", payload)
    //         }
    //     },
    //     blogDescription: {
    //         get() {
    //             return this.$store.state.blogDescription
    //         },
    //         set(payload) {
    //             this.$store.commit("newBlogPost", payload)
    //         }
    //     },
    // }
    computed: {
        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit("updateBlogTitle", payload);
            }
        },
        blogDescription: {
            get() {
                return this.$store.state.blogDescription;
            },
            set(payload) {
                this.$store.commit("newBlogPost", payload);
            }
        }
    },
}
</script>
<style  scoped></style>