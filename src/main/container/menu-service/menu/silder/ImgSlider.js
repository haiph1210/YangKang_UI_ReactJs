import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const ImageSlider = ({ imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (imageUrls === null) {
      return; 
    }
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= imageUrls.length ? 0 : nextIndex;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [imageUrls]);

  return (
    <div>
       <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${imageUrls[currentImageIndex]}`}
            alt={`Image ${currentImageIndex + 1}`}
            height="270px"
          />
    </div>
  );
};

export default ImageSlider;