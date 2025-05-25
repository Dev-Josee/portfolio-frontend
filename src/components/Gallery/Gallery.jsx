import React, { useState, useEffect } from "react";
import { getPhotosByCategory } from "../../api";
import PhotoItem from "./PhotoItem";
import Pagination from "../common/Pagination";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import styles from "./Gallery.module.css";

const Gallery = ({ category, showDelete = false }) => {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPhotos = async (page = 1) => {
        try {
            setIsLoading(true);
            const { data } = await getPhotosByCategory(category, page, 12); //12 fotos por página

            setPhotos(data.photos);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setError('');



        } catch (error) {
            setError('Erro ao carregar fotos, Tente novamente');
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };

  useEffect(() => {
    if (category) {
        fetchPhotos(currentPage);
    }
}, [category, currentPage]);


    const handlePageChange = (page) => {
        setCurrentPage(page);

    }


    const handleDeleteChange = (deletedPhotoId) => {
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo._id !== deletedPhotoId));
};

    if (isLoading) return <Loader />
    if (error) return <ErrorMessage message={error} />;


    returnreturn (
    <div className={styles.galleryContainer}>
        {isLoading ? (
            <Loader />
        ) : error ? (
            <ErrorMessage message={error} />
        ) : (
            photos.length === 0 ? (
                <div className={styles.noPhotos}>
                    <p>Não há fotos para exibir</p>
                </div>
            ) : (
                <>
                    <div className={styles.photoGrid}>
                        {photos.map((photo) => (
                            <PhotoItem
                                key={photo._id}
                                photo={photo}
                                handleDeleteChange={handleDeleteChange}
                                showDelete={showDelete}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </>
            )
        )}
    </div>
);



};




export default Gallery;