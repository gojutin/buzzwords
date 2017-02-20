import firebase from 'firebase';


const config = {
  // Enter your firebase config object here
  apiKey: "AIzaSyAqxGBy3gEkWPOcipCHsMUUPsah0Cfmj2w",
  authDomain: "buzzwords-3b675.firebaseapp.com",
  databaseURL: "https://buzzwords-3b675.firebaseio.com",
  storageBucket: "buzzwords-3b675.appspot.com",
  messagingSenderId: "258279694853"
};

firebase.initializeApp(config);
