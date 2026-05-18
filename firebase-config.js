const firebaseConfig = {
  apiKey: "AIzaSyAk7mKhpNsft2EEgEjYLpWOBGoaGPFs910",
  authDomain: "crriar.firebaseapp.com",
  projectId: "crriar",
  storageBucket: "crriar.firebasestorage.app",
  messagingSenderId: "805880400970",
  appId: "1:805880400970:web:9443ac3d070356da0deab3",
  measurementId: "G-76MPWN94T6"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
