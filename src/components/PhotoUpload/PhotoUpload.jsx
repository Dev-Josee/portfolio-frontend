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
    // Corrigido: Usando estados para múltiplos arquivos
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
            const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviews(newPreviews);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Corrigido: Validação de arquivos
        if (files.length === 0) {
            setError('Por favor, selecione pelo menos uma foto.');
            return;
        }

        setIsUploading(true);
        setError(null);
        
        try {
            // Corrigido: Iterando sobre cada arquivo para upload
            for (const file of files) {
                const formDataToSend = new FormData();
                formDataToSend.append('photo', file); // 'photo' precisa corresponder ao Multer no backend
                formDataToSend.append('title', formData.title);
                formDataToSend.append('description', formData.description);
                formDataToSend.append('category', formData.category);
                
                await uploadPhoto(formDataToSend);
            }

            // Resetar formulário e estados após o upload
            setFormData({ title: '', description: '', category: 'events' });
            setFiles([]);
            setPreviews([]);
            onUpload(); // Chama o callback para atualizar a galeria
            alert('Fotos enviadas com sucesso!');
            
        } catch (err) {
            console.error('Erro no upload:', err);
            setError('Erro ao enviar as fotos. Tente novamente.');
        } finally {
            setIsUploading(false);
        }
    };
    
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
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                        disabled={isUploading}
                        required
                    />
                </div>
                {/* Corrigido: Usando `previews` para exibir a lista de pré-visualizações */}
                {previews.length > 0 && (
                    <div className={styles.previews}>
                        {previews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index}`} className={styles.previewImage} />
                        ))}
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