import firebase from "@firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDm-uYbU5EbClZYN6tv6BHq37P4DnmNcX8",
    authDomain: "portfolio-e1f91.firebaseapp.com",
    databaseURL: "https://portfolio-e1f91.firebaseio.com",
    projectId: "portfolio-e1f91",
    storageBucket: "portfolio-e1f91.appspot.com",
    messagingSenderId: "753718061791",
    appId: "1:753718061791:web:369adc44ca3a905a9f976a",
    measurementId: "G-0M3T26K6B1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default firebase;
