// Import the required Firebase services
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrYLjeiWV5hBjD5T1NsTZetAIM7AMcZIs",
    authDomain: "tata-imali.firebaseapp.com",
    databaseURL: "https://tata-imali-default-rtdb.firebaseio.com/",
    projectId: "tata-imali",
    storageBucket: "tata-imali.appspot.com",
    messagingSenderId: "466924111082",
    appId: "1:466924111082:web:52190e793d1bad77c60393",
    measurementId: "G-NZZ3G80NNY"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = firebaseApp.database();

// Initialize Authentication
const auth = firebaseApp.auth();

export { database, auth };
