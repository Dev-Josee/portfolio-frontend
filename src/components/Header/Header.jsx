import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    console.log("tudo ok")
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <h1 className={styles.logo}>Feedih</h1>
                <nav className={styles.nav}>

                    <Link to="/" className={styles.nav_link}>Home</Link>

                    <Link to="/events" className={styles.nav_link}>Eventos</Link>

                    <Link to="/empresa" className={styles.nav_link}>Empresarial</Link>

                </nav>
            </div>
        </header>
    )
}

export default Header