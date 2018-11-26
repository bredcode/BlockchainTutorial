<template>
  <v-app id="inspire">
    <div id="line-space"></div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
              src="https://cdn.arstechnica.net/wp-content/uploads/2017/10/getty-security.jpg"
              aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ encryptionTitle }}</h3>
              <div v-for="i in encryptiontDescription" :key="i">{{ i }}</div>
            </div>
          </v-card-title>
        </v-card>

        <div id="line-space"></div>
        <div id="hash-wrapper">
            <div id="hash-description">
              특정 Text를 입력하면 SHA-256으로 해싱된 값이 출력됩니다.
            </div>
            <v-textarea
              outline
              name="input-7-4"
              label="Input text"
              value=""
              v-model="inputText"
            ></v-textarea>
            <v-text-field
              value=""
              label="Output sha-256"
              outline
              readonly
              v-model="sha256Ret"
            ></v-text-field>
        </div>

        <div id="line-space"></div>
        <div id="hash-wrapper">
            <div id="hash-description">
              <div> 64자리의 숫자로 구성된 Key를 생성하면 Private key가 되고 </div>
              <div> 이를 이용하여 SHA-256으로 한번 해싱한 후 다시 RIPEMD-160으로 해싱하면 </div>
              <div> 32자리로 구성된 Public key가 생성됩니다. </div>
            </div>
            <v-text-field
              v-model="privateKey"
              counter="64"
              maxlength="64"
              label="Private key"
              outline
            ></v-text-field>
            <v-text-field
              value=""
              label="Public key"
              counter="32"
              outline
              readonly
              v-model="publicKey"
            ></v-text-field>
        </div>

        <div id="line-space"></div>
        <div id="hash-wrapper">
            <div id="hash-description">
              <div> Text를 Private key로 암호화할 수 있습니다. </div>
              <div> 위의 내용에서 얻은 Private key를 이용하여 </div>
              <div> 아래의 튜토리얼에서 Text에 전자서명을 해볼 수 있습니다. </div>
            </div>
            <v-textarea
              outline
              name="input-7-4"
              label="Input text"
              value=""
              v-model="signInputText"
            ></v-textarea>
            <v-text-field
              value=""
              label="Private key"
              counter="64"
              maxlength="64"
              outline
              v-model="signPrivateKey"
            ></v-text-field>
            <v-btn block color="success" @click="signClick()">Sign</v-btn>
            <div id="line-space"></div>
            <v-text-field
              value=""
              label="Message Signature"
              outline
              readonly
              v-model="signKey"
            ></v-text-field>
        </div>

        <div id="line-space"></div>
        <div id="hash-wrapper">
            <div id="hash-description">
              <div> 서명한 내용을 검증하기 위해서는 복호화를 해야합니다. </div>
              <div> 위에서 Text와 Private key로 암호화를 한 내용을 </div>
              <div> Text, Public key 그리고 서명을 통해 나온 해시값을 이용하여 </div>
              <div> 위조가 없었는지 확인해볼 수 있습니다. </div>
            </div>
            <v-textarea
              outline
              name="input-7-4"
              label="Input text"
              value=""
              v-model="verifyInputText"
            ></v-textarea>
            <v-text-field
              value=""
              label="Public key"
              counter="32"
              maxlength="32"
              outline
              v-model="verifyPublicKey"
            ></v-text-field>
            <v-text-field
              value=""
              label="Message Signature"
              outline
              v-model="verifySignKey"
            ></v-text-field>
            <v-btn block color="info" @click="verifyClick()">Verify</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <!-- 성공 시 나타나는 msg -->
    <div v-if="isValidSign" class="text-xs-center">
      <v-dialog v-model="isValidSign" width="800">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            {{ validSignTitle }}
          </v-card-title>

          <v-card-text v-for="(i, key) in validSignDescription" :key="i">
            {{ key }} : {{ i }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="isValidSign = false"
            >
              {{ ok }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- 검증 실패시 나타나는 msg -->
    <v-snackbar
      v-model="isInValidSign"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === true"
      :auto-height="true"
    >
      <div id="invalid-text">Invalid Signature</div>
    </v-snackbar>
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
      encryptionTitle: 'What is encryption in blockchain?',
      encryptiontDescription: ['해시 함수는 임이의 길이를 갖는 메시지를 입력받아 고정된 길이의 해시값을 출력하는 함수입니다.',
        '암호 알고리즘에는 키가 사용되지만, 해시 함수는 키를 사용하지 않으므로 같은 입력에 대해서는 항상 같은 출력이 나오게 됩니다.',
        '이러한 해시함수를 사용하는 목적은 메시지의 오류나 변조를 탐지할 수 있는 무결성을 제공하기 위해 사용됩니다.',
        '이때 비트코인 블록체인에서는 SHA-256이라는 해시 함수를 이용합니다.'],
      inputText: '',
      sha256Ret: '',
      privateKey: '',
      publicKey: '',
      signInputText: '',
      signPrivateKey: '',
      signPublicKey: '',
      signKey: '',
      verifyInputText: '',
      verifyPublicKey: '',
      verifySignKey: '',
      isValidSign: false,
      validSignTitle: 'This signature is valid!',
      validSignDescription: '',
      ok: 'OK',
      isInValidSign: false,

      // snackbar variable
      y: 'top',
      x: null,
      mode: '',
      timeout: 3000
    }
  },
  firebase () {
    return {
      signs: db.ref('sign')
    }
  },
  methods: {
    signClick () {
      // public key가 제대로 입력된지 확인
      for (let i = 0; i < this.signPrivateKey.length; i++) {
        if (!(this.signPrivateKey[i] >= 0 && this.signPrivateKey[i] <= 9)) {
          alert('Please insert number only')
          return
        }
      }
      if (this.signPrivateKey.length === 64) {
        this.signPublicKey = '2'
        // 실제로는 RIPEMD로 해야하지만 테스트이기에 SHA256 두번 사용
        let tmp = SHA256(SHA256(this.signPrivateKey))
        for (let i = 0; i < 31; i++) {
          this.signPublicKey += tmp[i]
        }

        this.signKey = SHA256(this.signPrivateKey + this.signInputText)
        let ret = {signInputText: this.signInputText, privateKey: this.signPrivateKey, publicKey: this.signPublicKey, signKey: this.signKey}
        db.ref('sign').push(ret)
      }
    },
    verifyClick () {
      for (let i = 0; i < this.signs.length; i++) {
        if (this.verifyInputText === this.signs[i].signInputText && this.verifyPublicKey === this.signs[i].publicKey && this.verifySignKey === this.signs[i].signKey) {
          this.isValidSign = true
          this.validSignDescription = {
            InputText: this.signs[i].signInputText,
            PrivateKey: this.signs[i].privateKey,
            PublicKey: this.signs[i].publicKey,
            SignKey: this.signs[i].signKey
          }
          return
        }
      }
      this.isInValidSign = true
    }
  },
  watch: {
    inputText () {
      this.sha256Ret = SHA256(this.inputText)
    },
    privateKey () {
      for (let i = 0; i < this.privateKey.length; i++) {
        if (!(this.privateKey[i] >= 0 && this.privateKey[i] <= 9)) {
          alert('Please insert number only')
          return
        }
      }
      if (this.privateKey.length === 64) {
        this.publicKey = '2'
        // 실제로는 RIPEMD로 해야하지만 테스트이기에 SHA256 두번 사용
        let tmp = SHA256(SHA256(this.privateKey))
        for (let i = 0; i < 31; i++) {
          this.publicKey += tmp[i]
        }
      }
    },

    signPrivateKey () {
      for (let i = 0; i < this.signPrivateKey.length; i++) {
        if (!(this.signPrivateKey[i] >= 0 && this.signPrivateKey[i] <= 9)) {
          alert('Please insert number only')
          return
        }
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
    margin-left:20px
  }
  #hash-wrapper{
    width:100%;
  }
  #hash-description{
    color: #2196f3;
    margin-bottom: 15px;
    margin-top: 25px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  }
  #invalid-text{
    text-align: center;
    color: yellow;
    width: 100%;
    font-size: 15px;
    font-weight: bold;
  }
</style>
