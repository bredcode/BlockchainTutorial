<template>
  <v-app>
    <div id="upper-wrapper">
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
            <div id="line-space"></div>
            <div id="line-space"></div>
            <div id="router-box">
              <div id="db-box" @click="resetDB()">
                <img src="../assets/image/db-reset.png" width="256px" height="256px">
                <div id="font20-bold">
                  {{ dbReset }}
                </div>
              </div>
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
            </div>
            <div id="line-space"></div>
            <div id="router-box">
              <router-link :to="'/EncryptionPage'+'/'+id">
                <img src="../assets/image/encryption.png">
                <div id="font20-bold">
                  {{ encryption }}
                </div>
              </router-link>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div id="delimeter-wrapper">
      <img id="delimeter-animation" src="https://cdn.ripple.com/wp-content/themes/ripple-beta/assets/img/home/ripplenet-section.gif">
      <div id="delimeter-box">
        <div id="delimeter-title"> {{ delTitle }} </div>
        <div id="delimeter-description"> {{ delDescription }} </div>
      </div>
      <div class="downArrow bounce">
        <div class="arrow"></div>
      </div>
    </div>
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
      disAgree: 'No',
      delTitle: 'Want to know more ?',
      delDescription: 'You can test using the bitcoin test network at the bottom',
      encryption: 'Encryption'
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
      db.ref('sign').remove()
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
  #upper-wrapper{
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
  }
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
    margin-top: 2%;
    margin-bottom: 5%;
    text-align: center;
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
  #delimeter-wrapper{
    width: 100%;
    height: 450px;
    background-color: #E6EAEE;
    float: left;
  }
  #delimeter-animation{
    float: left;
    width: 400px;
    height: auto;
  }
  #delimeter-title{
    font-size: 30px;
    font-weight: bold;
    color: #066B98;
    width: auto;
    padding-top: 8%;
    text-align: center;
    float: left;
  }
  #delimeter-description{
    font-size: 20px;
    font-weight: bold;
    color: #344E5A;
    width: auto;
    padding-top: 3%;
    text-align: center;
    float: left;
  }
  #delimeter-box{
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding-left: 10%;
  }
  .arrow {
    height: 15px; width: 15px;
    border: 1px solid tomato;
    border-width: 2px 2px 0 0;
    transform: rotate(135deg);
  }
  .arrow:before {
    border-color:
      darkorange
      transparent
      transparent
      darkorange;
    display: block;
    top: -1px; right: 0px;
    transform-origin: top right;
    transform: rotate(45deg); 
  }
  .arrow:after {
    border-color:
      transparent
      darkorange
      darkorange
      transparent;
    top: 0px; right: -1px;
    transform-origin: top right;
    transform: rotate(-45deg);
  }
  .downArrow{
    position: absolute;
    top: 97%;
    left: 50%;
  }
  .bounce {
    -moz-animation: bounce 3s infinite;
    -webkit-animation: bounce 3s infinite;
    animation: bounce 3s infinite;
  }
  @-moz-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      -moz-transform: translateY(0);
      transform: translateY(0);
    }
    40% {
      -moz-transform: translateY(-30px);
      transform: translateY(-30px);
    }
    60% {
      -moz-transform: translateY(-15px);
      transform: translateY(-15px);
    }
  }
  @-webkit-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-30px);
      transform: translateY(-30px);
    }
    60% {
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
    }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    40% {
      -moz-transform: translateY(-30px);
      -ms-transform: translateY(-30px);
      -webkit-transform: translateY(-30px);
      transform: translateY(-30px);
    }
    60% {
      -moz-transform: translateY(-15px);
      -ms-transform: translateY(-15px);
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
    }
  }
</style>
