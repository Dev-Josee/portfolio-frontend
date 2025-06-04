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


    return (

        <section className={styles.form_all} >
            <div className={styles.inform_contact}>
                <h3 className={styles.title_primary}>Entre em Contato</h3>
                <p className={styles.p}>Vamos conversar sobre seu próximo ensaio fotográfico. Estou aqui para tornar seus momentos inesquecíveis.</p>
                <h4>Informação de Contato </h4>
                <div className={styles.contact_info_icons}>
                    <div className={styles.contact_info_item}>

                        <span className={styles.icon}>

                            <i><svg width="20" height="20" fill="currentColor"><path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5A.5.5 0 0 0 3.5 4v.217l6.5 4.55 6.5-4.55V4a.5.5 0 0 0-.5-.5H4zm13 2.383-6.293 4.406a1 1 0 0 1-1.414 0L3 5.883V16a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V5.883z" /></svg></i>
                        </span>
                        <span className={styles.contact_text}>contato@feedhi.com</span>
                    </div>
                    <div className={styles.contact_info_item}>

                        <span className={styles.icon}>
                            <i><svg width="20" height="20" fill="currentColor"><path d="M3.654 1.328a.678.678 0 0 1 .252-.326c.272-.2.637-.217.93-.057a17.568 17.568 0 0 1 7.168 7.168c.16.293.143.658-.057.93a.678.678 0 0 1-.326.252l-2.29.764a.678.678 0 0 1-.746-.174l-1.516-1.516a12.683 12.683 0 0 0 5.516 5.516l1.516-1.516a.678.678 0 0 1 .746-.174l2.29.764a.678.678 0 0 1 .326.252c.2.272.217.637.057.93a17.568 17.568 0 0 1-7.168 7.168c-.293.16-.658.143-.93-.057a.678.678 0 0 1-.252-.326l-.764-2.29a.678.678 0 0 1 .174-.746l1.516-1.516a12.683 12.683 0 0 0-5.516-5.516l-1.516 1.516a.678.678 0 0 1-.746.174l-2.29-.764z" /></svg></i>
                        </span>
                        <span className={styles.contact_text}>(81) 9999999</span>
                    </div>
                    <div className={styles.contact_info_item}>

                        <span className={styles.icon}>
                            <i><svg width="20" height="20" fill="currentColor"><path d="M10 2a6 6 0 0 0-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 0 0-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg></i>
                        </span>
                        <span className={styles.contact_text}>Recife, Pernambuco</span>
                    </div>
                </div>
                <div className={styles.atend_horario}>
                    <h4>Horário de Atendimento</h4>
                    <p>Segunda a Sexta: 9h às 18h </p>
                    <p>Sábados: 9h às 14h
                    </p>
                    <p>Domingos: Sob consulta

                        h </p>
                </div>

            </div>

            <div className={styles.contact_form}>

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
                        variant="primary"

                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar via Whatsapp'}
                    </Button>

                </form>

            </div>

        </section>


    );


};
export default ContactForm;