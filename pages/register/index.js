import React, { useState } from 'react';
import styles from "../../styles/LoginRegister.module.css";
import { auth, db } from '../../firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [gender, setGender] = useState("");
    const [RhuId, setRhuId] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        } else {
            setError('');
            auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
                db.collection('users').doc(authUser.user.uid).set({
                    username: username,
                    email: email,
                    gender: gender,
                    Id: RhuId
                }).catch((error) => {
                    console.log(error);
                });
                router.push('/');
            });
        };
    };

    return (
        <div className={styles.Page}>
            <div className={styles.form}>
                <h1>Register</h1>
                <form className={styles.InnerForm} onSubmit={handleRegister}>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        value={RhuId}
                        onChange={(e) => setRhuId(e.target.value)}
                        type="password"
                        placeholder="Rhu Student ID"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                        type="email"
                        placeholder="Email address"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm password"
                    />
                    <label>Gender</label>
                    <div onChange={(e) => setGender(e.target.value)} className={styles.innerDiv}>
                        <input type="radio" value="male" name="male" /> Male
                        <input type="radio" value="female" name="female" /> Female
                        <input type="radio" value="fuckee" name="fuckee" /> Fuckee
                    </div>
                    <button>create</button>
                    <p className="message">Already registered? <Link href="/login">Sign In</Link></p>
                </form>
                {
                    error && <p className={styles.error}>{error}</p>
                }
            </div >
        </div >
    );
};