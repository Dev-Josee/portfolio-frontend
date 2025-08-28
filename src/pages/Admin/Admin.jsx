import React, { useState } from "react";
import Gallery from "../../components/Gallery/Gallery";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import BioEditor from "../../components/BioEditor/BioEditor";
import styles from "./Admin.module.css";

const Admin = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className={styles.admin_page}>
           
            <h2>Editar sua bio

            </h2>
            <BioEditor refreshKey={refreshKey} setRefreshKey={setRefreshKey} />


            <PhotoUpload onUpload={() => setRefreshKey(prev => prev + 1)} />
        <section className={styles.gallery_section}>


            <h2 className={styles.events}>Eventos</h2>
            <Gallery
            
                category="events"
                showDelete
                key={`events-${refreshKey}`}
            />

            <h2 className={styles.corporate}>Ensaios</h2>
            <Gallery
                category="ensaios"
                showDelete
                key={`ensaios${refreshKey}`}
            />
            </section>

        </div>
    );
};


export default Admin;