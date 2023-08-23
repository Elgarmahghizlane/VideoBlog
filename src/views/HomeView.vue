<template>
  <div class=" flex flex-col">
    <BlogPost :post="welcomeScreen" />
    <div class="p-4">
      <h1 class="m-4 font-light text-2xl text-gray-600">
        View More Recent Blogs
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" >
        <BlogCards :post="post" v-for="(post,i) in sampleBlogCards " :key="i" />
      </div>
    </div>

  </div>
</template>
<script>
import BlogPost from "../components/BlogPost.vue"
import BlogCards from "../components/BlogCards.vue"
export default {
  name: "HomeView",
  components: {
    BlogPost,
    BlogCards
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost: "Talk about what excites you, your way.  ",
        span: "Create a unique and quality blog.",
        welcomeScreen: true,
        photo: "banner"
      },
    }
  },
  computed: {
    sampleBlogCards(){
      return this.$store.state.sampleBlogCards
    }
  }
}
</script>
