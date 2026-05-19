// ==================== firebase-config.js ====================

const firebaseConfig = {
  apiKey: "AIzaSyDkJK1vpKyMjqsiq2Rj4xRaIdn4CzZmYBI",
  authDomain: "nectoflora.firebaseapp.com",
  projectId: "nectoflora",
  storageBucket: "nectoflora.firebasestorage.app",
  messagingSenderId: "801628668001",
  appId: "1:801628668001:web:61b9f993f379cfade0ea20"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("✅ Firebase inicializado com sucesso!");

const auth = firebase.auth();
const db = firebase.firestore();

// Deixar disponível globalmente
window.auth = auth;
window.db = db;
