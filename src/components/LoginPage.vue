<template>
  <v-app>
    <div id="bg">
      <div id="wrapper">
        <v-container fluid @keyup.enter="getLogin()">
          <h2 id="title-center"> {{ blockchainTutorial }} </h2>
          <v-text-field
            color="success darken"
            label="ID"
            loading
            id = "input-id"
            v-model = "idValue"
          >
          </v-text-field>
          <v-btn v-if="!idValue" color="grey" dark @click="getLogin()" id="login-btn">{{ login }}</v-btn>
          <div v-else id="router-box">
            <router-link :to="'/MainPage'+'/'+idValue">
              <v-btn color="pink" dark @click="getLogin()" id="login-btn">{{ login }}</v-btn>
            </router-link>
          </div>

          <div id="error-box"> {{ err.msg }} </div>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      blockchainTutorial: 'Blockchain Tutorial',
      idValue: '',
      login: 'Login',
      err: {
        msg: '',
        errorId: ''
      }
    }
  },

  methods: {
    getLogin: function () {
      if (this.idValue === '') {
        this.err.msg = "ID can't be empty."
        this.err.errorId = this.idValue
      }
      else {
        this.err.msg = ''
      }
    }
  },
  watch: {
    idValue: function () {
      if (this.err.errorId !== this.idValue) {
        this.err.msg = ''
      }
    }
  },
}
</script>

<style>

#bg{
  background-image: url("https://ak6.picdn.net/shutterstock/videos/21249916/thumb/1.jpg?i10c=img.resize(height:160)");
  color:white;
  width:100%;
  height:100%;
  background-color:#202E47;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.application .theme--light.v-label, .theme--light .v-label {
    color: white;
    font-size:25px;
}

.application .theme--light.v-input:not(.v-input--is-disabled) input, .application .theme--light.v-input:not(.v-input--is-disabled) textarea, .theme--light .v-input:not(.v-input--is-disabled) input, .theme--light .v-input:not(.v-input--is-disabled) textarea {
    color: white;
}
.v-input {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  font-size: 16px;
  margin-top: 16px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}
#wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#title-center{
  text-align: center;
  font-size: 30px;
  margin-bottom: 50px;
}
#img{
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top:50px;
  margin-bottom:100px;
}
#input-id{
  width:50px;
  font-size:20px;
  margin-top:10px;
}
#login-btn{
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top:50px;
}
#error-box{
  margin-top:20px;
  text-align:center;
}
#router-box{
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.application a {
  text-decoration: none;
}
</style>
