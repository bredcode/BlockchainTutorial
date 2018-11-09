<template>
      <v-app id="test">
        <v-container grid-list-md text-md-center fluid fill-height>
          <v-layout column>
            <v-flex md1 d-flex>
              <v-card>
                <div id="img">
                  현재 접속한 id는 :: {{id}}
                </div>
              </v-card>
            </v-flex>
            <v-flex md11 d-flex>
              <v-card>
                <div id="router-box">
                  <router-link :to="'/WalletPage'+'/'+id">
                    <img src="../assets/image/wallet.png">
                    <div id="font20-bold">
                      Create Wallet
                    </div>
                  </router-link>
                </div>
                <div id="line-space"></div>
                <div id="router-box">
                  <router-link :to="'/MempoolPage'+'/'+id">
                    <img src="../assets/image/mempool.png" width="256px" height="256px">
                    <div id="font20-bold">
                      See Mempool
                    </div>
                  </router-link>
                </div>
              </v-card>
              <v-card>
                <div id="router-box">
                  <router-link :to="'/TransactionPage'+'/'+id">
                    <img src="../assets/image/transaction.png">
                    <div id="font20-bold">
                      Create Transaction
                    </div>
                  </router-link>
                </div>
                <div id="line-space"></div>
                <div id="router-box">
                  <router-link :to="'/HistoryPage'+'/'+id">
                    <img src="../assets/image/history.png">
                    <div id="font20-bold">
                      Transaction History
                    </div>
                  </router-link>
                </div>
              </v-card>
              <v-card>
                <div id="router-box">
                  <router-link :to="'/MiningPage'+'/'+id">
                    <img src="../assets/image/mining.png">
                    <div id="font20-bold">
                      Mining
                    </div>
                  </router-link>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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

<style scoped>
  #wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    justify-content: center;
    height: 100vh;
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
</style>
