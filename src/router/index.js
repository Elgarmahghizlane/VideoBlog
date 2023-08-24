import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:"Home"
    }
  },
  {
    path: '/blogs',
    name: 'blog',
    component: () => import( '../views/BlogView.vue'),
    meta:{
      title:"Blogs"
    }
  },
  {
    path: '/create-post',
    name: 'createPost',
    component: () => import( '../views/CreatePost.vue'),
    meta:{
      title:"Create Post"
    }
  },
  {
    path: '/post-preview',
    name: 'BlogPreview',
    component: () => import( '../views/BlogPreview.vue'),
    meta:{
      title:"Preview Post"
    }
  },
  {
    path: '/view-blog',
    name: 'SingleBlog',
    component: () => import( '../views/SingleBlog.vue'),
    meta:{
      title:"Preview Blog Post"
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from ,next) => {
  document.title = `${to.meta.title} | Video Blog`
  next()
})

export default router
