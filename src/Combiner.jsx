import React, { useEffect, useRef } from 'react';

function Combiner({ hairFront, headFront, hairBack, headBack, bodyFront, bodyBack, headX, headY, color }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const size = 32;
    canvas.width = size;
    canvas.height = size;

    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, size, size);

    const loadImages = (src, x, y) => {
      return new Promise((resolve) => {
        if (!src || !src.default) {  // Check if `src` is valid and has a `default` property
          console.log("Invalid source:", src);
          return resolve();
        }
    
        const img = new Image();
        img.src = src.default;  // Access the actual URL from the `default` property
        img.onload = () => {
          ctx.drawImage(img, x, y, img.width, img.height);
          resolve();
        };
      });
    };
    

    const drawImages = async () => {
      if (hairBack) await loadImages(hairBack, headX, headY);
      if (headBack) await loadImages(headBack, headX, headY);
      if (bodyBack) await loadImages(bodyBack, 0, 0);
      if (hairFront) await loadImages(hairFront, headX, headY);
      if (headFront) await loadImages(headFront, headX, headY);
      if (bodyFront) await loadImages(bodyFront, 0, 0);
    }

    drawImages();
  }, [hairFront, hairBack, headFront, headBack, bodyFront, bodyBack, headX, headY]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          imageRendering: 'pixelated',
          width: '128px',
          height: '128px',
          border: '1px solid black',
        }}
      ></canvas>
    </div>
  );
}

export default Combiner;
