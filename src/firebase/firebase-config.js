import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9yrzUp022UTbvjLsQOdNhXrj5XYvdUdc",
  authDomain: "alquimia-store.firebaseapp.com",
  projectId: "alquimia-store",
  storageBucket: "alquimia-store.appspot.com",
  messagingSenderId: "290152711364",
  appId: "1:290152711364:web:5ed057a8eec408dd50b591"
};

const app = initializeApp(firebaseConfig);

export default app;