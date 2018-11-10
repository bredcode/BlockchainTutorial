<template>
  <v-app id="inspire">
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
              <div v-for="i in transactionDescription">{{ i }}</div>
            </div>
          </v-card-title>
        </v-card>

        <div id="line-space"></div>

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
  </v-app>
</template>

<script>
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
      valid: true,
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
      checkbox: false
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
    }
  }
}
</script>

<style scoped>
  #line-space{
    margin-top: 20px;
  }
</style>
