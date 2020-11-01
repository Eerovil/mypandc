import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'pinch-zoom-element'

import { getBase64Strings } from 'exif-rotate-js/lib';
window.getBase64Strings = getBase64Strings

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