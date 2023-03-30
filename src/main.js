import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player'
createApp(App).use(VideoPlayer).mount('#app')
