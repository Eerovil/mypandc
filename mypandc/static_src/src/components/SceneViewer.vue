<template>
  <div class="wrapper">
  <pinch-zoom ref="pinchzoom" class="pinchzoom"
      v-bind:style="{
      'width': image.width + 'px',
      'height': image.height + 'px',
    }">
    <div
      class="scene-image"
      v-if="image"
      v-bind:style="{
        'background-image': 'url(' + image.url + ')',
        'width': image.width + 'px',
        'height': image.height + 'px',
      }">
    <div
      class="link"
      v-for="link in links"
      :key="link.id"
      v-bind:style="{ 'top': link.location_y + 'px', 'left': link.location_x + 'px' }"
      >
      <a @click="moveToScene(link.scene_to_id)"><img src="/static/cute_bunny1.svg" width="20px" /></a>
    </div>
    </div>
  </pinch-zoom>
  <div class="fixed-toolbar">
    <button
      v-if="link_back"
      @click="moveToScene(link_back.scene_to_id)"
      >
      Takaisin
      </button>
  <div v-if="adminMode">
    <label class="myLabel">
      <input @change="createScene($event)" type="file" required/>
      <span>Add</span>
    </label>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'SceneViewer',
  props: {
    msg: String
  },
  data() {
    return {
      uploadedFile: {}
    }
  },
  computed: {
    currentScene() {
      return this.$store.state.currentScene;
    },
    image() {
      if (this.currentScene) {
        return {
          url: this.currentScene.image,
          width: this.currentScene.image_width,
          height: this.currentScene.image_height,
        }
      }
      return null;
    },
    links() {
      if (!this.currentScene) {
        return []
      }
      return this.currentScene.links.filter(
        link => link.location_x > 0 || link.location_y > 0
      );
    },
    adminMode() {
      return window.location.href.includes('?admin');
    },
    link_back() {
      if (this.currentScene) {
        return this.currentScene.link_back
      }
      return null;
    }
  },
  watch: {
    '$store.state.currentScene'() {
      console.log(this.$refs.pinchzoom)
      setTimeout(() => {
        this.$refs.pinchzoom._onWheel({
          deltaY: 10,
          clientX: 0,
          clientY: 0,
          preventDefault: () => {},
        });
      }, 100)
    }
  },
  methods: {
    moveToScene(scene_id) {
      this.axios.get('/scenes/' + scene_id).then(response => {
        this.$store.commit('setCurrentScene', response.data)
      })
    },
    createScene(event) {
      console.log(event)
      const filename = event.srcElement.files[0].name
      window.getBase64Strings(event.srcElement.files, { maxSize: 20240 }).then((files) => {
        this.uploadedFile = {
          filename,
          file: files[0],
        }
        document.querySelector('.scene-image').addEventListener('click', this.createLink)
      })
    },
    createLink(event) {
      const pinchzoom = this.$refs.pinchzoom;
      document.querySelector('.scene-image').removeEventListener('click', this.createLink);
      const mouseX = (event.x - pinchzoom.x) / pinchzoom.scale;
      const mouseY = (event.y - pinchzoom.y) / pinchzoom.scale;
      console.log(event)
      this.axios.post(
        '/scenes/',
        {
          filename: this.uploadedFile.filename,
          image: this.uploadedFile.file,
        }
      ).then(resp => {
        const scene_to_id = resp.data.id
        this.axios.post(
          `/scenes/${this.currentScene.id}/links/`,
          {
            location_x: mouseX,
            location_y: mouseY,
            scene_to_id: scene_to_id,
          }
        ).then(resp => {
          this.axios.post(
            `/scenes/${scene_to_id}/links/`,
            {
              scene_to_id: this.currentScene.id,
              is_link_back: true,
            }
          )
          this.$store.commit('addLinkToCurrentScene', resp.data)
        })
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
  position: absolute;
}
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.pinchzoom {
  overflow: visible !important;
}
.fixed-toolbar {
  position: fixed;
  top: 10px;
  left: 10px;
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
    background: #DDD;
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
