import axios from 'axios';

export const API_URL =  'https://portfolio-backend-4vtp.onrender.com';

const api = axios.create({
    baseURL: API_URL,
   
});

// Biografia
export const getBio = () => api.get('/bio');
export const updateBio = (content) => api.post('/bio', { content });
export const getBioHistory = () => api.get('/bio/history');

// Fotos

export const uploadPhoto = (formData) => {
   return api.post('/photos/uploads', formData); // Axios  Content-Type automaticamente
};
export const getPhotos = (page = 1, limit = 10) => api.get(`/photos/?page=${page}&limit=${limit}`);

// função é async e usa o api
export const getPhotosByCategory = async (category, page = 1, limit = 10) => {
    try {
        const response = await api.get(`/photos/${category}?page=${page}&limit=${limit}`);
        console.log('Resposta da API:', response.data)
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar fotos:', error);
        throw error;
    }
};




export const deletePhoto = (id) => api.delete(`/api/photos/${id}`);


export default api;
