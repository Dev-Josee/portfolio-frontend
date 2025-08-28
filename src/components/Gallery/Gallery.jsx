import React, { useState, useEffect, useLayoutEffect } from "react";
import { getPhotosByCategory } from "../../api";
import PhotoItem from "./PhotoItem";
import gsap from "gsap";
import gsap from "gsap";
import Pagination from "../common/Pagination";
import LottieScreen from "../../components/common/LoaderScreen.jsx";
import ErrorMessage from "../common/ErrorMessage";
import styles from "./Gallery.module.css";

const Gallery = ({ category, showDelete = false }) => {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [fullScreenPhoto, setFullScreenPhoto] = useState(null);




    const fetchPhotos = async (page = 1) => {
        try {
            setIsLoading(true);
            const responseData = await getPhotosByCategory(category, page, 12); //12 fotos por página

            setPhotos(responseData.photos);
            setTotalPages(responseData.totalPages);
            setCurrentPage(responseData.currentPage);
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

    const handlePhotoClick = (photoUrl) => {
        setFullScreenPhoto(photoUrl)
    };

    const handleClosedFullScreen = () => {
        setFullScreenPhoto(null);
    };



    if (error) return <ErrorMessage message={error} />;



    return (
        <div className={styles.galleryContainer}>
            {isLoading ? (
                <LottieScreen />
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
                                    onPhotoDelete={handleDeleteChange}
                                    showDelete={showDelete}
                                    onPhotoClick={() => handlePhotoClick(photo.imageUrl)}

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
            {fullScreenPhoto && (
                <div className={styles.fullScreenOverlay} onClick={handleClosedFullScreen}>
                    <img src={`${API_URL}${fullScreenPhoto}`} 
                        className={styles.fullScreenImage}
                        alt=""
                    />
                </div>
            )}
        </div>
    );



};




export default Gallery;