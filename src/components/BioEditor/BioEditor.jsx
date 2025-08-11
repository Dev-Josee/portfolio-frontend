import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BioEditor.module.css";

const BioEditor = () => {

    const [bio, setBio] = useState('');
    const [editMode, setEditMode] = useState(false);


 
    useEffect(() => {
        const fetchBio = async () => {
            try {
                const response = await axios.get('/api/bio');
                if (response.data && response.data.data) {
                    setBio(response.data.data.content);
                }
            } catch (err) {
                console.error('Erro ao buscar biografia:', err);
            }
        };
    
        fetchBio();
    }, []);

  
   

    const handleSave = async () => {
        try {
            await axios.post('/api/bio', { content: bio });
            setEditMode(false)
            fetchBio();
        } catch (err) {
            console.error('Erro ao salvar biografia:', err);
        }
    };

    return (
        <div className={styles.bio_editor}>
            {editMode ? (
                <div className={styles.bio_text}>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="10"
                    />
                    <div className={styles.btns}>
                    <button className={styles.btnsave} onClick={handleSave}>Salvar</button>
                    <button className={styles.btncancel}  onClick={() => setEditMode(false)}>Cancelar</button>
                    </div>
                </div>
            ) : (

                <div className={styles.bio_atual}>
                    <p>{bio}</p>
                    <button className={styles.btnedit} onClick={() => setEditMode(true)}>Editar</button>
                </div>
            )}
        </div>
    )
}






export default BioEditor;