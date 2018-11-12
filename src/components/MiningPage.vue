<template>
  <div>
    <img src="https://www.performancepsu.com/wp-content/uploads/2018/01/bitcoin-mining-1024x683.jpg">
    <video controls muted autoplay loop>
      <source src="../assets/movie/mining.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['id'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  video {
    pointer-events: none;
  }
</style>
