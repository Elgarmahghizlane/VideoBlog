<template>
  <div class="flex flex-col min-h-screen bg-[#f1f1f1]">
    <NavBar v-if="!navigation"/>
    <div class="flex-grow ">
      <router-view >
      </router-view>
    </div>
    <VFooter v-if="!navigation"/>

  </div>
</template>

<script>
import firebase from "firebase/compat/app"

import NavBar from './components/NavBar.vue'
import VFooter from './components/VFooter.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    VFooter
  },
  data(){
    return {
      navigation:null
    }
  },
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser" , user)
      if(user){
        this.$store.dispatch("getCurrentUser")
      }
    })
      this.$store.dispatch("getPost")
      this.checkRoute()
  },
  methods:{
    checkRoute(){
      if (
        this.$route.name === "LogIn" ||
        this.$route.name === "RegisTer"){
          this.navigation = true
          return
        }
        this.navigation = false
    }
  },
  watch:{
    $route(){
      this.checkRoute()
    }
  }
}
</script>
