import "../styles/skeleton.css"

const Skeleton = ({ count }) => {
    const skeletons = Array(count).fill(0);
    return (
      <div className="skeleton-grid">
        {skeletons.map((_, index) => (
          <div key={index} className="skeleton-card"></div>
        ))}
      </div>
    );
  };
  
  export default Skeleton;
  