<template>
  <v-app>
  현재 접속한 id는 {{id}}입니다.
  </v-app>
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

<style>

</style>
