import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BioViewer.module.css";

// =========================================//////////////////

// GSAP//
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ExpoScaleEase, SlowMo } from "gsap/EasePack";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother,TextPlugin,ExpoScaleEase,SlowMo);




// =========================================//////////////////



const BioViewer = () => {

    const [bio, setBio] = useState('');


        useEffect(() => {
            fetchBio();
        }, []);

    const fetchBio = async () => {
        try {
            const response = await axios.get('/api/bio');
            if(response.data && response.data.data) {
                setBio(response.data.data.content)
            }
        } catch (err) {
            console.error('Erro ao buscar Biografia', err);
        }
    }

    

    return (
        <div className={styles.bio_viewer}>
            <p>{bio || "Carregando biografia..."}</p>
        </div>
        
    )


    

}

export default BioViewer;