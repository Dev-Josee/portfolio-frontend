import React, { useState } from "react";
import { deletePhoto, API_URL } from "../../api";
import Button from "../common/Button";
import styles from "./Gallery.module.css";



const PhotoItem = ({ photo, onPhotoDelete, showDelete }) => {
    console.log("URL da Imagem:", photo.imageUrl);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {

        console.log("Tentando excluir a foto:", photo._id); // Adicione isso para depuração
        if (window.confirm('Tem certeza que deseja excluir?')) {
            try {
                setIsDeleting(true)
                await deletePhoto(photo._id);
                onPhotoDelete(photo._id);
            } catch (err) {
                console.error('Erro ao excluir a foto:', err)
                alert('Erro ao tentar excluir a foto');
            } finally {
                setIsDeleting(false);
            }
        }
    }
    return (
        <div className={styles.photo_item}>
            <div className={styles.photo_wrapper}>
                <img
                    src={`${API_URL}${photo.imageUrl}`}
                    alt={photo.title || 'Foto sem titulo'}
                    loading="lazy"
                    onError={(e) => { // Adicione isso
                        console.error("Erro ao carregar imagem:", e.target.src);
                    }}
                />
            </div>
                <div className={styles.photo_info}>
                    <h3>{photo.title || ''}</h3>
                    {photo.description && <p>{photo.description}</p>}
                </div>

            {showDelete && (
                <div className={styles.photo_actions}>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={isDeleting}>

                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </div>
            )}

        </div>
    )
}








export default PhotoItem;