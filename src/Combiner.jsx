import React, { useEffect, useRef, useState } from 'react';

function Combiner({ hairFront, headFront, hairBack, headBack, bodyFront, bodyBack, maskFront, maskBack, headX, headY, color }) {

  const canvasRef = useRef(null);

  const placeholder = {};
  placeholder.default = '/src/assets/images/mirage.png'

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
        if (!src || !src.default) {
          console.log("Invalid source:", src);
          return resolve();
        }

        const img = new Image();
        img.src = src.default;
        img.onload = () => {
          ctx.drawImage(img, x, y, img.width, img.height);
          resolve();
        };
      });
    };

    const hexToRGBA = (hex, alpha = 1.0) => {
      hex = hex.replace(/^#/, "");
      let r, g, b;

      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else {
        throw new Error("Invalid hex color format");
      }

      return { r, g, b, a: Math.round(alpha * 255) };
    };

    const loadMasks = (src, x, y, colorHex, ctx) => {
      return new Promise((resolve) => {
        if (!src || !src.default) {
          console.log("Invalid source:", src);
          return resolve();
        }

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src.default;

        img.onload = () => {
          const tempCanvas = document.createElement("canvas");
          const tempCtx = tempCanvas.getContext("2d");

          tempCanvas.width = img.width;
          tempCanvas.height = img.height;

          tempCtx.drawImage(img, 0, 0);

          const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          const data = imageData.data;
          const overlayColor = hexToRGBA(colorHex, 1.0);

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r === 0 && g === 0 && b === 0) {
              data[i + 3] = 0;
            } else if (r === 255 && g === 255 && b === 255) {
              data[i] = overlayColor.r;
              data[i + 1] = overlayColor.g;
              data[i + 2] = overlayColor.b;
              data[i + 3] = overlayColor.a;
            }
          }

          tempCtx.putImageData(imageData, 0, 0);


          ctx.globalCompositeOperation = "overlay";
          ctx.drawImage(tempCanvas, x, y);

          ctx.globalCompositeOperation = "source-over";

          resolve();
        };
      });
    };

    const drawImages = async () => {
      if(!hairFront && !bodyFront){
        loadImages(placeholder, 0, 0);
      } else {
        await loadImages(hairBack, headX, headY);
        await loadMasks(maskBack, headX, headY, color, ctx);
        await loadImages(headBack, headX, headY);
        await loadImages(bodyBack, 0, 0);
        await loadImages(hairFront, headX, headY);
        await loadMasks(maskFront, headX, headY, color, ctx);
        await loadImages(headFront, headX, headY);
        await loadImages(bodyFront, 0, 0);
      }
    }

    drawImages();
  }, [hairFront, hairBack, headFront, headBack, bodyFront, bodyBack, maskFront, maskBack, headX, headY, color]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = spriteName + '.png';

    link.click();
  };

  const downloadImageUpscale = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const upscaledCanvas = document.createElement('canvas');
    const upscaledCtx = upscaledCanvas.getContext('2d');
    upscaledCanvas.width = 128;
    upscaledCanvas.height = 128;
    upscaledCtx.imageSmoothingEnabled = false;
    upscaledCtx.drawImage(canvas, 0, 0, 32, 32, 0, 0, 128, 128);
    const imageUrl = upscaledCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = spriteName + '128x128.png';
    link.click();
  };


  const [spriteName, setSpriteName] = useState('sprite');

  return (
    <>
      <h1>Preview</h1>
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
      <div>
        <h1>Export</h1>
        <div>
          <label>Sprite Name: </label>
          <input 
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text' 
          value={spriteName} 
          onChange={(e) => setSpriteName(e.target.value)} />
        </div>
        <div>
          <button className='mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={downloadImage}>
            Download Sprite
          </button>
          <br/>
          <button className='mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={downloadImageUpscale}>
            Download Sprite (128x128)
          </button>
        </div>
      </div>
    </>
  );
}

export default Combiner;
