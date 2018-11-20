<template>
  <v-app id="test">
    <v-container grid-list-md text-md-center fluid fill-height>
      <v-layout column>
        <v-flex md1 d-flex>
          <v-card>
            <div id="title-box">
              {{ title }} {{id}}
            </div>
          </v-card>
        </v-flex>
        <v-flex md11 d-flex>
          <v-card>
            <div id="router-box">
              <router-link :to="'/WalletPage'+'/'+id">
                <img src="../assets/image/wallet.png">
                <div id="font20-bold">
                  {{ wallet }}
                </div>
              </router-link>
            </div>
            <div id="line-space"></div>
            <div id="router-box">
              <router-link :to="'/MempoolPage'+'/'+id">
                <img src="../assets/image/mempool.png" width="256px" height="256px">
                <div id="font20-bold">
                  {{ mempool }}
                </div>
              </router-link>
            </div>
          </v-card>
          <v-card>
            <div id="router-box">
              <router-link :to="'/TransactionPage'+'/'+id">
                <img src="../assets/image/transaction.png">
                <div id="font20-bold">
                  {{ transaction }}
                </div>
              </router-link>
            </div>
            <div id="line-space"></div>
            <div id="router-box">
              <router-link :to="'/HistoryPage'+'/'+id">
                <img src="../assets/image/history.png">
                <div id="font20-bold">
                  {{ history }}
                </div>
              </router-link>
            </div>
          </v-card>
          <v-card>
            <div id="router-box">
              <router-link :to="'/MiningPage'+'/'+id">
                <img src="../assets/image/mining.png">
                <div id="font20-bold">
                  {{ mining }}
                </div>
              </router-link>
              <div id="line-space"></div>
              <div id="router-box">
                <div id="db-box" @click="resetDB()">
                  <img src="../assets/image/db-reset.png" width="256px" height="256px">
                  <div id="font20-bold">
                    {{ dbReset }}
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- db 초기화버튼 누르면 나타나는 문구 -->
    <v-dialog v-model="dbDialog" max-width="290">
      <div id="bg-white">
        <v-card>
          <v-card-title class="headline"> {{ dbTitle }} </v-card-title>
          <v-card-text> {{ dbContent }} </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" flat @click="clickAgree()">{{ agree }} </v-btn>
            <v-btn color="red darken-1" flat @click="dbDialog = false">{{ disAgree }}</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from '../js/db.js'

export default {
  name: 'app',
  props: ['id'],

  data () {
    return {
      title: 'Your current ID is : ',
      wallet: 'Create Wallet',
      transaction: 'Create Transaction',
      mining: 'Mining',
      mempool: 'See Memory Pool',
      history: 'Transaction History',
      dbReset: 'Reset Blockchain',
      dbDialog: false,
      dbTitle: 'Reset Blockchain',
      dbContent: 'Are you sure you want to clear all Blockchain contents?',
      agree: 'Yes',
      disAgree: 'No'
    }
  },
  firebase () {
    return {
    }
  },
  methods: {
    resetDB () {
      this.dbDialog = true
    },
    clickAgree () {
      db.ref('mempool').remove()
      db.ref('wallets').remove()
      db.ref('blockChain').remove()
      db.ref('transactionHistory').remove()
      db.ref('miningData').remove()
      var info = {
        target: 3,
        blockNumber: 0
      }
      db.ref('miningData').push(info)
      this.dbDialog = false
    }
  }
}
</script>

<style scoped>
  #wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    justify-content: center;
    height: 100vh;
  }
  #title-box{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20%;
  }
  #router-box{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #line-space{
    margin-top: 20%;
  }
  .v-card {
    display: block;
    min-width: 0;
    position: relative;
    text-decoration: none;
    transition: .3s cubic-bezier(.25,.8,.5,1);
    background-color: transparent !important;
    box-shadow: 0 0 0 0 !important;
  }
  .application--wrap {
    flex: 1 1 auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
    background-color: white !important;
  }
  #font20-bold{
    margin-top:10px;
    font-size: 20px;
    font-weight: bold;
  }
  a{
    color: black;
    text-decoration: none;
  }
  a:hover{
    color:tomato;
  }
  #db-box{
    cursor: pointer;
  }
  #db-box:hover{
    color: tomato;
  }
  #bg-white{
    background-color: white !important;
  }
</style>
