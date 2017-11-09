import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost/3002'

})

Vue.use(Vuex)

const state ={
  article : []
}

const mutations = {
 setArticle(state,payload){
   console.log('datadi mutation',payload);
  //  state.article = payload
 }
}

const actions = {
getArticle({commit }){
  http.get('/article')
  .then(({data})=>{
    console.log('data di actions',data)
    commit('setArticle',data)
  })
  .catch(err=>{
    console.error(err)
  })
}
}

const store = new Vuex.store({
  state,
  mutations,
  actions
})

export default store