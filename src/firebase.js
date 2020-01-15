import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyD-e7knTBOZSu2F4Md3b6e04lX4vGqz-x8",
  authDomain: "react-firebase-trello-8d6b9.firebaseapp.com",
  databaseURL: "https://react-firebase-trello-8d6b9.firebaseio.com",
  projectId: "react-firebase-trello-8d6b9",
  storageBucket: "react-firebase-trello-8d6b9.appspot.com",
  messagingSenderId: "1025363688738",
  appId: "1:1025363688738:web:11567859b79cbaf592f97b",
  measurementId: "G-EKEHNEZ9NL"
}

firebase.initializeApp(config)

const db = firebase.firestore()

const firebaseAuth = firebase.auth()

const boardsRef = db.collection('boards')
const listsRef = db.collection('lists')
const cardsRef = db.collection('cards')

export { boardsRef, listsRef, cardsRef, firebaseAuth }
