import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDNy1Wgmo8yqgZZrjm_G1HNK_n8nVLNH78",
  authDomain: "fir-a18aa.firebaseapp.com",
  projectId: "fir-a18aa",
  storageBucket: "fir-a18aa.appspot.com",
  messagingSenderId: "565309410628",
  appId: "1:565309410628:web:3ab5324ec92a5478871b11",
  measurementId: "G-VXZWK0FB3D"
};

export default firebase.initializeApp(firebaseConfig);
