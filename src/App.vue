<template>
  <div class="flex flex-col min-h-screen bg-[#f1f1f1]">
    <NavBar />
    <div class="flex-grow ">
      <router-view >
      </router-view>
    </div>
    <VFooter/>

  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from './components/NavBar.vue'
import VFooter from './components/VFooter.vue'
export default {
  name: 'DashBoard',
  components: {
    NavBar,
    VFooter
  }
}
</script>
