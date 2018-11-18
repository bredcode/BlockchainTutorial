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

        <v-card>
          <div id="line-space"></div>
          <v-toolbar color="light-blue lighten-2" dark>
            <v-toolbar-title>{{ mempoolList }}</v-toolbar-title>
          </v-toolbar>

          <v-list two-line subheader>
            <v-list-tile v-for="tx in orderedTxs" :key="tx['.key']" avatar  class="mt10 mb10">
              <v-list-tile-content>
                <v-list-tile-title>{{ from }} {{ tx.from }}</v-list-tile-title>
                <v-list-tile-title>{{ to }} {{ tx.to }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ amount }} {{ tx.amount }}</v-list-tile-sub-title>
                <div id="line"></div>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { db } from '../js/db.js'

export default {
  name: 'app',
  props: ['id'],
  computed: {
    orderedTxs: function () {
      return _.orderBy(this.mempool, function (o) {
        return parseInt(o.amount)
      }, 'desc')
    }
  },
  data () {
    return {
      from: 'From : ',
      to: 'To : ',
      amount: 'Amount : ',
      mempoolTitle: 'What is memory pool in blockchain?',
      mempoolDescription: ['메모리 풀(멤풀)이란 네트워크 확인을 받기 위해 대기중인 모든 트랜잭션의 모음입니다.',
        '비트코인 트랜잭션이 네트워크에 브로드 캐스팅 될 때마다 첫 번째 확인을 받기까지 평균 10 분이 소요됩니다.',
        '그러나 특정 시간에 맴풀에 보류중인 트랜잭션의 수에 따라 10 분이상 길어질 수 있습니다.'],
      mempoolList: 'Memory Pool(Mempool) List'
    }
  },
  firebase () {
    return {
      // amount 기준으로 내림차순(수수료가 가장 높은 것 부터 멤풀에서 out)
      mempool: db.ref('mempool')
    }
  }
}
</script>

<style scoped>
  #line{
    background-color:black;
    height:1px;
    width:100%;
    margin-top: 5px;
  }
  .mt10{
    margin-top: 10px;
  }
  .mb10{
    margin-bottom: 10px;
  }
  #line-space{
    margin-top: 20px;
  }
</style>
