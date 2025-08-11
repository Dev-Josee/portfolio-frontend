import React, { useState } from "react";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./Ensaios.module.css";

const Ensaios = () => {

    const [showFilters, setShowFilters] = useState(false);
    const [filter, setFilter] = useState('all');


    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setShowFilters(false);
    }

    return (
        <div className={styles.ensaio_all} >
            <div className={styles.ensaio_page}>
                <h1 className={styles.title_ensaio}>Ensaios</h1>
                <Gallery category="ensaios"/>
            </div>
        </div>
    )
}

export default Ensaios;