<script setup>
import { ref, reactive, onMounted } from "vue";
import { VideoService } from "/src/api/api.ts";
import axios from "axios";


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
</script>

<template>
  <h1>test</h1>
  {{data.followingData}}
  {{data.forYouData}}
</template>

<style scoped>
</style>
