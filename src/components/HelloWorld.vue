
<script setup>
import { computed, reactive, defineComponent, ref, onMounted } from "vue";
import { VideoService } from "/src/api/api.ts";
import Swiper from "swiper";
import "swiper/css";
const onFollowing = ref(true);
const videoElement = ref(null);
const videoIndex = ref(0);
const videoUrl = ref("");
const startY = ref(0);
const endY = ref(0);
const timer = ref(null);
const swiperRef = ref(null);
const playerOptions = {
  preload: true,
  autoplay: true,
  controls: true,
  playsinline: true,
};
const data = reactive({
  followingData: "",
  forYouData: "",
});
const playFollowing = (index) => {
  videoUrl.value = data.followingData[index].play_url;
  onFollowing.value = true;
  videoIndex.value = 0;
  initSwiper();
};
const playForYou = (index) => {
  videoUrl.value = data.forYouData[index].play_url;
  onFollowing.value = false;
  videoIndex.value = 0;
  initSwiper();
};

const onPlayerPlay = (e) => {
  console.log(videoElement.value[e]);
};
const onPlayerReady = () => {
  initSwiper();
};
//尚未使用Swiper的切換影片方法
// const onPlayerEndTouch = () => {
//   if (onFollowing.value) {
//     if (videoIndex.value < data.followingData.length) {
//       videoIndex.value = 0;
//     } else {
//       videoIndex.value = videoIndex.value + 1;
//     }
//     videoUrl.value = data.followingData[videoIndex.value].play_url;
//   } else {
//     if (videoIndex.value < data.forYouData.length) {
//       videoIndex.value = 0;
//     } else {
//       videoIndex.value = videoIndex.value + 1;
//     }
//     videoUrl.value = data.forYouData[videoIndex.value].play_url;
//   }
// };
// const onTouchChange = (event) => {
//   const deltaY = event.touches[0].clientY - startY.value;
//   if (deltaY > 0) {
//     //向下 上一個影片
//     if (onFollowing.value) {
//       if (videoIndex.value == 0) {
//         videoIndex.value = data.followingData.length - 1;
//       } else {
//         videoIndex.value = videoIndex.value - 1;
//       }
//       videoUrl.value = data.followingData[videoIndex.value].play_url;
//     } else {
//       if (videoIndex.value < data.forYouData.length) {
//         videoIndex.value = 0;
//       } else {
//         videoIndex.value = videoIndex.value + 1;
//       }
//       videoUrl.value = data.forYouData[videoIndex.value].play_url;
//     }
//   } else if (deltaY < 0) {
//     //向上 下一個影片
//     if (onFollowing.value) {
//       if (videoIndex.value == data.followingData.length) {
//         videoIndex.value = 0;
//       } else {
//         videoIndex.value = videoIndex.value + 1;
//       }
//       videoUrl.value = data.followingData[videoIndex.value].play_url;
//     } else {
//       if (videoIndex.value == data.forYouData.length) {
//         videoIndex.value = 0;
//       } else {
//         videoIndex.value = videoIndex.value + 1;
//       }
//       videoUrl.value = data.forYouData[videoIndex.value].play_url;
//     }
//   }
// };
// const onTouchStart = (e) => {
//   startY.value = e.touches[0].clientY;
// };
// const onTouchMove = (event) => {
//   if (timer.value) {
//     clearTimeout(timer.value);
//   }
//   timer.value = setTimeout(() => {
//     onTouchChange(event);
//   }, 100);
// };
// const onTouchEnd = (e) => {
//   startY.value = 0;
//   endY.value = 0;
// };

const getFollowing_list = async () => {
  const res = await VideoService.getFollowing_list();
  data.followingData = res.data.items;
  videoUrl.value = data.followingData[0].play_url;
};
const getFor_you_list = async () => {
  const res = await VideoService.getFor_you_list();
  data.forYouData = res.data.items;
};
const initSwiper = () => {
  const mySwiper = new Swiper(".swiper-container", {
    touchEventsTarget: "container",
    direction: "vertical",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
  });
};
getFollowing_list();
getFor_you_list();

</script>

<template>
  <div class="container">
    <div class="button-container">
      <button
        :class="{ active: onFollowing }"
        class="FollowingButton"
        @click="playFollowing(0)"
      >
        Following
      </button>
      <button
        :class="{ active: !onFollowing }"
        class="ForYouButton"
        @click="playForYou(0)"
      >
        ForYou
      </button>
    </div>
    <div class="swiper-container" v-if="onFollowing">
      <div class="swiper-wrapper">
        <div
          v-for="(item, itemIndex) in data.followingData"
          class="swiper-slide"
          :key="itemIndex"
          ref="videoElement"
        >
          <video-player
            class="video-player vjs-custom-skin"
            :options="playerOptions"
            :src="item.play_url"
            @play="onPlayerPlay(itemIndex)"
            @ready="onPlayerReady"
          ></video-player>
        </div>
     
      </div>
    </div>
     <div class="swiper-container" v-if="!onFollowing">
      <div class="swiper-wrapper">
        <div
          v-if="!onFollowing"
          v-for="(item, itemIndex) in data.forYouData"
          class="swiper-slide"
          :key="itemIndex"
          ref="videoElementForYouData"
        >
          <video-player
            class="video-player vjs-custom-skin"
            :options="playerOptions"
            :src="item.play_url"
            @play="onPlayerPlay(itemIndex)"
            @ready="onPlayerReady"
          ></video-player>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 414px;
  height: 896px;
}
.video-js {
  width: 414px !important;
  height: 896px !important;
}

.vjs-tech {
  width: 100%;
  height: 100%;
}

.video-container {
  position: relative;
  display: inline-block;
}

.button-container {
  position: absolute;
  top: 5%;
  left: 0;
  width: 100%;
  z-index: 10;
}
.FollowingButton {
  color: #979797;
  position: absolute;
  background: 0%;
  opacity: 0.8;
  border: none;
  left: 25%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.ForYouButton {
  color: #979797;
  position: absolute;
  background: 0%;
  opacity: 0.8;
  border: none;
  left: 75%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

button.active {
  box-shadow: 0 0 33px #ffffff;
  color: #ffffff;
}
.video {
  width: 414px;
  height: 896px;
  object-fit: fill;
}
.swiper {
  width: 414px !important;
  height: 896px !important;
}
.swiper-container {
  height: 896px;
}
</style>
