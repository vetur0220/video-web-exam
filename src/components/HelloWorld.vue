<script setup>
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import { VideoService } from "/src/api/api.ts";
import axios from "axios";


const playerOptions = {
  controls: true,
  autoplay: false,
  sources: [
    {
      type: 'application/x-mpegURL',
      src: 'http://localhost:3000/media/Audi_A4_S4.m3u8'
    },
    {
      type: 'application/x-mpegURL',
      src: 'http://localhost:3000/media/Bugatti_Chiron.m3u8'
    },
    {
      type: 'application/x-mpegURL',
      src: 'http://localhost:3000/media/Range_Rover_Sport_L322.m3u8'
    }
  ]
};
const instance = getCurrentInstance();

const data = reactive({
  followingData: "",
  forYouData: "",
});

const getFollowing_list = async () => {
  const res = await VideoService.getFollowing_list();
  data.followingData = res.data;
};
const getFor_you_list = async () => {
  const res = await VideoService.getFor_you_list();
  data.forYouData = res.data;
};
getFollowing_list();
getFor_you_list();

onMounted(() => {
  
});
onBeforeUnmount(() => {});



</script>

<template>
 
  <!-- {{data.forYouData}} -->
  <div id="shorts-container" class="shorts">
    <video-player :options="playerOptions" />
  </div>
   {{ data.followingData }}
</template>

<style scoped>
</style>
