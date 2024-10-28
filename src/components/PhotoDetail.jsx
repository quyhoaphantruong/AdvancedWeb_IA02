// /components/PhotoDetail.js

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPhotoDetails } from '../services/unsplashService';
import '../styles/PhotoDetail.css';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotoDetails = async () => {
      try {
        const data = await fetchPhotoDetails(id);
        setPhoto(data);
      } catch (error) {
        console.error('Error loading photo details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPhotoDetails();
  }, [id]);

  if (loading) return <p className="loading-text">Loading photo details...</p>;

  if (!photo) return <p className="error-text">Photo not found.</p>;

  return (
    <div className="photo-detail-container">
      <img
        className="photo-detail-image"
        src={photo.urls.regular}
        alt={photo.alt_description || 'Unsplash Image'}
      />
      <div className="photo-detail-info">
        <h2>{photo.description || 'Untitled Photo'}</h2>
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
    </div>
  );
};

export default PhotoDetail;
