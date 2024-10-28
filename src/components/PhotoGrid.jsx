import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPhotos } from '../services/unsplashService';
import { motion } from 'framer-motion'; 
import '../styles/photoGrid.css';
import { debounce } from '../utilities/utilities';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const newPhotos = await fetchPhotos(page, 10);
        setPhotos((prev) => [...prev, ...newPhotos]);
        if (newPhotos.length === 0) setHasMore(false);
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    };
    loadPhotos();
  }, [page]);

  
  const loadMorePhotos = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 300),
    []
  );

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={loadMorePhotos}
      hasMore={hasMore}
      scrollThreshold={0.7}
      loader={<p>Loading...</p>}
      endMessage={<p>No more photos to load.</p>}
    >
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="photo-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
          >
            <Link to={`/photos/${photo.id}`}>
              <img src={photo.urls.small} alt={photo.alt_description || 'Photo'} />
              <p>
                Photo by{' '}
                <a href={photo.user.links.html} target="_blank" rel="noopener noreferrer">
                  {photo.user.name}
                </a>
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PhotoGrid;
