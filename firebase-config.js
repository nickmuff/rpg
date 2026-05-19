// ==================== firebase-config.js ====================

const firebaseConfig = {
  apiKey: "AIzaSyDNNicg3SV4jgN9acFkVTSBTPTX9kIJdqA",
  authDomain: "nectoflora-ecd8b.firebaseapp.com",
  projectId: "nectoflora-ecd8b",
  storageBucket: "nectoflora-ecd8b.firebasestorage.app",
  messagingSenderId: "154229243646",
  appId: "1:154229243646:web:d2ab43708db5736a4d6faf"
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
