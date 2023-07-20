import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDVf5gkR-nV_pqnNdVGNQfSn0mxj7vSTUc",
  authDomain: "basepro-75226.firebaseapp.com",
  projectId: "basepro-75226",
  storageBucket: "basepro-75226.appspot.com",
  messagingSenderId: "806307306918",
  appId: "1:806307306918:web:bd59c4da756c5152f8c367"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)