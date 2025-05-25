import React, {useState} from "react";
import Gallery from '../../components/Gallery/Gallery';
import styles from './Events.module.css';

const Events = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [filter, setFilter]  = useState('all');


    const handleFilterChange = (newFilter)  => {
        setFilter(newFilter);
        setShowFilters(false);
    };

    return(
        <div className={styles.events_page}>
            <div className={styles.events_page_header}>
                <h1>Eventos</h1> 
                <Gallery category="events"/>               
            </div>
            
        </div>
    )
}


export default Events;