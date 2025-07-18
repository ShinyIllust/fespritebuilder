import React, { useState, useEffect } from 'react';
import Combiner from './Combiner';
import Footer from './Footer.jsx'
import AdjustPosition from './AdjustPosition.jsx';
import OptionSelector from './OptionSelector.jsx';

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

          <OptionSelector optionType="Head" imageMini={headMini} selectedOption={selectedHead} setSelectedOption={setSelectedHead} options={headOptions} />
          <OptionSelector optionType="Body" imageMini={bodyMini} selectedOption={selectedBody} setSelectedOption={setSelectedBody} options={bodyOptions} />
          <OptionSelector optionType="Extra" imageMini={accessoryMini} selectedOption={selectedAccessory} setSelectedOption={setSelectedAccessory} options={accessoryOptions} />
          <OptionSelector optionType="Ears" imageMini={earsMini} selectedOption={selectedEars} setSelectedOption={setSelectedEars} options={earsOptions} />
          <OptionSelector optionType="Facial Hair" imageMini={facialHairMini} selectedOption={selectedFacialHair} setSelectedOption={setSelectedFacialHair} options={facialHairOptions} />
          
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
          <AdjustPosition adjustType="Head" valueX={headX} valueY={headY} setX={setHeadX} setY={setHeadY} />
        )}

        {selectedAccessory != 'none' && (
          <AdjustPosition adjustType="Extra" valueX={accessoryX} valueY={accessoryY} setX={setAccessoryX} setY={setAccessoryY} />
        )}

        {selectedEars != 'none' && (
          <AdjustPosition adjustType="Ears" valueX={earsX} valueY={earsY} setX={setEarsX} setY={setEarsY} />
        )}

        {selectedFacialHair != 'none' && (
          <AdjustPosition adjustType="Facial Hair" valueX={facialHairX} valueY={facialHairY} setX={setFacialHairX} setY={setFacialHairY} />
        )}

        <Footer />
      </div>
    </div >
  );
}

export default ImageSelector;
