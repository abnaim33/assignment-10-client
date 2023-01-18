import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "../inputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Login.module.css";

function LoginForm({ userLogin, setUserLogin }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);

                if (window.location.pathname === "/login") {
                    navigate("/")
                } else {
                    navigate(`${window.location.pathname}`)
                }
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };
    return (

        <div className={styles.innerBox}>
            <h1 className={styles.heading}>Login</h1>

            <InputControl
                label="Email"
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Enter email address"
            />
            <InputControl
                label="Password"
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
                placeholder="Enter Password"
            />

            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button disabled={submitButtonDisabled} onClick={handleSubmission}>
                    Login
                </button>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => setUserLogin(!userLogin)} style={{ cursor: "pointer", color: "orangered" }}>
                        Create an account
                    </span>
                </p>
            </div>
        </div>




    );
}

export default LoginForm;