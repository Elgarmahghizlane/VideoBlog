<template>
    <div class="flex flex-col items-center justify-center px-6 mx-auto  p-12">
        <div class="w-24 md:w-28 ">
            <img src="../assets/Logo.png" alt="" class="w-full ">
        </div>
        <div class="w-full bg-white rounded-lg shadow mt-4 sm:max-w-md md:p-4 ">
            <div :class="{ invisible: !error }" class="bg-red-200 text-red-500 p-1 px-4 text-sm rounded-sm">
                <p><span>Error:</span> {{ this.errorMsg }}</p>
            </div>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Create your account
                </h1>
                <div class="space-y-4 md:space-y-6">
                    <div v-if="formStep === 1">
                        <input type="text" v-model="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mb-4 focus:outline-[#5eaee1] block w-full p-2.5"
                            placeholder="Your email">
                        <input type="password" v-model="password"
                            class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-[#5eaee1] block w-full p-2.5"
                            placeholder="Password">
                        <div @click="formStep = 2"
                            class="text-white bg-[#5eaee1] hover:bg-[#5eafe16c] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full cursor-pointer">
                            Next
                        </div>
                    </div>
                    <div v-else>
                        <input type="text" v-model="userName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-[#5eaee1] block w-full p-2.5 mb-4"
                            placeholder="Full Name">
                        <input type="number" v-model="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-[#5eaee1] block w-full p-2.5 mb-4"
                            placeholder="Phone">
                        <div>
                            <input type="file" id="img" name="img" accept="image/*" @change="onImageChange">
                        </div>
                        <div class="my-4">
                            <img :src="profileUrl" alt="Profile Image" class="w-32 h-32 rounded-full object-cover" />
                        </div>
                        <div @click="formStep = 1"
                            class="text-white hover:bg-[#5eafe16c] font-medium rounded-lg text-sm  text-center w-[2rem] cursor-pointer">
                            <ArrowLeft class="icon" />
                        </div>
                        <div type="submit" @click="register"
                            class="w-full text-white bg-[#5eaee1] hover:bg-[#5eafe16c] font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
                            Sign up
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-if="showModal" @close="showModal = false" />

    </div>
</template>

<script>
import ArrowLeft from '../components/icons/ArrowLeft.vue';
import Modal from '../components/EmailVerify.vue';
import firebase from "firebase/compat/app"
import db from "../firebase/firebaseInit"


export default {
    components: {
        Modal,
        ArrowLeft
    },
    data() {
        return {
            formStep: 1,
            email: "",
            password: "",
            userName: "",
            phone: "",
            profileUrl: "",
            showModal: false,
            error: null,
            errorMsg: ""

        };
    },
    methods: {
        updateForm(data) {
            console.log("Received data:", data);
            Object.assign(this, data);
            if (this.formStep === 1) {
                this.formStep = 2;
            } else {
                this.formStep = 1;
            }
        },
        onImageChange(event) {
            const file = event.target.files[0];
            this.profileUrl = URL.createObjectURL(file);
        },
        async register() {
            if (this.email !== "" && this.password !== "" && this.userName !== "" && this.phone !== "") {
                const firebaseAuth = await firebase.auth()
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
                const result = await createUser
                const dataBase = db.collection("users").doc(result.user.uid)
                await dataBase.set({
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                    phone: this.phone,
                    profileUrl: this.profileUrl,

                })
                console.log("Successfully")
                this.showModal = true;
                this.$router.push("/login")

                return
            }
            console.log("Failed")
            this.error = true
            this.errorMsg = "Please fill out all the fields !"
            return
        }
    }
};
</script>
<style scoped>
.icon {
    stroke: #5eaee1;
}
</style>