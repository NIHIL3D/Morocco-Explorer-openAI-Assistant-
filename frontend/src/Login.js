import { useEffect } from "react";
import { auth } from "./FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";
// import { fetchData } from "./Mexplorer"


const Login = () => {

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          return history.push("/");
        } 
        // else {
        //   return history.push("/Login");
        // }
      });
}, [])

  const history = useHistory();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    
    signInWithPopup(auth, provider)
    .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const photo = result.user.photoURL;

        localStorage.setItem('user', name);
        localStorage.setItem('email', email);
        localStorage.setItem('photo', photo);

        return history.push("/");
    })
    .catch((error) => {
        console.log(error);
    });
};
//   const checklogin = async () => {
//     const response = auth;
    
//     if (response) {
//       return history.push("/");
//     }
// }
//   useEffect(checklogin(), []);
return (
  <div className="flex min-h-screen justify-center items-center">
    <div className="text-center">
      <div className="text-3xl text-white mb-4">Morocco Explorer</div>
      <button
        className="text-white bg-white/5 hover:bg-white/10 rounded px-2 py-1 ml-2"
        onClick={signInWithGoogle}
      >
        Login with Google
      </button>
    </div>
  </div>
);

};
  
  export default Login;