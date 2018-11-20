<template>
  <v-app id="inspire">
    <input v-model="copyText" id="clip-copy-hidden" style="height:0px">
    <div id="line-space"></div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
              src="https://cdn-images-1.medium.com/max/1600/1*E4EfWMSjSZpgHypO_atxdw.png"
              aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ transactionTitle }}</h3>
              <div v-for="i in transactionDescription" :key="i">{{ i }}</div>
            </div>
          </v-card-title>
        </v-card>

        <div id="line-space"></div>

        <v-list two-line subheader>
          <v-list-tile v-for="wallet in yourWallets" :key="wallet['.key']" avatar>
            <v-list-tile-avatar>
              <v-icon :class="[effect.iconClass]">{{ effect.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ wallet.hash }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ wallet.timeStamp }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-icon color="grey lighten-1">attach_money</v-icon> {{ wallet.coin }} <div class="ml10"></div>
            <v-btn icon>
              <v-icon color="grey lighten-1" @mouseover="mouseoverEvent(wallet.hash)" @click="copyWallet(wallet.hash)">file_copy</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="grey lighten-1" @click="deleteWallet(wallet)">delete</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>

        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="yourAddress"
            :rules="yourAddressRules"
            :counter="34"
            label="Your Wallet Address"
            required
          ></v-text-field>
          <v-text-field
            v-model="othersAddress"
            :rules="othersAddressRules"
            :counter="34"
            label="Others Wallet Address"
            required
          ></v-text-field>
          <v-text-field
            v-model="amount"
            :rules="amountRules"
            label="Amount"
            required
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree send this amount?"
            required
          ></v-checkbox>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>

    <!-- 성공 시 나타나는 msg -->
    <div v-if="success" class="text-xs-center">
      <v-dialog v-model="success" width="400">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            {{ successTransaction }}
          </v-card-title>

          <v-card-text>
            {{ successDescription }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="success = false"
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
      transactionTitle: 'What is transaction in blockchain?',
      transactionDescription: ['비트코인 트랜잭션은 지정된 금액의 비트코인에 대한 소유권을 한 개인으로부터 다른 개인으로 이전하기 위한 목적으로 서명된 정보입니다.',
        '트랜잭션은 송금자의 미사용 비트코인, 송금 정보(트랜잭션 ID 또는 트랜잭션 해시로 표시), 송금액, 수령자의 공개 주소 등 모든 정보를 기록합니다.',
        '트랜잭션은 유효성 검증을 위해 비트코인 네트워크로 브로드캐스팅되고, 검증을 통과하게 되면 송금을 위해 블록체인이라고 불리는 온라인 원장으로 이동합니다.',
        '검증된 트랜잭션은 정보 블록에 추가되고, 해당 블록은 다른 블록에 연결되어 블록 체인이 만들어집니다.'],
      copyText: '',
      valid: true,
      success: false,
      successTransaction: 'Success Transaction!',
      successDescription: 'Your transaction will go to the memory pool (mempool) and will be mined soon',
      ok: 'OK',
      yourAddress: '',
      yourAddressRules: [
        v => !!v || 'Your wallet address is required',
        v => (v && v.length === 34) || 'Wallet address must be 34 characters'
      ],
      othersAddress: '',
      othersAddressRules: [
        v => !!v || 'Others wallet address is required',
        v => (v && v.length === 34) || 'Wallet address must be 34 characters'
      ],
      amount: '',
      amountRules: [
        v => !!v || 'Amount is required',
        v => (v && this.isRealValue(v)) || 'Amount must be real value'
      ],
      checkbox: false,
      effect: {
        icon: 'account_balance_wallet',
        iconClass: 'orange  lighten-4 dark--text'
      }
    }
  },
  firebase () {
    const id = this.$props.id
    return {
      yourWallets: db.ref('wallets').child(id),
      mempool: db.ref('mempool')
    }
  },
  methods: {
    clear () {
      this.yourAddress = ''
      this.othersAddress = ''
      this.amount = ''
      this.checkbox = false
    },
    // 실수인지 정규 표현식으로 통해 확인
    isRealValue (value) {
      var pattern = /^\d+(?:[.]\d+)?$/
      return pattern.test(value)
    },
    submit () {
      // 본인 지갑 주소인지, 보내려는 값보다 크거나 같은지 확인
      var isyourwallet = false
      var isOverMoney = false
      for (let i = 0; i < this.yourWallets.length; i++) {
        if (this.yourWallets[i].hash === this.yourAddress) {
          isyourwallet = true
          if (this.yourWallets[i].coin >= this.amount) {
            isOverMoney = true
          }
        }
      }

      if (!isyourwallet) {
        alert('Please Write your wallet correctly')
        return
      }
      if (!isOverMoney) {
        alert('Please write less than you have.')
        return
      }

      var ret = { from: this.yourAddress, to: this.othersAddress, amount: this.amount }
      db.ref('mempool').push(ret)
      this.success = true
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
    margin-top: 20px;
  }
  .ml10{
    margin-left:20px
  }
</style>
