import React, { useState, useEffect } from 'react';
import Combiner from './Combiner';
import Footer from './Footer.jsx'

const loadHeadImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('_')[0];

    let type = null;
    if (file.includes('hairfront')) type = 'hairFront';
    if (file.includes('headfront')) type = 'headFront';
    if (file.includes('hairback')) type = 'hairBack';
    if (file.includes('headback')) type = 'headBack';

    let color = null;
    if (file.includes('blue')) color = 'blue';
    if (file.includes('red')) color = 'red';
    if (file.includes('green')) color = 'green';
    if (file.includes('purple')) color = 'purple';

    if (!images[baseName]) {
      images[baseName] = {};
    }

    if (color) {
      if (!images[baseName][color]) {
        images[baseName][color] = {};
      }
      images[baseName][color][type] = context[file];
    } else {
      ['blue', 'red', 'green', 'purple'].forEach((col) => {
        if (!images[baseName][col]) {
          images[baseName][col] = {};
        }
        images[baseName][col][type] = context[file];
      });
    }
  });

  return images;
};

const loadBodyImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('_')[0];

    let type = 'unknown';
    if (file.includes('front')) type = 'front';
    if (file.includes('back')) type = 'back';

    let color = 'unknown';
    if (file.includes('blue')) color = 'blue';
    if (file.includes('red')) color = 'red';
    if (file.includes('green')) color = 'green';
    if (file.includes('purple')) color = 'purple';

    if (!images[baseName]) {
      images[baseName] = {};
    }

    if (!images[baseName][color]) {
      images[baseName][color] = {};
    }

    images[baseName][color][type] = context[file];
  });

  return images;
};

const loadMaskImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('_')[0];

    let type = null;
    if (file.includes('hairfront')) type = 'hairFront';
    if (file.includes('headfront')) type = 'headFront';
    if (file.includes('hairback')) type = 'hairBack';
    if (file.includes('headback')) type = 'headBack';

    let color = null;
    if (file.includes('blue')) color = 'blue';
    if (file.includes('red')) color = 'red';
    if (file.includes('green')) color = 'green';
    if (file.includes('purple')) color = 'purple';

    if (!images[baseName]) {
      images[baseName] = {};
    }

    if (color) {
      if (!images[baseName][color]) {
        images[baseName][color] = {};
      }
      images[baseName][color][type] = context[file];
    } else {
      ['blue', 'red', 'green', 'purple'].forEach((col) => {
        if (!images[baseName][col]) {
          images[baseName][col] = {};
        }
        images[baseName][col][type] = context[file];
      });
    }

  });

  return images;
};

const loadAccessoryImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('.png')[0];

    if (!images[baseName]) {
      images[baseName] = context[file];
    }
  });

  return images;
};

const loadEarsImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('_')[0];

    let type = null;
    if (file.includes('hairfront')) type = 'earsFront';
    if (file.includes('otherfront')) type = 'earsOtherFront';
    if (file.includes('hairback')) type = 'earsBack';
    if (file.includes('otherback')) type = 'earsOtherBack';

    if (!images[baseName]) {
      images[baseName] = {};
    }

    images[baseName][type] = context[file];
  });

  return images;
};

const loadEarsMaskImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('_')[0];

    let type = null;
    if (file.includes('hairfront')) type = 'earsFront';
    if (file.includes('otherfront')) type = 'earsOtherFront';
    if (file.includes('hairback')) type = 'earsBack';
    if (file.includes('otherback')) type = 'earsOtherBack';

    if (!images[baseName]) {
      images[baseName] = {};
    }

    images[baseName][type] = context[file];
  });

  return images;
};

const loadFacialHairImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('.png')[0];

    if (!images[baseName]) {
      images[baseName] = context[file];
    }
  });

  return images;
};

const loadFacialHairMaskImages = (context) => {
  const images = {};

  Object.keys(context).forEach((file) => {
    const baseName = file.split('/').pop().split('.png')[0];

    if (!images[baseName]) {
      images[baseName] = context[file];
    }
  });

  return images;
};

const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

