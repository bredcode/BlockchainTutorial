<template>
  <div>
    <img src="https://www.performancepsu.com/wp-content/uploads/2018/01/bitcoin-mining-1024x683.jpg">
    <video controls muted autoplay loop>
      <source src="../assets/movie/mining.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
import SHA256 from '../js/function.js'
import { db } from '../js/db.js'

export default {
  name: 'app',
  props: ['id'],
  data () {
    return {
    }
  },
  firebase () {
    const id = this.$props.id
    return {
      wallets: db.ref('block').child(id)
    }
  },
}
</script>

<style scoped>
  video {
    pointer-events: none;
  }
</style>
