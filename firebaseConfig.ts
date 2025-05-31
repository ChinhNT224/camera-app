// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-d1-tSRkfIBMAobKEP4Xh-7qAWfjuz8k",
  authDomain: "camera-api.firebaseapp.com",
  projectId: "camera-api-ddd8d",
  storageBucket: "camera-api.appspot.com",
  messagingSenderId: "390678609917",
  appId: "1:390678609917:android:73f4cae3925e22a410e394",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);