import { initializeApp } from "firebase/app";
import env from "react-dotenv";
import { useHistory } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";

// const Login = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         setIsLoggedIn(true);
//     }, []);

//     const history = useHistory();
//     if (isLoggedIn) {
//         return history.push("/");
//     }
//     else {
//         return (
//             <div>
//                 login
//             </div>
//         );
//     }
// }


const firebaseConfig = {
    // apiKey: "AIzaSyDM4smmNRuIAcTaqyspx_QcbGglU26m0jY",
    // authDomain: "morocco-explorer-5ed3e.firebaseapp.com",
    // databaseURL: "https://morocco-explorer-5ed3e-default-rtdb.europe-west1.firebasedatabase.app/",
    // projectId: "morocco-explorer-5ed3e",
    // storageBucket: "morocco-explorer-5ed3e.appspot.com",
    // messagingSenderId: "54169141146",
    // appId: "1:54169141146:web:4fdaafbd76aebc1a7f4423"

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
    
//     signInWithPopup(auth, provider)
//     .then((result) => {
//         const name = result.user.displayName;
//         const email = result.user.email;
//         const photo = result.user.photoURL;

//         localStorage.setItem('user', name);
//         localStorage.setItem('email', email);
//         localStorage.setItem('photo', photo);

//         const history = useHistory();

//         return history.push("/");
//         // const [isLoggedIn, setIsLoggedIn] = useState(false);
//         // // Login();
//         // useEffect(() => {
//         //     setIsLoggedIn(true);
//         // }, []);

//         // const history = useHistory();
//         // if (isLoggedIn) {
//         //     return history.push("/");
//         // }
//         // else {
//         //     return (
//         //         <div>
//         //             login
//         //         </div>
//         //     );
//         // }
//         // 
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// };