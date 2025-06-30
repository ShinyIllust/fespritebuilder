function OptionSelector({optionType, imageMini, selectedOption, setSelectedOption, options}){
    return (
          <div className='col-span-3 grid grid-cols-subgrid border-[#CDA450] border-1'>
            <div className='col-span-2 flex'>
              <img
                className='max-w-[32px] max-h-[32px]'
                src={imageMini}
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <select
                className='max-w-30 min-w-30 md:min-w-65 md:max-w-65 text-sm md:text-base'
                onChange={(e) => setSelectedOption(e.target.value)}
                value={selectedOption}>
                <option value='none'>none</option>
                {options.length > 0 ? (
                  options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                ) : (
                  <option>No {optionType}s available</option>
                )}
              </select>
            </div>
            <label className='col-span-1 text-sm md:text-base'>{optionType}</label>
          </div>
    )
}

export default OptionSelector;