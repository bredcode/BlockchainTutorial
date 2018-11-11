import firebase from 'firebase'

// Setup Firebase
let config = {
  apiKey: 'AIzaSyCgtXW9PnqiqKbC37_s6msPOkTkFb2HWWo',
  authDomain: 'blockchaintutorial-36bd7.firebaseapp.com',
  databaseURL: 'https://blockchaintutorial-36bd7.firebaseio.com',
  projectId: 'blockchaintutorial-36bd7',
  storageBucket: 'blockchaintutorial-36bd7.appspot.com',
  messagingSenderId: '157725077292'
}
firebase.initializeApp(config)
export const db = firebase.database()
