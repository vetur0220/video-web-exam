<script setup>
import {
  reactive,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ref,
  defineExpose,
} from "vue";
import { VideoService } from "/src/api/api.ts";
const instance = getCurrentInstance();
const onFollowing = ref(true);
const videoElement = ref(null);
const videoIndex = ref(0);
const videoUrl = ref("http://localhost:3000/media/Bugatti_Chiron.m3u8");
const startX = ref(0);
const endX = ref(0);
const playerOptions = {
  autoplay: true,
  controls: true,
  playsinline: true,
  preload: "auto",
  loop: true,
};
const data = reactive({
  followingData: "",
  forYouData: "",
});
const playFollowing = (index) => {
  videoUrl.value = data.followingData[index].play_url;
  onFollowing.value = true;
  videoIndex.value = 0;
};
const playForYou = (index) => {
  videoUrl.value = data.forYouData[index].play_url;
  onFollowing.value = false;
  videoIndex.value = 0;
};
const onPlayerPlay = () => {
  console.log(onFollowing.value);
};
const onPlayerEnd = () => {
  if (onFollowing.value) {
    if (videoIndex.value <= data.followingData.length) {
      videoIndex.value = 0;
    } else {
      videoIndex.value = videoIndex.value + 1;
    }
    videoUrl.value = data.followingData[videoIndex.value].play_url;
  } else {
    if (videoIndex.value <= data.forYouData.length) {
      videoIndex.value = 0;
    } else {
      videoIndex.value = videoIndex.value + 1;
    }

    videoUrl.value = data.forYouData[videoIndex.value].play_url;
  }
};
const onTouchStart = (e) => {
  console.log("onTouchStart");
};
const onTouchMove = (e) => {
  console.log("onTouchMove");
};
const onTouchEnd = (e) => {
  console.log("onTouchEnd");
};

const getFollowing_list = async () => {
  const res = await VideoService.getFollowing_list();
  data.followingData = res.data.items;
};
const getFor_you_list = async () => {
  const res = await VideoService.getFor_you_list();
  data.forYouData = res.data.items;
};
getFollowing_list();
getFor_you_list();

onMounted(() => {});
onBeforeUnmount(() => {});
</script>

<template>
  <div
    class="video-container"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="button-container">
      <button class="FollowingButton" @click="playFollowing(0)">
        Following
      </button>
      <button class="ForYouButton" @click="playForYou(0)">ForYou</button>
    </div>

    <div class="video">
      <video-player
        :ref="'videoElement'"
        :options="playerOptions"
        :src="videoUrl"
        @play="onPlayerPlay"
        @ended="onPlayerEnd"
      ></video-player>
      <button @click="playVideo(0)">Play Video</button>
    </div>
  </div>
</template>

<style scoped>
.vjs-big-play-button {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.video-js .vjs-big-play-button {
  width: 742px;
  height: 72px;
  border-radius: 100%;
  z-index: 100;
  background-color: #ffffff;
  border: solid 1px #979797;
}
.video-container {
  position: relative; /* 設定父元素為相對定位 */
  display: inline-block; /* 設定顯示方式為區塊元素，並讓元素保留行內特性 */
}
.FollowingButton:hover,
.FollowingButton:active {
  box-shadow: 0 0 33px #ffffff;
  color: #ffffff;
}

.button-container {
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 100%;
}

.FollowingButton {
  color: #979797;
  position: absolute;
  opacity: 0.5;
  border: none;
  left: 25%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.ForYouButton {
  color: #979797;
  position: absolute;
  opacity: 0.5;
  border: none;
  left: 75%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.ForYouButton:hover,
.ForYouButton:active {
  box-shadow: 0 0 33px #ffffff;
  color: #ffffff;
}
.video {
  width: 100% !important;
  object-fit: fill;
}
</style>
