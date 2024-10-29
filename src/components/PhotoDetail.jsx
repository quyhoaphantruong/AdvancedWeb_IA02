import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPhotoDetails } from '../services/unsplashService';
import { motion } from 'framer-motion'; 
import '../styles/PhotoDetail.css';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadPhotoDetails = async () => {
      try {
        const data = await fetchPhotoDetails(id);
        setPhoto(data);
      } catch (error) {
        console.error('Error loading photo details:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadPhotoDetails();
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <motion.p
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading photo details...
      </motion.p>
    );
  }

  // Handle error state
  if (error || !photo) {
    return (
      <motion.div
        className="error-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="error-text">Photo not found or an error occurred.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back to Gallery
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="photo-detail-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        className="photo-detail-image"
        src={photo.urls.regular}
        alt={photo.alt_description || 'Unsplash Image'}
      />
      <div className="photo-detail-info">
        <h2>Description: {photo.description || 'No description'}</h2>
        <p>
          <strong>Author:</strong> {photo.user.name}
        </p>
        <p>
          <strong>Likes:</strong> {photo.likes}
        </p>
        <Link to="/photos" className="back-button">
          &larr; Back to Gallery
        </Link>
      </div>
    </motion.div>
  );
};

export default PhotoDetail;
