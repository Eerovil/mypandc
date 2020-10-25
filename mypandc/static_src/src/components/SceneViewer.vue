<template>
  <pinch-zoom class="wrapper">
    <div class="scene-image" v-if="image" v-bind:style="{ 'background-image': 'url(' + image + ')' }">
    <div class="link" v-for="link in links" :key="link.id" v-bind:style="{ 'top': link.location_y + 'px', 'left': link.location_x + 'px' }">
      <a @click="moveToScene(link.scene_to_id)">link</a>
    </div>
    </div>
  </pinch-zoom>
</template>

<script>
export default {
  name: 'SceneViewer',
  props: {
    msg: String
  },
  computed: {
    currentScene() {
      return this.$store.state.currentScene;
    },
    image() {
      if (this.currentScene) {
        return this.currentScene.image;
      }
      return null;
    },
    links() {
      if (!this.currentScene) {
        return []
      }
      return this.currentScene.links;
    }
  },
  methods: {
    moveToScene(scene_id) {
      this.axios.get('/scenes/' + scene_id).then(response => {
        this.$store.commit('setCurrentScene', response.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scene-image, .wrapper {
  width: 100%;
  height: 100%;
}
.link {
  position: absolute;
}
</style>
