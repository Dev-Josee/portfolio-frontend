import React, { useState } from "react";
import { deletePhoto } from "../../api";
import Button from "../common/Button";
import styles from "./Gallery.module.css";

const PhotoItem = ({ photo, onhandleDeleteChange }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            try {
                setIsDeleting(true)
                await deletePhoto(photo._id);
                onhandleDeleteChange(photo._id);
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
                    src={photo.imageUrl}
                    alt={photo.title || 'Foto sem titulo'}
                    loading="lazy"
                />
                <div className={styles.photo_info}>
                    <h2>{photo.title || 'Sem título'}</h2>
                    {photo.description && <p>{photo.description}</p>}
                </div>
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