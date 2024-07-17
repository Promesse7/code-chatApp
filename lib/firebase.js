import { initializeApp } from "firebase/app";
import {  getAuth  } from "firebase/auth";
import {  getFireStore  } from "firebase/FireStore"
import {  Storage  } from "firebase/FireStore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "talkie-7a977.firebaseapp.com",
  projectId: "talkie-7a977",
  storageBucket: "talkie-7a977.appspot.com",
  messagingSenderId: "152689794808",
  appId: "1:152689794808:web:ef9227396b60ae3c48250d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFireStore()
export const storage = getFireStore()
