import React, { useLayoutEffect } from "react";

import BioViewer from "../../components/BioViewer/BioViewer"
import ContactForm from "../../components/ContactForm/ContactForm";
import styles from './Home.module.css';

import gsap from 'gsap';
import Gallery from '../../components/Gallery/Gallery';



const Home = () => {

useLayoutEffect(() =>{
    const elementsToAnimate = gsap.utils.toArray(`.${styles.bio_section} > *`);


    gsap.set(elementsToAnimate, {
        x: -200,
        autoAlpha: 0,
    })

    gsap.to(elementsToAnimate,{
        x: 0,
        autoAlpha: 1,
        duration: 1.5,
        delay: 0.5,
        stagger: 0.2,
        ease: "power2.out"
    }), [];

    
})







    return (
        <div className={styles.home_page}>
            <section className={styles.bio_section}>
                <div className={styles.about}>

                    <h3 className={styles.about_text}>Edlane Moura</h3>

                    <BioViewer />

                </div>

                <div className={styles.gradient_bord}>
                    <div className={styles.gradient_overlay}></div>
                </div>
            </section>

            <section className={styles.sectionGallery}>
                <div className={styles.gallery_title}>
                    <h3>Portfólio</h3>
                    <p>Uma seleção dos meus trabalhos mais marcantes, capturando a beleza em diferentes cenários e momentos únicos.</p>
                    <Gallery category="events" />
                </div>
                <div className={styles.gallery_title}>
                    <h3>Ensaios</h3>
                    <p>Ensaios especiais que contam histórias através de imagens, criando memórias que durarão para sempre.</p>
                    <Gallery category="ensaios" />
                </div>

            </section>

            <section className={styles.contac_section}>
                
                <ContactForm />
            </section>
        </div>
    );

};

export default Home;
