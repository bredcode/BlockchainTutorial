<template>
  <v-app id="inspire">
    <div id="line-space"></div>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
              src="http://cfile26.uf.tistory.com/image/99F6FA475BEEF1442C5439"
              aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ miningTitle }}</h3>
              <div v-for="i in miningDescription">{{ i }}</div>
            </div>
          </v-card-title>
        </v-card>
        <div id="line-space"></div>
      </v-flex>

      <v-btn color="success" v-if="!miningNow" @click="goMining()">Go Mining</v-btn>
      <v-btn color="error" v-if="miningNow" @click="stopMining()">Stop Mining</v-btn>

      <v-btn color="success" v-if="!txListOn" @click="openTx()">Open Mempool</v-btn>
      <v-btn color="error" v-if="txListOn" @click="closeTx()">Close Mempool</v-btn>
      <v-list two-line subheader v-if="txListOn">
        <v-list-tile v-for="tx in orderedTxs" :key="tx['.key']" avatar  class="mt10 mb10">
          <v-list-tile-content>
            <v-list-tile-title id="tx-center">{{ from }} {{ tx.from }}</v-list-tile-title>
            <v-list-tile-title id="tx-center">{{ to }} {{ tx.to }}</v-list-tile-title>
            <v-list-tile-sub-title id="tx-center">{{ amount }} {{ tx.amount }}</v-list-tile-sub-title>
            <div id="line"></div>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-app>
  <!--
  <div>
    <img src="https://www.performancepsu.com/wp-content/uploads/2018/01/bitcoin-mining-1024x683.jpg">
    <video controls muted autoplay loop>
      <source src="../assets/movie/mining.mp4" type="video/mp4">
    </video>
  </div>
  -->
</template>

<script>
import SHA256 from '../js/function.js'
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
      miningTitle: 'What is mining in blockchain?',
      miningDescription: ['분산 원장을 유지하기 위해서는 컴퓨터 자원이 필요한데 채굴을 통해 이것을 유지 할 수 있고 댓가로 코인을 얻을 수 있습니다.',
        '즉, 채굴은 수학문제를 푸는 것을 의미하며, 문제를 푼 댓가로 코인을 채굴자에게 지급합니다.',
        '수학 문제가 얼마나 빨리 풀리는지에 따라서 비트코인 네트워크에서는 수학 문제의 난이도를 조절합니다.',
        '비트코인 거래에 대한 검증이 필요하기 때문에 더 많은 채굴자가 있을수록 더 안전한 네트워크를 유지할 수 있습니다.'],
      miningNow: false,
      from: 'From : ',
      to: 'To : ',
      amount: 'Amount : ',
      txListOn: false,
      miningInterval: '',
      randVal: 0,
      block: {
        prevHash: '',
        curHash: '',
        blockNumber: '',
        txList: [{from: '', to: '', amount: ''}]
      }
    }
  },
  firebase () {
    // 추후 보상의 개념에서 사용 예정
    const id = this.$props.id
    return {
      blockChain: db.ref('blockChain'),
      mempool: db.ref('mempool'),
      wallets: db.ref('wallets')
    }
  },
  methods: {
    goMining () {
      this.miningNow = true
      this.randVal = 5
      this.miningInterval = setInterval(() => {
        this.randVal = Math.floor(Math.random() * 5) + 5
        this.mining()
        // console.log ("rand: ", this.randVal)
        // TODO : Setinterval에서 시간 랜덤하게 되도록 하기(현재 5초)
      }, this.randVal * 1000)
    },
    stopMining () {
      this.miningNow = false
      clearInterval(this.miningInterval)
    },
    mining () {
      var now = new Date()
      var hash = now.toString() + Math.random()

      this.block = this.resetBlock()
      var len = Math.min(this.orderedTxs.length, 5)
      // 여기서 orderedTxs[i]가 아닌 orderedTxs[0]인 이유는
      // 우선순위 큐이기 때문(가장 amount가 큰 값만 뽑으니)
      for (var i = 0; i < len; i++) {
        var txFrom = this.orderedTxs[0].from
        var txTo = this.orderedTxs[0].to
        var txAmount = this.orderedTxs[0].amount

        var fromWalletKey = '', toWalletKey = ''
        var fromWalletData = '', toWalletData = ''
        var fromId = '', toId = ''

        var isFromValid = false, isToValid = false

        var walletKey = '', curCoin = ''

        // 더블스펜딩 방지
        for (var j = 0; j < this.wallets.length; j++) {
          for (walletKey in this.wallets[j]) {
            // 현재 트랜잭션 보내는 사람의 지갑주소이고 해당 금액을 보낼 금액이 있다면
            if (this.wallets[j][walletKey].hash === txFrom && this.wallets[j][walletKey].coin >= txAmount) {
              isFromValid = true
              fromWalletKey = walletKey

              fromId = this.wallets[j]['.key']
              fromWalletData = this.wallets[j][walletKey]

              // from 지갑 주소에 금액 업데이트
              curCoin = (parseInt(fromWalletData.coin) - parseInt(txAmount))
              fromWalletData.coin = curCoin
              break
            }
          }

          for (walletKey in this.wallets[j]) {
            // 현재 트랜잭션 받는 사람의 지갑주소이라면
            if (this.wallets[j][walletKey].hash === txTo) {
              isToValid = true
              toWalletKey = walletKey

              toId = this.wallets[j]['.key']
              toWalletData = this.wallets[j][walletKey]

              // to 지갑 주소에 금액 업데이트
              curCoin = (parseInt(toWalletData.coin) + parseInt(txAmount))
              toWalletData.coin = curCoin
              break
            }
          }
        }

        // 보내는이 받는이가 둘다 유효할 때
        if (isFromValid && isToValid) {
          console.log('key :: ', this.orderedTxs[0]['.key'])
          console.log('fromID :: ', fromId, ' toId :: ', toId)
          console.log('isFromValid : ', isFromValid, ' isToValid : ', isToValid)
          console.log('fromWalletData : ', fromWalletData, ' toWalletData :: ', toWalletData)
          db.ref('mempool').child(this.orderedTxs[0]['.key']).remove()
          db.ref('wallets').child(fromId).child(fromWalletKey).update(fromWalletData)
          db.ref('wallets').child(toId).child(toWalletKey).update(toWalletData)
        } else {
          // 둘다 존재하지 않는다면 트랜잭션 삭제
          console.log('Trash Transaction')
          db.ref('mempool').child(this.orderedTxs[0]['.key']).remove()
        }
        hash += (txFrom + txTo)
      }

      this.block.blockNumber = this.blockChain.length + 1
      // this.block.prevHash = this.blockChain[this.block.blockNumber - 1].curHash
      this.block.prevHash = 'hello world'
      this.block.curHash = SHA256(hash)

      console.log('===hash :: ', SHA256(hash))
      console.log(this.block)
    },
    openTx () {
      this.txListOn = true
    },
    closeTx () {
      this.txListOn = false
    },
    resetBlock () {
      return {
        prevHash: '',
        curHash: '',
        blockNumber: '',
        txList: [] // {from: '', to: '', amount: ''}
      }
    }
  }
}
</script>

<style>
  .v-btn {
    text-transform: none !important;
  }
  video {
    pointer-events: none;
  }
  #line-space{
    margin-top: 20px
  }
  .ml10{
    margin-left:20px
  }
  #btn-wrapper{
    width:500px;
  }
  #tx-center{
    text-align: center;
  }
  #line{
    background-color:black;
    height:1px;
    width: 35%;
    margin: auto;
  }
</style>
