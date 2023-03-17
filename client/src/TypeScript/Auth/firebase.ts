import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDo1nY_DwAe-knie2vvUMNz6XNhz-Wlokk",
    authDomain: "new-chatting-project.firebaseapp.com",
    projectId: "new-chatting-project",
    storageBucket: "new-chatting-project.appspot.com",
    messagingSenderId: "466139749102",
    appId: "1:466139749102:web:50bf41bad27ab5034771ff"
};
export const app = initializeApp(firebaseConfig);



export const provider = new GoogleAuthProvider();

const auth = getAuth();