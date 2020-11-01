(function(e){function n(n){for(var i,o,a=n[0],s=n[1],u=n[2],f=0,d=[];f<a.length;f++)o=a[f],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);l&&l(n);while(d.length)d.shift()();return c.push.apply(c,u||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],i=!0,a=1;a<t.length;a++){var s=t[a];0!==r[s]&&(i=!1)}i&&(c.splice(n--,1),e=o(o.s=t[0]))}return e}var i={},r={app:0},c=[];function o(n){if(i[n])return i[n].exports;var t=i[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=i,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)o.d(t,i,function(n){return e[n]}.bind(null,i));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=n,a=a.slice();for(var u=0;u<a.length;u++)n(a[u]);var l=s;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var i=t("85ec"),r=t.n(i);r.a},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var i=t("2b0e"),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[e.currentScene?t("SceneViewer"):e._e(),e.currentScene?e._e():t("div",[t("label",{staticClass:"myLabel"},[t("input",{attrs:{type:"file",required:""},on:{change:function(n){return e.createScene(n)}}}),t("span",[e._v("Create scene")])])])],1)},c=[],o=(t("b0c0"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"wrapper"},[t("pinch-zoom",{ref:"pinchzoom",staticClass:"pinchzoom",style:{width:e.image.width+"px",height:e.image.height+"px"}},[e.image?t("div",{staticClass:"scene-image",style:{"background-image":"url("+e.image.url+")",width:e.image.width+"px",height:e.image.height+"px"}},e._l(e.links,(function(n){return t("div",{key:n.id,staticClass:"link",style:{top:n.location_y+"px",left:n.location_x+"px"}},[t("a",{on:{click:function(t){return e.moveToScene(n.scene_to_id)}}},[t("img",{attrs:{src:"/static/cute_bunny1.svg",width:"20px"}})])])})),0):e._e()]),t("div",{staticClass:"fixed-toolbar"},[e.link_back?t("button",{on:{click:function(n){return e.moveToScene(e.link_back.scene_to_id)}}},[e._v(" Takaisin ")]):e._e(),e.adminMode?t("div",[t("label",{staticClass:"myLabel"},[t("input",{attrs:{type:"file",required:""},on:{change:function(n){return e.createScene(n)}}}),t("span",[e._v("Add")])])]):e._e()])],1)}),a=[],s=(t("4de4"),t("caad"),t("2532"),{name:"SceneViewer",props:{msg:String},data:function(){return{uploadedFile:{}}},computed:{currentScene:function(){return this.$store.state.currentScene},image:function(){return this.currentScene?{url:this.currentScene.image,width:this.currentScene.image_width,height:this.currentScene.image_height}:null},links:function(){return this.currentScene?this.currentScene.links.filter((function(e){return e.location_x>0||e.location_y>0})):[]},adminMode:function(){return window.location.href.includes("?admin")},link_back:function(){return this.currentScene?this.currentScene.link_back:null}},watch:{"$store.state.currentScene":function(){var e=this;console.log(this.$refs.pinchzoom),setTimeout((function(){e.$refs.pinchzoom.scaleTo(.001)}),100)}},methods:{moveToScene:function(e){var n=this;this.axios.get("/scenes/"+e).then((function(e){n.$store.commit("setCurrentScene",e.data)}))},createScene:function(e){var n=this;console.log(e);var t=e.srcElement.files[0].name;window.getBase64Strings(e.srcElement.files,{maxSize:20240}).then((function(e){n.uploadedFile={filename:t,file:e[0]},document.querySelector(".scene-image").addEventListener("click",n.createLink)}))},createLink:function(e){var n=this,t=this.$refs.pinchzoom;document.querySelector(".scene-image").removeEventListener("click",this.createLink);var i=(e.x-t.x)/t.scale,r=(e.y-t.y)/t.scale;console.log(e),this.axios.post("/scenes/",{filename:this.uploadedFile.filename,image:this.uploadedFile.file}).then((function(e){var t=e.data.id;n.axios.post("/scenes/".concat(n.currentScene.id,"/links/"),{location_x:i,location_y:r,scene_to_id:t}).then((function(e){n.axios.post("/scenes/".concat(t,"/links/"),{scene_to_id:n.currentScene.id,is_link_back:!0}),n.$store.commit("addLinkToCurrentScene",e.data)}))}))}}}),u=s,l=(t("f249"),t("2877")),f=Object(l["a"])(u,o,a,!1,null,"46b168d3",null),d=f.exports,p={name:"App",components:{SceneViewer:d},computed:{currentScene:function(){return this.$store.state.currentScene}},methods:{createScene:function(e){var n=this;console.log(e);var t=e.srcElement.files[0].name;window.getBase64Strings(e.srcElement.files,{maxSize:20240}).then((function(e){n.axios.post("/scenes/",{filename:t,image:e[0]}).then((function(e){n.$store.commit("setCurrentScene",e.data)}))}))}},mounted:function(){var e=this;this.axios.get("/scenes/1").then((function(n){e.$store.commit("setCurrentScene",n.data)}))}},h=p,m=(t("034f"),Object(l["a"])(h,r,c,!1,null,null,null)),g=m.exports,S=t("2f62"),v=t("bc3a"),_=t.n(v),b=t("2106"),y=t.n(b),k=(t("e6a1"),t("fe04"));window.getBase64Strings=k["getBase64Strings"],i["a"].config.productionTip=!1,i["a"].config.ignoredElements=["pinch-zoom","imageFileToBase64"],i["a"].use(S["a"]),i["a"].use(y.a,_.a);var w=new S["a"].Store({state:{currentScene:null,allScenes:[]},mutations:{setCurrentScene:function(e,n){e.currentScene=n},addLinkToCurrentScene:function(e,n){e.currentScene.links.push(n)}}});new i["a"]({store:w,render:function(e){return e(g)}}).$mount("#app")},"85ec":function(e,n,t){},b77e:function(e,n,t){},f249:function(e,n,t){"use strict";var i=t("b77e"),r=t.n(i);r.a}});
//# sourceMappingURL=app.68cb796e.js.map