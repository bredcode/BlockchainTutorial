<template>
  <v-app id="inspire">
    <input v-model="copyText" id="clip-copy-hidden" style="height:0px">
    <div id="line-space"></div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
              src="https://cryptosaver.io/wp-content/uploads/2018/04/cryptosaver-bitcoin-wallet.jpg"
              aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ walletTitle }}</h3>
              <div v-for="i in walletDescription">{{ i }}</div>
            </div>
          </v-card-title>
        </v-card>

        <div id="line-space"></div>

        <v-card>
          <div id="line-space"></div>
          <v-toolbar color="light-blue lighten-2" dark>
            <v-toolbar-title>{{id}}{{ swallets }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div @click="addWallet()" style="cursor: pointer;">
              {{ addYourWallet }}
            </div>
            <v-btn icon>
              <v-icon @click="addWallet()">add</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list two-line subheader>
            <v-list-tile v-for="wallet in wallets" :key="wallet['.key']" avatar>
              <v-list-tile-avatar>
                <v-icon :class="[wallet.iconClass]">{{ wallet.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ wallet.hash }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ wallet.timeStamp }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-btn icon>
                <v-icon color="grey lighten-1" @mouseover="mouseoverEvent(wallet.hash)" @click="copyWallet(wallet.hash)">file_copy</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="grey lighten-1" @click="deleteWallet(wallet)">delete</v-icon>
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import SHA256 from '../js/function.js'
import { db } from '../js/db.js'

export default {
  name: 'app',
  props: ['id'],
  data () {
    return {
      walletTitle: 'What is wallet in blockchain?',
      addYourWallet: 'Add your wallet ▶',
      swallets: "'s Wallets",
      walletDescription: ['비트코인 지갑은 일반 은행 계좌에 비유될 수 있습니다.',
        '주소를 만드는데 필요한 암호화 키 목록이 들어간 파일로 각각의 파일에는 비트코인 잔고와 암호화폐 거래 내역서가 들어 있습니다.',
        '비트코인 지갑은 특별 보호 파일(wallet.dat)로 이 파일의 암호는 이용자만 알 수 있습니다.',
        '키는 메모리 카드에 저장할 수 있으며 심지어 그냥 종이에 메모해도 좋습니다.',
        '이외에도 비트코인 저장을 위한 온라인 지갑을 제안하는 다양한 서비스가 운영되고 있습니다.'],
      copyText: ''
    }
  },
  firebase() {
    const id = this.$props.id
    return{
      wallets: db.ref('wallets').child(id)
    }
  },
  methods: {
    addWallet () {
      var now = new Date()
      var nowUtc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000)).toString()
      var tmp = now.toString() + this.id + Math.random()
      tmp = SHA256(tmp)
      var walletAddress = ''
      // 주소길이 34로 축소
      for (var i = 0; i < 34; i++) {
        walletAddress += tmp[i]
      }

      var ret = { icon: 'keyboard_arrow_right', iconClass: 'orange  lighten-2 white--text', hash: walletAddress, timeStamp: nowUtc}
      db.ref('wallets').child(this.id).push(ret)
    },
    mouseoverEvent (value) {
      this.copyText = value
    },
    copyWallet (value) {
      var copyText = document.getElementById('clip-copy-hidden')
      copyText.select()
      document.execCommand('copy')
    },
    deleteWallet (wallet) {
      db.ref('wallets').child(this.id).child(wallet['.key']).remove()
    }
  }
}
</script>

<style scoped>
  #line-space{
    margin-top: 20px
  }
</style>
