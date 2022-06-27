// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCceiEVnsPnDYUjswSuvN8rZTUKa2RMc_8",
  authDomain: "clothing-store-db-af161.firebaseapp.com",
  projectId: "clothing-store-db-af161",
  storageBucket: "clothing-store-db-af161.appspot.com",
  messagingSenderId: "877487915771",
  appId: "1:877487915771:web:55e7d49466c3a11662665e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db,'users',userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt  = new Date();

     try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });
     }catch (err) {
         prompt('error creating the user',err.message);
     }

  }

}