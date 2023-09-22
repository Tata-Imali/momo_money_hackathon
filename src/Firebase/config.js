// Import the required Firebase services
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1lqwgT6n7vbe43i_M6XTp0wY2A-LXLBE",
  authDomain: "tata-imali-xrpl.firebaseapp.com",
  databaseURL: "https://tata-imali-xrpl-default-rtdb.firebaseio.com",
  projectId: "tata-imali-xrpl",
  storageBucket: "tata-imali-xrpl.appspot.com",
  messagingSenderId: "368259944692",
  appId: "1:368259944692:web:305f83fd0851ff7db88ea1"
};

  

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database - used to store loan requests in real time database
const database = firebaseApp.database();

// Initialize Authentication - used to store user sign ups
const auth = firebaseApp.auth();

// Initialize Firestore - used to store userType info assocaited with each user
const firestore = firebaseApp.firestore();

export { database, auth, firestore };


