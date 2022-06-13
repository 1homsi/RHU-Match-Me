import Link from 'next/link';
import React, { useState } from 'react';
import styles from "../../styles/LoginRegister.module.css";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            router.push("/");
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className={styles.Page}>
            <div className={styles.form}>
                <h1>Login</h1>
                <form className={styles.InnerForm} onSubmit={handleLogin}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <button>login</button>
                    <p className="message">Not registered? <Link href="/register">Create an account</Link></p>
                </form>
            </div>
        </div>
    );
}
