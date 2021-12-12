import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBBl57WBHwYa-9WHvsRUv62BQ2XgY41J3I",
    authDomain: "books-320707.firebaseapp.com",
    databaseURL: "https://books-320707-default-rtdb.firebaseio.com",
    projectId: "books-320707",
    storageBucket: "books-320707.appspot.com",
    messagingSenderId: "814577049102",
    appId: "1:814577049102:web:057ae971e150c9dc11665f",
    measurementId: "G-5QSKEG5MJ7"
}

const app = initializeApp(firebaseConfig)
export default app