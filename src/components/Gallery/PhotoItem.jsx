import React, { useState, useLayoutEffect, useRef } from "react";
import { deletePhoto, API_URL } from "../../api";
import Button from "../common/Button";
import styles from "./Gallery.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);




const PhotoItem = ({ photo, onPhotoDelete, showDelete, onPhotoClick }) => {


   
    const [isDeleting, setIsDeleting] = useState(false);

    const photoRef = useRef();

    useLayoutEffect(() => {
        const el = photoRef.current;

        gsap.fromTo(
            el,
            {
                opacity: 0,
                y: 100,
               
                transformOrigin: "bottom center",

            },

            {
                opacity: 1,
                y: 0,
                
                duration: 1,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play reverse play reverse",
                   
                    

                },

            }
        )
    }, [])

    const handleDelete = async () => {

   
        if (window.confirm('Tem certeza que deseja excluir?')) {
            try {
                setIsDeleting(true)
                await deletePhoto(photo._id);
                onPhotoDelete(photo._id);
            } catch (err) {
                
                alert('Erro ao tentar excluir a foto');
            } finally {
                setIsDeleting(false);
            }
        }
    }


    return (
        <div className={styles.photo_item} ref={photoRef}>
            <div className={styles.photo_wrapper}>
                <img
                    src={`https://portfolio-backend-4vtp.onrender.com${photo.imageUrl}`}
                    alt={photo.title || 'Foto sem titulo'}
                    loading="lazy"
                    onClick={onPhotoClick}
                    onError={(e) => {
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