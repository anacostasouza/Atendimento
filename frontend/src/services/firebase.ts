import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore" // 🔹 Importa o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBMMyoP6ky1Q-RZi2_ncUM-NjBVriUcaMc",
  authDomain: "atendimento-desenhar.firebaseapp.com",
  databaseURL: "https://atendimento-desenhar-default-rtdb.firebaseio.com",
  projectId: "atendimento-desenhar",
  storageBucket: "atendimento-desenhar.appspot.com",
  messagingSenderId: "749323006063",
  appId: "1:749323006063:web:b1e66b6c7fb52a232d5d9a"
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp) 

export { firebaseApp, db } 
