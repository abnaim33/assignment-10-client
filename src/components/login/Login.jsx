import React, { useState } from 'react'
import SignInForm from '../signIn/SignInForm'
import LoginForm from './LoginForm'
import styles from "./Login.module.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';


const provider = new GoogleAuthProvider();

const Login = () => {

    const navigate = useNavigate()



    const [userLogin, setUserLogin] = useState(true)

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {



                if (window.location.pathname === "/login") {
                    navigate("/")
                } else {
                    navigate(`${window.location.pathname}`)
                }
                // ...
            }).catch((error) => {

            });
    }

    return (
        <div className={styles.container}>
            {userLogin ? <LoginForm userLogin={userLogin} setUserLogin={setUserLogin} />
                :
                <SignInForm userLogin={userLogin} setUserLogin={setUserLogin} />}


            <div onClick={() => handleGoogleSignIn()} className={styles.googleBtn}>
                <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1672889552/download_uvfdo2.png" alt="" />
                <h4>Continue with Google</h4>

            </div>

        </div>
    )
}

export default Login