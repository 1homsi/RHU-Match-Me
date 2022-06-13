import React, { useState } from 'react';
import Link from 'next/link';
import styles from "../styles/Navbar.module.css";
import { auth, db } from '../firebase';
import { useRouter } from 'next/dist/client/router';

export default function NavBar() {
    const router = useRouter();
    const [user, setUser] = useState({});

    const handleLogout = () => {
        auth.signOut().then(() => {
            router.push('/');
        });
    };

    React.useEffect(() => {
        db.collection('users').doc(auth.currentUser?.uid).onSnapshot((doc) => {
            setUser(doc.data());
        });
    });

    return (
        <div className={styles.NavBar}>
            <p className={styles.Title} >
                <Link href="/">RhuMatchMe</Link>
            </p>
            {
                auth?.currentUser ?
                    <div className={styles.End}>
                        <p className={styles.User}>{user?.username}</p>
                        <button className={styles.LogOutButton} onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                    :
                    <div className={styles.End}>
                        <p className={styles.Inner}>
                            <Link href="/login">Login</Link>
                        </p>
                        <p className={styles.Inner}>
                            <Link href="/register">Register</Link>
                        </p>
                    </div>
            }
        </div >
    );
};
