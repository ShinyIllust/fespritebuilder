import React, { useEffect, useRef, useState } from 'react';

function Combiner({ hairFront, headFront, hairBack, headBack, bodyFront, bodyBack, maskFront, maskBack, accessory, earsFront, earsBack, earsOtherFront, earsOtherBack, earsMaskFront, earsMaskBack, headX, headY, accessoryX, accessoryY, earsX, earsY, color }) {

  const canvasRef = useRef(null);

  const placeholder = {};
  placeholder.default = '/assets/images/mirage.png'

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
      if (!hairFront && !bodyFront) {
        loadImages(placeholder, 0, 0);
      } else {
        await loadImages(hairBack, headX, headY);
        await loadMasks(maskBack, headX, headY, color, ctx);
        await loadImages(headBack, headX, headY);
        await loadImages(earsBack, earsX, earsY);
        await loadMasks(earsMaskBack, earsX, earsY, color, ctx);
        await loadImages(earsOtherBack, earsX, earsY);
        await loadImages(bodyBack, 0, 0);
        await loadImages(hairFront, headX, headY);
        await loadMasks(maskFront, headX, headY, color, ctx);
        await loadImages(headFront, headX, headY);
        await loadImages(earsFront, earsX, earsY);
        await loadMasks(earsMaskFront, earsX, earsY, color, ctx);
        await loadImages(earsOtherFront, earsX, earsY);
        await loadImages(accessory, accessoryX, accessoryY);
        await loadImages(bodyFront, 0, 0);
      }
    }

    drawImages();
  }, [hairFront, hairBack, headFront, headBack, bodyFront, bodyBack, maskFront, maskBack, accessory, earsFront, earsBack, earsOtherFront, earsOtherBack, earsMaskFront, earsMaskBack, headX, headY, accessoryX, accessoryY, earsX, earsY, color]);

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
    <div className='col-span-3 grid grid-cols-subgrid'>
      <div className='max-w-[70px] lg:max-w-[134px] min-w-[70px] lg:min-h-[134px] max-h-[70px] lg:max-h-[134px] min-h-[70px] lg:min-h-[134px] border-6 border-[#652200] rounded-lg col-span-1 m-auto lg:m-0'>
        <canvas
        className='w-[64px] lg:w-[128px] h-[64px] lg:h-[128px]'
          ref={canvasRef}
          style={{
            imageRendering: 'pixelated',
          }}
        ></canvas>
      </div>
      <div className='col-span-2'>
        <div className='flex justify-around rounded-xl bg-[#131F42] text-[#FBEEBC] text-sm lg:text-base'>
          <label className='m-auto'>Name:</label>
          <input
            className='max-w-30 lg:max-w-60'
            type='text'
            value={spriteName}
            onChange={(e) => setSpriteName(e.target.value)} />
        </div>
        <div className='m-auto mt-1'>
          <button
            className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer w-40 lg:w-60 border-1 border-[#CDA450] text-sm lg:text-base p-1 rounded-t-lg'
            onClick={downloadImage}>
            Download Sprite
          </button>
          <button
            className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer w-40 lg:w-60 border-1 border-[#CDA450] text-sm lg:text-base p-1 rounded-b-lg'
            onClick={downloadImageUpscale}>
            Download Sprite (128x128)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Combiner;
