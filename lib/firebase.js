import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCW5_zWpJOlbCD4DNhZNLFhR1ocUycbyD4",
  authDomain: "alertify-31071.firebaseapp.com",
  projectId: "alertify-31071",
  storageBucket: "alertify-31071.firebasestorage.app",
  messagingSenderId: "550197651053",
  appId: "1:550197651053:web:91cc31a575b5504c2fc164",
  measurementId: "G-3PT5EF7L8Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) getAnalytics(app);
  });
}
