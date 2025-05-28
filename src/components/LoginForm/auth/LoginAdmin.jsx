import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './LoginAdmin.module.css';


const LoginAdmin = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('Aguarde...');

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('accessToken', data.accessToken);

                setMessage('Login realizado! Redirecionando...');
                navigate('/admin');
                console.log("Token armazenado:", data.accessToken);
            } else {
                setMessage(data.message || 'Erro ao fazer login. Verifique suas credenciais.');
                console.error('Erro ao fazer login:', data.message);
            }

        } catch (error) {
            console.error('Erro na requisição de login:', error);
            setMessage('Erro ao conectar com o servidor. Tente novamente mais tarde.');

        }
    };

    return (
        <div className={styles.logincontainer}>
            <h2 className={styles.TitleLogin}>
               Oi, Dih! Faça o login para aceesar o painel
            </h2>

            {message && <p className={styles.message}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Usuário:</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Entrar</button>
            </form>




            
        </div>
    )


}


export default LoginAdmin;