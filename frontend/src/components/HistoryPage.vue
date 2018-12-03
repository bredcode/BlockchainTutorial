<template>
  <v-app id="inspire">
    <div id="line-space"></div>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
              src="http://cfile1.uf.tistory.com/image/99DBD8395BF113F51036EE"
              aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ txHistoryTitle }}</h3>
              <div v-for="i in txHistoryDescription" :key="i">{{ i }}</div>
            </div>
          </v-card-title>
        </v-card>
        <div id="line-space"></div>
      </v-flex>

      <v-btn color="success" v-if="!txHistoryOn" @click="openHistory()">Open Transaction History</v-btn>
      <v-btn color="error" v-if="txHistoryOn" @click="closeHistory()">Close Transaction History</v-btn>
      <v-list two-line subheader v-if="txHistoryOn">
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-toolbar color="light-blue lighten-2" dark>
              <v-toolbar-title>{{ txHistoryToolbar }}</v-toolbar-title>
            </v-toolbar>
            <div id="line-space"></div>
            <v-list two-line subheader>
              <v-list-tile v-for="tx in txHistory" :key="tx" avatar>
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
      </v-list>

      <v-btn color="success" v-if="!blockChainOn" @click="openBlockchain()">Open Blockchain</v-btn>
      <v-btn color="error" v-if="blockChainOn" @click="closeBlockchain()">Clode Blockchain</v-btn>
      <div id="block-wrapper" v-if="blockChainOn">
        <div id="block-float-left" v-for="(block, idx) in blockChain" :key="block['.key']">
          <div id="blockChain-center" v-if="idx === 0">
            <img id="block" src="http://cfile30.uf.tistory.com/image/99B3D4355BF0EECC0C0813" @click="showBlockInfo(block)">
          </div>
          <div id="blockChain-center" v-else>
            <img src="http://cfile10.uf.tistory.com/image/99F677465BF100B12B42E3">
            <img id="block" src="http://cfile30.uf.tistory.com/image/99B3D4355BF0EECC0C0813" @click="showBlockInfo(block)">
          </div>
        </div>
      </div>

      <!-- 클릭 시 나타나는 msg -->
      <div v-if="clickBlock" class="text-xs-center">
        <v-dialog v-model="clickBlock" width="750">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              {{ blockChainTitle }}
            </v-card-title>

            <v-card-text>
              <div v-for="(info,key) in blockChainContent" :key="info" id="line-space">
                <div id="key-wrapper"> {{ key }}</div>
                <div v-if="key === 'txList'" >
                  <div v-for="tx in info" :key="tx" id="mb10">
                    from : {{ tx.from }} <br> to : {{ tx.to }} <br>  amount : {{ tx.amount }}
                  </div>
                </div>
                <div v-else id="word-break">
                  {{ info }}
                </div>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="clickBlock = false"
              >
                {{ ok }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
  </v-app>
</template>

<script>
import { db } from '../js/db.js'

export default {
  name: 'app',
  props: ['id'],
  data () {
    return {
      txHistoryTitle: 'What is transaction history in blockchain?',
      txHistoryDescription: ['지금까지 블록체인에 기록된 모든 거래 내역을 보여줍니다.',
        '모든 거래 내역을 공개하고 모든 사용자가 거래 내역을 가지고 있으면 거래 내역을 조작할 수 없습니다.',
        '블록체인에서는 거래 정보를 감추지 않고 모두에게 공개하고, 누구나 거래 정보를 생성할 수 있으며, 거래 정보를 모두에게 복사해서 사본을 저장하고 그 사본끼리 동기화시킵니다.',
        '즉, 2중화, 3중화 정도가 아니라 수천중화, 수만중화 처리를 해서 기록이 사라지는 일을 원천적으로 막아버립니다.',
        '그래서 블록체인을 거대한 분산 공개 장부라고 부르기도 합니다.', '　', '아래에서는 모든 거래 내역 및 거래 내역이 담긴 블록체인을 보여줍니다.'],
      txHistoryToolbar: 'Transaction History',
      from: 'From : ',
      to: 'To : ',
      amount: 'Amount : ',
      blockChainOn: false,
      txHistoryOn: false,
      clickBlock: false,
      blockChainTitle: 'Block details',
      blockChainContent: '',
      ok: 'OK'
    }
  },
  firebase () {
    return {
      txHistory: db.ref('transactionHistory'),
      blockChain: db.ref('blockChain')
    }
  },
  methods: {
    openBlockchain () {
      this.blockChainOn = true
    },
    closeBlockchain () {
      this.blockChainOn = false
    },
    openHistory () {
      this.txHistoryOn = true
    },
    closeHistory () {
      this.txHistoryOn = false
    },
    showBlockInfo (curBlock) {
      this.clickBlock = true
      this.blockChainContent = {
        blockNumber: curBlock.blockNumber,
        prevHash: curBlock.prevHash,
        curHash: curBlock.curHash,
        timeStamp: curBlock.timeStamp,
        txList: curBlock.txList
      }
    }
  }
}
</script>

<style scoped>
  #line-space{
    margin-top: 20px
  }
  .ml10{
    margin-left: 20px
  }
  #line{
    background-color:black;
    height:1px;
    width:100%;
    margin-top: 5px;
  }
  #block-wrapper{
    flex: row;
    margin: 20px 0 20px 20px;
  }
  #block{
    width: min-content;
    cursor: pointer;
  }
  #block-float-left{
    float: left;
  }
  #blockChain-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
  }
  #word-break{
    word-break: break-all;
  }
  #mb10{
    margin-bottom: 10px
  }
</style>
