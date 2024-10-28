// /components/PhotoGrid.js
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPhotos } from '../services/unsplashService';
import '../styles/photoGrid.css';

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

  const loadMorePhotos = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={loadMorePhotos}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
      endMessage={<p>No more photos to load.</p>}
    >
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <Link to={`/photos/${photo.id}`}>
              <img src={photo.urls.small} alt={photo.alt_description || 'Photo'} />
              <p>
                Photo by{' '}
                <a href={photo.user.links.html} target="_blank" rel="noopener noreferrer">
                  {photo.user.name}
                </a>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PhotoGrid;
