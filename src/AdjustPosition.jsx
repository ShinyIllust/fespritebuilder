function AdjustPosition({adjustType, valueX, valueY, setX, setY}){
    return (
        <div className='col-span-2 grid grid-cols-subgrid gap-0'>
            <div className='bg-[#F1DCA8] rounded-l-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tl-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>{adjustType} X </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setX(valueX - 1)}
                >←</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setX(valueX + 1)}
                >→</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={valueX}
                  onChange={(e) => setX(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
            <div className='bg-[#F1DCA8] rounded-r-lg w-full mt-1 grid grid-cols-subgrid'>
              <div className='bg-[#402C0E] p-1 w-full rounded-tr-lg text-[#EBA92C] text-center'>
                <label className='textShadow'>{adjustType} Y </label>
              </div>
              <div className='flex justify-around'>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setY(valueY - 1)}
                >↑</button>
                <button
                  className='textShadow text-left bg-[#2C2B1E] text-[#EBA92C] hover:cursor-pointer text-sm md:text-base p-1 rounded-sm m-1 w-10 flex justify-center'
                  onClick={() => setY(valueY + 1)}
                >↓</button>
              </div>
              <div>
                <input
                  className='w-6 md:w-25 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  type='number'
                  value={valueY}
                  onChange={(e) => setY(parseInt(e.target.value))}
                /><span className=''>px</span>
              </div>
            </div>
          </div>
    )
}
export default AdjustPosition;