import '../styles/globals.css'
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA_EbEmgaEfG1iX4zOcRdIM7MCpx1VnbJs",
  authDomain: "blogger-space-adbeb.firebaseapp.com",
  databaseURL: "https://blogger-space-adbeb-default-rtdb.firebaseio.com",
  projectId: "blogger-space-adbeb",
  storageBucket: "blogger-space-adbeb.appspot.com",
  messagingSenderId: "277893464279",
  appId: "1:277893464279:web:6d93c8df3b0fcf9336f092"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

//firebase.initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
