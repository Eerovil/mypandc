<template>
  <div id="app">
    <SceneViewer
      v-if="currentScene"
    />
    <div v-if="!currentScene">
      <label class="myLabel">
        <input @change="createScene($event)" type="file" required/>
        <span>Create scene</span>
    </label>
    </div>
  </div>
</template>

<script>
import SceneViewer from './components/SceneViewer.vue'

export default {
  name: 'App',
  components: {
    SceneViewer
  },
  computed: {
    currentScene() {
      return this.$store.state.currentScene;
    }
  },
  methods: {
    createScene(event) {
      console.log(event)
      const filename = event.srcElement.files[0].name
      window.getBase64Strings(event.srcElement.files, { maxSize: 20240 }).then(files => {
        this.axios.post(
          '/scenes/',
          {
            filename: filename,
            image: files[0],
          }
        ).then(resp => {
          this.$store.commit('setCurrentScene', resp.data)
        })
      })
    },
  },
  mounted() {
    this.axios.get('/scenes/1').then(response => {
      this.$store.commit('setCurrentScene', response.data)
    })
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

label.myLabel input[type="file"] {
    position:absolute;
    top: -1000px;
}

/***** Example custom styling *****/
.myLabel {

    border: 2px solid #AAA;
    border-radius: 4px;
    padding: 2px 5px;
    margin: 2px;
    background: black;
    display: inline-block;
}
.myLabel:hover {
    background: #CCC;
}
.myLabel:active {
    background: #CCF;
}
.myLabel :invalid + span {
    color: #A44;
}
.myLabel :valid + span {
    color: #4A4;
}
</style>
