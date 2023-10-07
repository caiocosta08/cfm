import { initializeApp, getApp } from 'firebase/app';
import { Database } from 'firebase/database';
import { getDatabase, ref, set } from 'firebase/database';

// Firebase Configs
const firebaseConfig = {
    apiKey: "AIzaSyBZSSFNSuvaF38k2YNKb5cEr3rlubkzsgs",
    authDomain: "app-nextjs-8cc9f.firebaseapp.com",
    databaseURL: "https://app-nextjs-8cc9f-default-rtdb.firebaseio.com",
    projectId: "app-nextjs-8cc9f",
    storageBucket: "app-nextjs-8cc9f.appspot.com",
    messagingSenderId: "467671124469",
    appId: "1:467671124469:web:d3f8411de87d44253438bc",
    measurementId: "G-7JD82DHN5N"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(firebaseApp);

function firebaseAddUser(userId: String, email: String) {
    set(ref(firebaseDatabase, 'users/' + userId), {
        email: email,
        status: 1,
        amount: 0
    })
    .then(() => {
        console.log('Usuário criado com sucesso!');
    })
    .catch((error) => {
        console.log('Falha ao gravar os dados!');
    })
}

export { firebaseAddUser }
