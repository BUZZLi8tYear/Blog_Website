
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; // Import Firestore module

const firebaseConfig = {
    apiKey: "AIzaSyBP3K9rWQsjkXbCOfIp4P2KMgdpvYCcS4s",
    authDomain: "blogproj-5a25e.firebaseapp.com",
    projectId: "blogproj-5a25e",
    storageBucket: "blogproj-5a25e.appspot.com",
    messagingSenderId: "579813091793",
    appId: "1:579813091793:web:fe65246629fe53c0f798f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db } ;