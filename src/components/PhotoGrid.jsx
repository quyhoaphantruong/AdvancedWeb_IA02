import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchPhotos } from '../services/unsplashService';
import { motion } from 'framer-motion';
import '../styles/photoGrid.css';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(); 

  const loadPhotos = useCallback(async () => {
    try {
      const newPhotos = await fetchPhotos(page, 10); 
      setPhotos((prev) => [...prev, ...newPhotos]);

      if (newPhotos.length === 0) setHasMore(false);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }, [page]);

  const lastPhotoElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect(); 

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log('Fetching more photos...');
            setPage((prevPage) => prevPage + 1); 
          }
        },
        { rootMargin: '200px' }
      );

      if (node) observer.current.observe(node); 
    },
    [hasMore]
  );

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos, page]);

  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          className="photo-card"
          ref={index === photos.length - 1 ? lastPhotoElementRef : null}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02, duration: 0.3 }}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
        >
          <Link to={`/photos/${photo.id}`}>
            <img
              src={photo.urls.small}
              alt={photo.alt_description || 'Photo'}
              loading="lazy"
            />
            <p>
              Photo by{' '}
              <a href={photo.user.links.html} target="_blank" rel="noopener noreferrer">
                {photo.user.name}
              </a>
            </p>
          </Link>
        </motion.div>
      ))}
      {!hasMore && <p>No more photos to load.</p>}
    </div>
  );
};

export default PhotoGrid;
