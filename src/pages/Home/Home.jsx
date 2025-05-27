import React from "react";
import BioViewer from "../../components/Bioviewer/BioViewer"
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from "./Home.module.css";

import Lane from "../../assets/img/lane.jpg"
import Gallery from "../../components/Gallery/Gallery";


const Home = () => {

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
             <div>
                <h3>Eventos</h3>
                <Gallery category="events"/>
             </div>
            </section>

            
            <section>
             <div>
                <h3>Corporativo</h3>
                <Gallery category="corporate"/>
             </div>
            </section>

            <section className={styles.contac_section}>
                
                <ContactForm />
            </section>
        </div>
    );

};

export default Home;
