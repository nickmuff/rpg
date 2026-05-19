// ==================== firebase-config.js ====================

const firebaseConfig = {
  apiKey: "AIzaSyAk7mKhpNsft2EEgEjYLpWOBGoaGPFs910",
  authDomain: "crriar.firebaseapp.com",
  projectId: "crriar",
  storageBucket: "crriar.firebasestorage.app",
  messagingSenderId: "805880400970",
  appId: "1:805880400970:web:9443ac3d070356da0deab3",
  measurementId: "G-76MPWN94T6"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  console.log("✅ Firebase inicializado com sucesso!");
} else {
  console.error("❌ Firebase SDK não carregado!");
}

// Exportar para uso global
window.auth = firebase.auth();
window.db = firebase.firestore();
