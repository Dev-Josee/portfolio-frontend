import React, { useState } from "react";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./Empresa.module.css";

const Empresa = () => {

    const [showFilters, setShowFilters] = useState(false);
    const [filter, setFilter] = useState('all');


    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setShowFilters(false);
    }

    return (
        <div className={styles.empresa_all} >
            <div className={styles.empresa_page}>
                <h1 className={styles.title_empresa}>Empresarial</h1>
                <Gallery category="corporate"/>
            </div>
        </div>
    )
}

export default Empresa;