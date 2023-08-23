import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverVideo: "first",
        blogDate: "Aug 20,2023"
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverVideo: "second",
        blogDate: "Aug 20,2023"

      },
      {
        blogTitle: "Blog Card #1",
        blogCoverVideo: "first",
        blogDate: "Aug 20,2023"
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverVideo: "second",
        blogDate: "Aug 20,2023"

      },
      {
        blogTitle: "Blog Card #1",
        blogCoverVideo: "first",
        blogDate: "Aug 20,2023"
      },
    ],
    editPost: null,
    blogDescription: "",
    blogTitle: "",
    blogVideoName: "",
    blogVideoFileURL: null,
    blogVideoPreview: null,
  },
  getters: {
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogDescription = payload
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload
    },
    createFileURL(state, payload) {
      state.blogVideoFileURL = payload
    },
    openVideoPreview(state){
      state.blogVideoPreview = !state.blogVideoPreview
    },

    toggleEditPost(state, payload) {
      state.editPost = payload
      console.log(state.editPost)
    },
    fileNameChange(state, payload) {
      state.blogVideoName = payload
    },
   

  },
  actions: {
  },
  modules: {
  }
})
