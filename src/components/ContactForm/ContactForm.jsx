import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";


const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.name || !formData.email || !formData.message) {
            setError('Todos os campos são obrigatórios');
            return;
        }
    
        setIsSubmitting(true);
        setError('');
    
        setTimeout(() => {
            const { name, email, message } = formData;
            const whatsappMessage = `Oi, Dih. Me chamo ${name} (${email}). ${message}`;
    
            console.log("Mensagem a ser enviada:", whatsappMessage); // Para debug
    
            // Codifica a mensagem inteira de uma vez
            const encodedMessage = encodeURIComponent(whatsappMessage);
    
            // Cria a URL correta
            const whatsappUrl = `https://wa.me/5581994972525?text=${encodedMessage}`;
    
            console.log("URL gerada:", whatsappUrl); // Para debug
    
            window.open(whatsappUrl, '_blank');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    // Simular envio
    return (

        <section className={styles.form_all} >

            <div className={styles.contact_form}>
                <h2 className={styles.title_primary}>Me envie uma mensagem</h2>

                {error && <ErrorMessage message={error} />}

                <form onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label htmlFor="name">Nome:</label>
                        <input
                            placeholder="Seu nome"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            
                        />

                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            placeholder="Seu e-mail"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="message">Mensagem:</label>
                        <textarea
                            placeholder="Sua mensagem"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            rows="8"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant='primary'
                        
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar via Whatsapp'}
                    </Button>

                </form>

            </div>

        </section>


    );


};
export default ContactForm;