function ImageSelector() {
  const [headImages, setHeadImages] = useState({});
  const [bodyImages, setBodyImages] = useState({});
  const [maskImages, setMaskImages] = useState({});
  const [accessoryImages, setAccesoryImages] = useState({});
  const [earsImages, setEarsImages] = useState({});
  const [earsMaskImages, setEarsMaskImages] = useState({});
  const [facialHairImages, setFacialHairImages] = useState({});
  const [facialHairMaskImages, setFacialHairMaskImages] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headContext = import.meta.glob('./assets/images/heads/*.png', { eager: true });
    const bodyContext = import.meta.glob('./assets/images/bodies/*.png', { eager: true });
    const maskContext = import.meta.glob('./assets/images/heads/mask/*.png', { eager: true });
    const accessoryContext = import.meta.glob('./assets/images/face/*.png', { eager: true });
    const earsContext = import.meta.glob('./assets/images/ears/*.png', { eager: true });
    const earsMaskContext = import.meta.glob('./assets/images/ears/mask/*.png', { eager: true });
    const facialHairContext = import.meta.glob('./assets/images/facialhair/*.png', { eager: true });
    const facialHairMaskContext = import.meta.glob('./assets/images/facialhair/mask/*.png', { eager: true });

    const loadedHeadImages = loadHeadImages(headContext);
    const loadedBodyImages = loadBodyImages(bodyContext);
    const loadedMaskImages = loadMaskImages(maskContext);
    const loadedAccessoryImages = loadAccessoryImages(accessoryContext);
    const loadedEarsImages = loadEarsImages(earsContext);
    const loadedEarsMaskImages = loadEarsMaskImages(earsMaskContext);
    const loadedFacialHairImages = loadFacialHairImages(facialHairContext);
    const loadedFacialHairMaskImages = loadFacialHairMaskImages(facialHairMaskContext);

    setHeadImages(loadedHeadImages);
    setBodyImages(loadedBodyImages);
    setMaskImages(loadedMaskImages);
    setAccesoryImages(loadedAccessoryImages);
    setEarsImages(loadedEarsImages);
    setEarsMaskImages(loadedEarsMaskImages);
    setFacialHairImages(loadedFacialHairImages);
    setFacialHairMaskImages(loadedFacialHairMaskImages);

    setLoading(false);
  }, []);

  const headOptions = Object.keys(headImages);
  const bodyOptions = Object.keys(bodyImages);
  const accessoryOptions = Object.keys(accessoryImages);
  const earsOptions = Object.keys(earsImages);
  const facialHairOptions = Object.keys(facialHairImages);

  const [selectedHead, setSelectedHead] = useState(headOptions.length ? headOptions[0] : 'none');
  const [selectedBody, setSelectedBody] = useState(bodyOptions.length ? bodyOptions[0] : 'none');
  const [selectedArmy, setSelectedArmy] = useState('blue');
  const [selectedAccessory, setSelectedAccessory] = useState(accessoryOptions.length ? accessoryOptions[0] : 'none');
  const [selectedEars, setSelectedEars] = useState(earsOptions.length ? earsOptions[0] : 'none');
  const [selectedFacialHair, setSelectedFacialHair] = useState(facialHairOptions.length ? facialHairOptions[0] : 'none');

  const [headX, setHeadX] = useState(0);
  const [headY, setHeadY] = useState(0);
  const [accessoryX, setAccessoryX] = useState(0);
  const [accessoryY, setAccessoryY] = useState(0);
  const [earsX, setEarsX] = useState(0);
  const [earsY, setEarsY] = useState(0);
  const [facialHairX, setFacialHairX] = useState(0);
  const [facialHairY, setFacialHairY] = useState(0);

  const [color, setColor] = useState('#c0c0c0');

  const [headMini, setHeadMini] = useState('/assets/images/mirage.png');
  const [bodyMini, setBodyMini] = useState('/assets/images/mirage.png');
  const [accessoryMini, setAccessoryMini] = useState('/assets/images/mirage.png');
  const [earsMini, setEarsMini] = useState('/assets/images/mirage.png');
  const [facialHairMini, setFacialHairMini] = useState('/assets/images/mirage.png');

  useEffect(() => {
    const updateHeadMini = async () => {
      const basePath = '/assets/images/mini/head/';
      let imagePath = `${basePath}${selectedHead}.png`;
      let exists = await checkImageExists(imagePath);
      if (!exists) {
        imagePath = `${basePath}${selectedHead}_${selectedArmy}.png`;
        exists = await checkImageExists(imagePath);
        if (!exists) {
          imagePath = '/assets/images/mirage.png';
        }
      }
      setHeadMini(imagePath);
    };

    if (selectedHead) {
      updateHeadMini();
    }
  }, [selectedHead, selectedArmy]);

  useEffect(() => {
    const updateBodyMini = async () => {
      const basePath = '/assets/images/mini/body/';
      let imagePath = `${basePath}${selectedBody}.png`;
      let exists = await checkImageExists(imagePath);
      if (!exists) {
        imagePath = `${basePath}${selectedBody}_${selectedArmy}.png`;
        exists = await checkImageExists(imagePath);
        if (!exists) {
          imagePath = '/assets/images/mirage.png';
        }
      }
      setBodyMini(imagePath);
    };

    if (selectedBody) {
      updateBodyMini();
    }
  }, [selectedBody, selectedArmy]);

  useEffect(() => {
    const updateAccessoryMini = async () => {
      const basePath = '/assets/images/mini/face/';
      let imagePath = `${basePath}${selectedAccessory}.png`;
      let exists = await checkImageExists(imagePath);
      if (!exists) {
        imagePath = `${basePath}${selectedAccessory}_${selectedArmy}.png`;
        exists = await checkImageExists(imagePath);
        if (!exists) {
          imagePath = '/assets/images/mirage.png';
        }
      }
      setAccessoryMini(imagePath);
    };

    if (selectedAccessory) {
      updateAccessoryMini();
    }
  }, [selectedAccessory, selectedArmy]);

  useEffect(() => {
    const updateEarsMini = async () => {
      const basePath = '/assets/images/mini/ears/';
      let imagePath = `${basePath}${selectedEars}.png`;
      let exists = await checkImageExists(imagePath);
      if (!exists) {
        imagePath = `${basePath}${selectedEars}_${selectedArmy}.png`;
        exists = await checkImageExists(imagePath);
        if (!exists) {
          imagePath = '/assets/images/mirage.png';
        }
      }
      setEarsMini(imagePath);
    };

    if (selectedEars) {
      updateEarsMini();
    }
  }, [selectedEars, selectedArmy]);

  useEffect(() => {
    const updateFacialHairMini = async () => {
      const basePath = '/assets/images/mini/facialhair/';
      let imagePath = `${basePath}${selectedFacialHair}.png`;
      let exists = await checkImageExists(imagePath);
      if (!exists) {
        imagePath = `${basePath}${selectedFacialHair}_${selectedArmy}.png`;
        exists = await checkImageExists(imagePath);
        if (!exists) {
          imagePath = '/assets/images/mirage.png';
        }
      }
      setFacialHairMini(imagePath);
    };

    if (selectedFacialHair) {
      updateFacialHairMini();
    }
  }, [selectedFacialHair, selectedArmy]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-5 grid grid-cols-4 md:grid-cols-10 gap-0 md:gap-2 text-sm md:text-base'>
      <div className='bg-[#CDA450] col-span-4 md:col-start-4 grid grid-cols-subgrid p-0 md:p-3'>
        <Combiner
          hairFront={headImages[selectedHead]?.[selectedArmy]?.hairFront}
          headFront={headImages[selectedHead]?.[selectedArmy]?.headFront}
          hairBack={headImages[selectedHead]?.[selectedArmy]?.hairBack}
          headBack={headImages[selectedHead]?.[selectedArmy]?.headBack}
          bodyFront={bodyImages[selectedBody]?.[selectedArmy]?.front}
          bodyBack={bodyImages[selectedBody]?.[selectedArmy]?.back}
          maskFront={maskImages[selectedHead]?.[selectedArmy]?.hairFront}
          maskBack={maskImages[selectedHead]?.[selectedArmy]?.hairBack}
          accessory={accessoryImages[selectedAccessory]}
          earsFront={earsImages[selectedEars]?.earsFront}
          earsBack={earsImages[selectedEars]?.earsBack}
          earsOtherFront={earsImages[selectedEars]?.earsOtherFront}
          earsOtherBack={earsImages[selectedEars]?.earsOtherBack}
          earsMaskFront={earsMaskImages[selectedEars]?.earsFront}
          earsMaskback={earsMaskImages[selectedEars]?.earsBack}
          facialHair={facialHairImages[selectedFacialHair]}
          facialHairMask={facialHairMaskImages[selectedFacialHair]}
          headX={headX}
          headY={headY}
          accessoryX={accessoryX}
          accessoryY={accessoryY}
          earsX={earsX}
          earsY={earsY}
          facialHairX={facialHairX}
          facialHairY={facialHairY}
          color={color}
        />

        <div className='col-span-1 bg-[#F1DCA8] rounded-lg w-full'>
          <div className='bg-[#402C0E] p-1 w-full rounded-t-lg text-[#EBA92C] text-center'>
            <label className='textShadow'>Hair Color </label>
          </div>
          <input className='w-full' type='color' value={color} onChange={(e) => setColor(e.target.value)} />
          <input
            className='w-full text-center'
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className='col-span-3 grid grid-cols-subgrid bg-[#F1DCA8] mt-1 rounded-lg'>
          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img
                className='max-w-[32px] max-h-[32px]'
                src={headMini}
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <select
                className='max-w-30 min-w-30 md:min-w-65 md:max-w-65 text-sm md:text-base'
                onChange={(e) => setSelectedHead(e.target.value)}
                value={selectedHead}>
                <option value='none'>none</option>
                {headOptions.length > 0 ? (
                  headOptions.map((head) => (
                    <option key={head} value={head}>
                      {head}
                    </option>
                  ))
                ) : (
                  <option>No heads available</option>
                )}
              </select>
            </div>
            <label className='col-span-1 text-sm md:text-base'>Head</label>
          </div>

          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img
                className='max-w-[32px] max-h-[32px]'
                src={bodyMini}
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <select
                className='max-w-30 min-w-30 md:min-w-65 md:max-w-65 text-sm md:text-base'
                onChange={(e) => setSelectedBody(e.target.value)}
                value={selectedBody}>
                <option value='none'>none</option>
                {bodyOptions.length > 0 ? (
                  bodyOptions.map((body) => (
                    <option key={body} value={body}>
                      {body}
                    </option>
                  ))
                ) : (
                  <option>No bodies available</option>
                )}
              </select>
            </div>
            <label className='col-span-1 text-sm md:text-base'>Body</label>
          </div>
          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img className='max-w-[32px] max-h-[32px]' src={accessoryMini} />
              <select
                className='max-w-30 min-w-30 md:min-w-65 md:max-w-65 text-sm md:text-base'
                onChange={(e) => setSelectedAccessory(e.target.value)}
                value={selectedAccessory}>
                <option value='none'>none</option>
                {accessoryOptions.length > 0 ? (
                  accessoryOptions.map((accessory) => (
                    <option key={accessory} value={accessory}>
                      {accessory}
                    </option>
                  ))
                ) : (
                  <option>No accessories available</option>
                )}
              </select>
            </div>
            <label className='col-span-1 text-sm md:text-base'>Extra</label>
          </div>
          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img
                className='max-w-[32px] max-h-[32px]'
                src={earsMini}
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <select
                className='max-w-30 min-w-30 md:min-w-65 md:max-w-65 text-sm md:text-base'
                onChange={(e) => setSelectedEars(e.target.value)}
                value={selectedEars}>
                <option value='none'>none</option>
                {earsOptions.length > 0 ? (
                  earsOptions.map((ears) => (
                    <option key={ears} value={ears}>
                      {ears}
                    </option>
                  ))
                ) : (
                  <option>No ears available</option>
                )}
              </select>
            </div>
            <label className='col-span-1 text-sm md:text-base'>Ears</label>
          </div>
          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img
                className='max-w-[32px] max-h-[32px]'
                src={facialHairMini}
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <select
                className='max-w-30 min-w-30 md:min-w-65 md:max-w-65 text-sm md:text-base'
                onChange={(e) => setSelectedFacialHair(e.target.value)}
                value={selectedFacialHair}>
                <option value='none'>none</option>
                {facialHairOptions.length > 0 ? (
                  facialHairOptions.map((facialHair) => (
                    <option key={facialHair} value={facialHair}>
                      {facialHair}
                    </option>
                  ))
                ) : (
                  <option>No facial hair available</option>
                )}
              </select>
            </div>
            <label className='col-span-1 text-sm md:text-base'>Facial Hair</label>
          </div>
        </div>

        <div className='col-span-1 grid grid-cols-subgrid bg-[#F1DCA8] rounded-lg w-full mt-1 h-25 md:h-20'>
          <div className='bg-[#402C0E] p-1 w-full rounded-t-lg text-[#EBA92C] text-center'>
            <label className='col-span-1 textShadow'>Select Army</label>
          </div>
          <select
            className='col-span-1 w-20 md:w-40'
            onChange={(e) => setSelectedArmy(e.target.value)}>
            <option value={'blue'}>Blue</option>
            <option value={'green'}>Green</option>
            <option value={'red'}>Red</option>
            <option value={'purple'}>Purple (Fates Only)</option>
          </select>
        </div>

        {selectedHead != 'none' && (
          <div className='col-span-2 grid grid-cols-subgrid gap-0'>
            <div className='bg-[#F1DCA8] rounded-l-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tl-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Head X </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setHeadX(headX - 1)}
                >←</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setHeadX(headX + 1)}
                >→</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={headX}
                  onChange={(e) => setHeadX(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
            <div className='bg-[#F1DCA8] rounded-r-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tr-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Head Y </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setHeadY(headY - 1)}
                >↑</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setHeadY(headY + 1)}
                >↓</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={headY}
                  onChange={(e) => setHeadY(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
          </div>
        )}

        {selectedAccessory != 'none' && (
          <div className='col-span-2 grid grid-cols-subgrid gap-0'>
            <div className='bg-[#F1DCA8] rounded-l-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tl-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Extra X </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setAccessoryX(accessoryX - 1)}
                >←</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setAccessoryX(accessoryX + 1)}
                >→</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={accessoryX}
                  onChange={(e) => setAccessoryX(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
            <div className='bg-[#F1DCA8] rounded-r-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tr-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Extra Y </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setAccessoryY(accessoryY - 1)}
                >↑</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setAccessoryY(accessoryY + 1)}
                >↓</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={accessoryY}
                  onChange={(e) => setAccessoryY(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
          </div>
        )}

        {selectedEars != 'none' && (
          <div className='col-span-2 grid grid-cols-subgrid gap-0'>
            <div className='bg-[#F1DCA8] rounded-l-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tl-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Ears X </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setEarsX(earsX - 1)}
                >←</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setEarsX(earsX + 1)}
                >→</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={earsX}
                  onChange={(e) => setEarsX(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
            <div className='bg-[#F1DCA8] rounded-r-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tr-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Ears Y </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setEarsY(earsY - 1)}
                >↑</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setEarsY(earsY + 1)}
                >↓</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={earsY}
                  onChange={(e) => setEarsY(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
          </div>
        )}

        {selectedFacialHair != 'none' && (
          <div className='col-span-2 grid grid-cols-subgrid gap-0'>
            <div className='bg-[#F1DCA8] rounded-l-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tl-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Facial Hair X </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setFacialHairX(facialHairX - 1)}
                >←</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setFacialHairX(facialHairX + 1)}
                >→</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={facialHairX}
                  onChange={(e) => setFacialHairX(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
            <div className='bg-[#F1DCA8] rounded-r-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tr-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>Facial Hair Y </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setFacialHairY(facialHairY - 1)}
                >↑</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setFacialHairY(facialHairY + 1)}
                >↓</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={facialHairY}
                  onChange={(e) => setFacialHairY(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div >
  );
}

export default ImageSelector;
