<template>
    <div class="flex flex-col items-center justify-center px-6 mx-auto p-12">
        <div class="w-24 md:w-28">
            <img src="../assets/Logo.png" alt="" class="w-full ">
        </div>
        <div class="w-full bg-white rounded-lg shadow mt-4 sm:max-w-md md:p-4 ">
            <div v-show="error" class="bg-red-200 text-red-500 p-1 px-4 text-sm rounded-sm">
                <p><span>Error:</span> {{ this.errorMsg }}</p>
            </div>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Log in to your account
                </h1>
                <div class="space-y-4 md:space-y-6" >
                    <div>
                        <input type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-[#5eaee1]  block w-full p-2.5 "
                            placeholder="Your email" v-model="email">
                    </div>
                    <div>
                        <input type="password" placeholder="Password" v-model="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-[#5eaee1]  block w-full p-2.5">
                    </div>
                    <div class="flex items-center justify-end">
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot
                            password?</a>
                    </div>
                    <div @click.prevent="signIn"
                        class="w-full text-white bg-[#5eaee1]  hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign
                        in</div>
                    <p class="text-sm font-light text-gray-500 ">
                        Don’t have an account yet? <a href="/register"
                            class="font-medium text-primary-600 hover:underline ">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from "firebase/compat/app"

export default {
    data() {
        return {
            email: null,
            password: null,
            error: null,
            errorMsg: ""
        }
    },
    methods: {
        signIn() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push('/')
                    this.error = false
                    this.errorMsg = ""
                }).catch((err) => {
                    this.error = true
                    this.errorMsg = err.message
                })
        }
    }
}
</script>