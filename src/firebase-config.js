import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
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
export const db = getFirestore(app)

export const FBFetchData = async (setFunction, collectionName) => {
  try{
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    const dataFromFirestore = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFunction(dataFromFirestore);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

export const FBSingleQueryById = async (setFunction, collectionName, reference) => {
  try{
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const dataFromFirestore = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dataFromFirestore.map((item) => {
      if (item.id === reference) {
        setFunction(item);
      }
    })
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

export const FBUpdateDoc = async (collectionName, reference, newObject) => {
  try {
    const documentRef = doc(db, collectionName, reference);
    await updateDoc(documentRef, newObject)
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
  }
}

export const FBDeleteDoc = async (collectionName, reference) => {
  try {
    const documentRef = doc(db, collectionName, reference);
    await deleteDoc(documentRef)
  } catch (error) {
    console.error('Erro ao excluir dados:', error);
  }
}