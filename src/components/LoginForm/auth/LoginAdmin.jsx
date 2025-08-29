import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from '../../../api';
import styles from './LoginAdmin.module.css';


const LoginAdmin = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);




    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('Aguarde...');

        try {
            const response = await api.post('/admin/login', { username, password });
            if (response.status === 200) {
                localStorage.setItem('accessToken', data.accessToken);

                setMessage('Login realizado! Redirecionando...');
                navigate('/admin');
                console.log("Token armazenado:", data.accessToken);
            } else {
                setMessage(data.message || 'Erro ao fazer login. Verifique suas credenciais.');
                console.error('Erro ao fazer login:', data.message);
            }

        } catch (error) {
            setMessage(response.data.message || 'Erro ao fazer login. Verifique suas credenciais.');
            console.error('Erro ao fazer login:', response.data.message);
        }

    };


    return (

        <div className={styles.logincontainer}>

            <h2 className={styles.TitleLogin}>
                Oi, Dih!
            </h2>
            <p className={styles.Plogin}>
                Faça o login para acessar o painel
            </p>

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
                    <div className={styles.passwordContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={styles.toggleButton}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>
                <button type="submit" className={styles.button}>Entrar</button>
                <a href="#esqueciminhasenha" className={styles.resetpsw}>Esqueci minha senha</a>
            </form>
        </div >

    )
}




export default LoginAdmin;