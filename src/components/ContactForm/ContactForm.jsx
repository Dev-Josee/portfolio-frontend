import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./ContactForm.module.css";
import Button from "../common/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import ErrorMessage from "../common/ErrorMessage";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');






    // ... seus states

    // Crie uma referência para o contêiner principal do formulário
    const formRef = useRef(null);

    useLayoutEffect(() => {
      // Agora 'formRef.current' aponta diretamente para o seu <section>
      const formContainer = formRef.current;

      if (formContainer) { // Sempre verifique se a referência existe
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: formContainer, // Use a referência aqui
            start: "top 60%",
            toggleActions: "play none none reverse",
            // markers: true, // Remova isso para produção
          }
        });

        // Selecionando os elementos de forma mais robusta
        tl.from(formContainer.querySelector(`.${styles.form_group} label[for="name"]`), { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "<0.1")
          .from(formContainer.querySelector(`.${styles.form_group} input[name="name"]`), { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "<0.1")
          .from(formContainer.querySelector(`.${styles.form_group} label[for="email"]`), { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "<0.1")
          .from(formContainer.querySelector(`.${styles.form_group} input[name="email"]`), { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "<0.1")
          .from(formContainer.querySelector(`.${styles.form_group} label[for="message"]`), { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "<0.1")
          .from(formContainer.querySelector(`.${styles.form_group} textarea[name="message"]`), { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "<0.1")
          .from(formContainer.querySelector(`.${styles.contact_form} button[type="submit"]`), { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "<0.1");
      }
    }, []); // O array de dependências vazio está correto aqui












    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError('Todos os campos são obrigatórios');
        return;
      }

      setIsSubmitting(true);
      setError('');

      setTimeout(() => {
        const { name, email, message } = formData;
        const whatsappMessage = `Oi, Dih. Me chamo ${name} (${email}). ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/558198267478?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
    };

    return (
      <section className={styles.form_all} >
        <div className={styles.inform_contact}>
          <h3 className={styles.title_primary}>Entre em Contato</h3>
          <p className={styles.p}>
            Vamos conversar sobre seu próximo ensaio fotográfico. Estou aqui para tornar seus momentos inesquecíveis.
          </p>
          <h4>Informação de Contato</h4>

          <div className={styles.contact_info_icons}>
            <div className={styles.contact_info_item}>
              <span className={styles.icon}></span>
              <span className={styles.contact_text}>contato@feedhi.com</span>
            </div>
          </div>

          <div className={styles.atend_horario}>
            <h4>Horário de Atendimento</h4>
            <p>Segunda a Sexta: 9h às 18h</p>
            <p>Sábados: 9h às 14h</p>
            <p>Domingos: Sob consulta</p>
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

            <Button type="submit" disabled={isSubmitting} variant="primary">
              {isSubmitting ? 'Enviando...' : 'Enviar via Whatsapp'}
            </Button>
          </form>
        </div>
      </section>
    );
  };

  export default ContactForm;
