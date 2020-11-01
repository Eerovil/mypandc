import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'pinch-zoom-element'

window.imageFileToBase64 =  require('image-file-to-base64-exif');

Vue.config.productionTip = false

Vue.config.ignoredElements = [
  'pinch-zoom',
  'imageFileToBase64'
]

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    currentScene: null,
    allScenes: [],
  },
  mutations: {
    setCurrentScene(state, scene) {
      state.currentScene = scene;
    },
    addLinkToCurrentScene(state, link) {
      state.currentScene.links.push(link);
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')