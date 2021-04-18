import firebase from "firebase/app";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBfH1uBfoEZYkcVBCogobRYFFf_Azr6a2s",
  authDomain: "summit-club-4025491056160.firebaseapp.com",
  databaseURL: "https://summit-club-4025491056160-default-rtdb.firebaseio.com/",
  projectId: "summit-club-4025491056160",
  storageBucket: "summit-club-4025491056160.appspot.com",
  messagingSenderId: "861512527851",
  appId: "1:861512527851:web:565d19e044e1b91999f3ae",
  measurementId: "G-2V2X0Y8DEG",
};

// initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// set firestore collection refs
const ClassificationRef = "";
const CollectionsRef = "";
const MerchandiseRef = "";
export const FeaturesRef = firebase.firestore().collection("features");
const UsersRef = "";
