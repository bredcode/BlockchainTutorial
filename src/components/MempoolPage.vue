<template>
  <v-app id="inspire">
    <div id="line-space"></div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEwM1ZeQrBEvkuUAAQbTarBHDXAey_04FBr-Xb88P7YNKXO2NU"
              aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ mempoolTitle }}</h3>
              <div v-for="i in mempoolDescription">{{ i }}</div>
            </div>
          </v-card-title>
        </v-card>

        <div id="line-space"></div>

        <v-card>
          <div id="line-space"></div>
          <v-toolbar color="light-blue lighten-2" dark>
            <v-toolbar-title>{{ mempoolList }}</v-toolbar-title>
          </v-toolbar>

          <v-list two-line subheader>
            <v-list-tile v-for="(tx,idx) in txList" :key="tx.hash" avatar>
              <v-list-tile-avatar>
                <v-icon :class="[tx.iconClass]">{{ tx.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ tx.hash }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ tx.timeStamp }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  props: ['id'],
  data () {
    return {
      mempoolTitle: 'What is memory pool in blockchain?',
      mempoolDescription: ['메모리 풀(멤풀)이란 네트워크 확인을 받기 위해 대기중인 모든 트랜잭션의 모음입니다.',
        '비트코인 트랜잭션이 네트워크에 브로드 캐스팅 될 때마다 첫 번째 확인을 받기까지 평균 10 분이 소요됩니다.',
        '그러나 특정 시간에 맴풀에 보류중인 트랜잭션의 수에 따라 10 분이상 길어질 수 있습니다.'],
      mempoolList: 'Memory Pool(Mempool) List',
      txList: [
        {icon: 'keyboard_arrow_right', iconClass: 'orange  lighten-2 white--text', hash: '1231231123', timeStamp: 2012106002},
        {icon: 'keyboard_arrow_right', iconClass: 'orange  lighten-2 white--text', hash: '1231231223', timeStamp: 2012106002},
        {icon: 'keyboard_arrow_right', iconClass: 'orange  lighten-2 white--text', hash: '1231231323', timeStamp: 2012106002}
      ]
    }
  }
}
</script>

<style scoped>
  #line-space{
    margin-top: 20px
  }
</style>
