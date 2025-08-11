// PhotoUpload.jsx
import React, { useState } from 'react';
import { uploadPhoto } from '../../api';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import Loader from '../common/LoaderScreen';
import styles from './PhotoUpload.module.css';

const PhotoUpload = ({ onUpload }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'events'
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Arquivo selecionado:', file);
    console.log('Dados do formulário:', formData);

        if (!file) {
            setError('Por favor, selecione uma imagem');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('photo', file);

        try {
            setIsUploading(true);
            setError('');
            await uploadPhoto(formDataToSend);
            alert('Foto enviada com sucesso!');
            onUpload(); // Chama a função de callback após o upload
            // Reset form
            setFormData({ title: '', description: '', category: 'events' });
            setFile(null);
            setPreview('');
            e.target.reset();
        } catch (err) {
            setError('Erro ao enviar foto. Tente novamente.');
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className={styles.photo_upload}>
            <h3>Adicionar Nova Foto</h3>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={isUploading}
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isUploading}
                        rows="3"
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Categoria:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={isUploading}
                    >
                        <option value="events">Eventos</option>
                        <option value="ensaios">Ensaios</option>
                        
                    </select>
                </div>
                <div className={styles.form_group}>
                    <label>Imagem:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        accept="image/*"
                        disabled={isUploading}
                        required
                    />
                </div>
                {preview && (
                    <div className={styles.preview}>
                        <img src={preview} alt="Preview" />
                    </div>
                )}
                {isUploading ? (
                    <Loader />
                ) : (
                    <Button className={styles.btnsend} type="submit" disabled={isUploading}>Enviar</Button>
                )}
            </form>
        </div>
    );
};

export default PhotoUpload;
