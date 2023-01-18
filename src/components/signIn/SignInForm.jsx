import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../inputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./SignIn.module.css";

function SignInForm({ userLogin, setUserLogin }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                });
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
            <h1 className={styles.heading}>SignIn</h1>

            <InputControl
                label="Name"
                placeholder="Enter your name"
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                }
            />
            <InputControl
                label="Email"
                placeholder="Enter email address"
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                }
            />
            <InputControl
                label="Password"
                placeholder="Enter password"
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
            />

            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button onClick={handleSubmission} disabled={submitButtonDisabled}>
                    SignIn
                </button>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => setUserLogin(!userLogin)} style={{ cursor: "pointer", color: "orangered" }}>
                        Login
                    </span>
                </p>
            </div>
        </div>

    );
}

export default SignInForm;