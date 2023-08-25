import Vue from 'vue'
import Vuex from 'vuex'
import db from "../firebase/firebaseInit";
import firebase from "firebase/compat/app"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    user:null,
    profileEmail: null,
    profileUserName: null,
    profileUrl:null,
    profileId: null,
    // profileUrl:null,
    postLoaded: null,
    editPost: null,
    blogDescription: "",
    blogTitle: "",
    blogVideoName: "",
    blogVideoFileURL: null,
    blogVideoPreview: null,

  },
  getters: {
    blogPostsCards(state) {
      return state.blogPosts
    },
    getBlogByTitle: (state) => (title) => {
      return state.blogPosts.find((post) => post.blogTitle === title);
    },
  },
  mutations: {
    updateUser(state,payload){
      state.user = payload
    },
    updateBlogDescription(state, payload) {
      state.blogDescription = payload
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload
    },
    openVideoPreview(state) {
      state.blogVideoPreview = !state.blogVideoPreview
    },
    toggleEditPost(state, payload) {
      state.editPost = payload
    },
    fileNameChange(state, payload) {
      state.blogVideoName = payload
    },
    createFileURL(state, payload) {
      state.blogVideoFileURL = payload
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload)
    },
    setProfileInfo(state,doc){
      state.profileId = doc.id
      state.profileEmail= doc.data().email
      state.profileUserName = doc.data().userName
      state.profileUrl= doc.data().profileUrl
    },
    // setProfileInitials(state){
    //   state.profileInitials = state.profileFirstN
    // }

  },
  actions: {
    async getCurrentUser({commit}){
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit("setProfileInfo",dbResults)
      console.log(dbResults)
    },
    async getPost({ state }) {
      const dataBase = await db.collection('blogPosts').orderBy('date', 'desc')
      const dbResults = await dataBase.get()
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogTitle === doc.title)) {
          const data = {
            blogTitle: doc.data().blogTitle,
            blogDescription: doc.data().blogDescription,
            blogCoverVideo: doc.data().blogCoverVideo,
            blogVideoName: doc.data().blogVideoName,
            blogDate: doc.data().date
          }
          state.blogPosts.push(data)
        }
      })
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload)
      await getPost.delete()
      commit("filterBlogPost", payload);


      // try {
      //   const postRef = db.collection("blogPosts").doc(payload);
      //   await postRef.delete();
      //   commit("filterBlogPost", payload);
      //   console.log("deleted")

      // } catch (error) {
      //   console.error('Error deleting post:', error);
      //   throw error;
      // }
    }
  },
  modules: {
  },
})
