<template>
  <div id="app">
    <SceneViewer/>
  </div>
</template>

<script>
import SceneViewer from './components/SceneViewer.vue'

export default {
  name: 'App',
  components: {
    SceneViewer
  },
  mounted() {
    this.axios.get('/scenes/1').then(response => {
      this.$store.commit('setCurrentScene', response.data)
    })
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
