import React, { useState, useEffect } from 'react';
import Combiner from './Combiner';

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
}

function ImageSelector() {
  const [headImages, setHeadImages] = useState({});
  const [bodyImages, setBodyImages] = useState({});
  const [maskImages, setMaskImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headContext = import.meta.glob('./assets/images/heads/*.png', { eager: true });
    const bodyContext = import.meta.glob('./assets/images/bodies/*.png', { eager: true });
    const maskContext = import.meta.glob('./assets/images/heads/mask/*.png', { eager: true });

    const loadedHeadImages = loadHeadImages(headContext);
    const loadedBodyImages = loadBodyImages(bodyContext);
    const loadedMaskImages = loadMaskImages(maskContext);

    setHeadImages(loadedHeadImages);
    setBodyImages(loadedBodyImages);
    setMaskImages(loadedMaskImages);

    setLoading(false);
  }, []);

  const headOptions = Object.keys(headImages);
  const bodyOptions = Object.keys(bodyImages);

  const [selectedHead, setSelectedHead] = useState(headOptions.length ? headOptions[0] : '');
  const [selectedBody, setSelectedBody] = useState(bodyOptions.length ? bodyOptions[0] : '');
  const [selectedArmy, setSelectedArmy] = useState('blue');
  const [headX, setHeadX] = useState(0);
  const [headY, setHeadY] = useState(0);
  const [color, setColor] = useState('#c0c0c0');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-5 grid grid-cols-4 lg:grid-cols-10 gap-0 lg:gap-2'>
      <div className='bg-[#CDA450] col-span-4 lg:col-start-4 grid grid-cols-subgrid p-3'>
        <Combiner
          hairFront={headImages[selectedHead]?.[selectedArmy]?.hairFront}
          headFront={headImages[selectedHead]?.[selectedArmy]?.headFront}
          hairBack={headImages[selectedHead]?.[selectedArmy]?.hairBack}
          headBack={headImages[selectedHead]?.[selectedArmy]?.headBack}
          bodyFront={bodyImages[selectedBody]?.[selectedArmy]?.front}
          bodyBack={bodyImages[selectedBody]?.[selectedArmy]?.back}
          maskFront={maskImages[selectedHead]?.[selectedArmy]?.hairFront}
          maskBack={maskImages[selectedHead]?.[selectedArmy]?.hairBack}
          headX={headX}
          headY={headY}
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
              <img className='max-w-[32px] max-h-[32px]' src='/assets/images/mirage.png' />
              <select
                className='max-w-30 min-w-30 lg:min-w-85 lg:max-w-85 text-sm lg:text-base'
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
            <label className='col-span-1 text-sm lg:text-base'>Head</label>
          </div>

          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img className='max-w-[32px] max-h-[32px]' src='/assets/images/mirage.png' />
              <select
                className='max-w-30 min-w-30 lg:min-w-85 lg:max-w-85 text-sm lg:text-base'
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
            <label className='col-span-1 text-sm lg:text-base'>Body</label>
          </div>
          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img className='max-w-[32px] max-h-[32px]' src='/assets/images/mirage.png' />
              <select
                className='max-w-30 min-w-30 lg:min-w-85 lg:max-w-85 text-sm lg:text-base'>
                <option>No accessories available</option>
              </select>
            </div>
            <label className='col-span-1 text-sm lg:text-base'>Extra 1</label>
          </div>
          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img className='max-w-[32px] max-h-[32px]' src='/assets/images/mirage.png' />
              <select
                className='max-w-30 min-w-30 lg:min-w-85 lg:max-w-85 text-sm lg:text-base'>
                <option>No accessories available</option>
              </select>
            </div>
            <label className='col-span-1 text-sm lg:text-base'>Extra 2</label>
          </div>
        </div>
        <div className='col-span-1 grid grid-cols-subgrid bg-[#F1DCA8] rounded-lg w-full mt-1 h-25 lg:h-20'>
          <div className='bg-[#402C0E] p-1 w-full rounded-t-lg text-[#EBA92C] text-center'>
            <label className='col-span-1 textShadow'>Select Army</label>
          </div>
          <select
            className='col-span-1 w-30'
            onChange={(e) => setSelectedArmy(e.target.value)}>
            <option value={'blue'}>Blue</option>
            <option value={'green'}>Green</option>
            <option value={'red'}>Red</option>
            <option value={'purple'}>Purple</option>
          </select>
        </div>

        <div className='col-span-2 col-start-3'>
          <div className='bg-[#F1DCA8] rounded-lg w-full mt-1'>
            <div className='bg-[#402C0E] p-1 w-full rounded-t-lg text-[#EBA92C] text-center'>
              <label className='textShadow'>Head X </label>
              <span className='textShadow'>{headX}px</span>
            </div>
            <input
              className='w-full'
              type='range'
              min={-32}
              max={32}
              value={headX}
              onChange={(e) => setHeadX(parseInt(e.target.value))} />
          </div>
          <div className='bg-[#F1DCA8] rounded-lg w-full mt-1'>
            <div className='bg-[#402C0E] p-1 w-full rounded-t-lg text-[#EBA92C] text-center'>
              <label className='textShadow'>Head Y </label>
              <span className='textShadow'>{headY}px</span>
            </div>
            <input
              className='w-full'
              type='range'
              min={-32}
              max={32}
              value={headY}
              onChange={(e) => setHeadY(parseInt(e.target.value))} />
          </div>
        </div>
      </div>
    </div >
  );
}

export default ImageSelector;
