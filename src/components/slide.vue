<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="image in images" :key="image.id">
        <img :src="image.src" alt="image">
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';

export default {
  data() {
    return {
      images: [
       { id: 1, src: 'http://localhost:3000/images/Audi_A4_S4.png' },
        { id: 2, src: 'http://localhost:3000/images/Bugatti_Chiron.png' },
        { id: 3, src: 'http://localhost:3000/images/Range_Rover_Sport_L322.png' },
      ],
    };
  },
  mounted() {
    // 初始化 Swiper 实例
    this.swiper = new Swiper(this.$refs.swiper, {
      direction: 'horizontal', // 初始滑动方向为水平方向
      loop: true, // 开启循环滚动
      slidesPerView: 1, // 设置一次滑动显示多少张图片
    
      // 其他配置选项...
    });

    // 监听窗口大小变化，根据窗口大小动态设置 Swiper 容器的宽度和高度
    window.addEventListener('resize', this.setSwiperContainerSize);
    this.setSwiperContainerSize();
  },
  beforeUnmount() {
    // 组件销毁时移除窗口大小变化监听事件
    window.removeEventListener('resize', this.setSwiperContainerSize);
  },
  methods: {
    setSwiperContainerSize() {
      console.log('sdfdsf');
      // 获取 Swiper 容器的宽度和高度
      const containerWidth = this.$refs.swiper.clientWidth;
      const containerHeight = this.$refs.swiper.clientHeight;
  console.log('sdfdsf');
      // 根据滑动方向设置 Swiper 容器的宽度和高度
      if (this.swiper.direction === 'horizontal') {
        // 如果滑动方向为水平方向，容器的宽度为图片的总宽度，高度为容器的高度
        this.$refs.swiper.style.width = `${containerWidth * this.images.length}px`;
        this.$refs.swiper.style.height = `${containerHeight}px`;
      } else {
        // 如果滑动方向为垂直方向，容器的宽度为容器的宽度，高度为图片的总高度
        this.$refs.swiper.style.width = `${containerWidth}px`;
        this.$refs.swiper.style.height = `${containerHeight * this.images.length}px`;
      }

      // 更新 Swiper 实例的布局
      this.swiper.update();
    },
  },
};
</script>

<style>
.swiper-container {
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  flex-shrink: 0;
}
</style>
