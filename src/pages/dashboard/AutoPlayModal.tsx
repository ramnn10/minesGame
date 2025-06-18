import React, { useState } from 'react';

interface AutoPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AutoPlayModal: React.FC<AutoPlayModalProps> = ({ isOpen, onClose }) => {

  const [lostOption, setLostOption] = useState<'return' | 'increase' | 'decrease'>('return');
  const [winOption, setWinOption] = useState<'return' | 'increase' | 'decrease'>('return');
  const [increaseBy, setIncreaseBy] = useState<string>('0');
  const [decreaseBy, setDecreaseBy] = useState<string>('0');

  const [selectedRounds, setSelectedRounds] = useState<number>(3);
  const [stopIfDecrease, setStopIfDecrease] = useState<string>('0.00');
  const [stopIfWinExceeds, setStopIfWinExceeds] = useState<string>('0.00');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  const [isDecreaseEnabled, setIsDecreaseEnabled] = useState(false);
  const [isWinExceedsEnabled, setIsWinExceedsEnabled] = useState(false);

  const [isIncreraseEnabled, setIsIncreraseEnabled] = useState(false);
  const [stopIfIncrease, setStopIfIncrease] = useState<string>('0.00');


  if (!isOpen) return null;

  const roundOptions = [3, 10, 25, 100, 200, 500];

  const handleOptionChange = (section: 'lost' | 'win', option: 'return' | 'increase' | 'decrease') => {
    if (section === 'lost') {
      setLostOption(option);
    } else {
      setWinOption(option);
    }
  };

  const isActive = (section: 'lost' | 'win', option: string) => {
    return (section === 'lost' && lostOption === option) ||
      (section === 'win' && winOption === option);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full scrollbar-hide bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-lg bg-[#212226] rounded-lg shadow-xl text-white h-full overflow-y-auto scroll-hide">
        <div className="px-3 py-1.5 border-b border-gray-700">
          <div className='flex justify-between items-center'>
            <h3 className="font-[400] text-[15px]">AUTO PLAY</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="py-4 px-2 ">
          <div className="mb-4 bg-[#1A1B1E] p-2">
            <label className="block text-[13px] text-gray-400 font-[400] mb-2 text-center">Number of rounds</label>
            <div className="grid grid-cols-2 gap-2">
              {roundOptions?.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedRounds(option)}
                  className={`py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between gap-2 font-[400] text-[14px] ${selectedRounds === option
                    ? 'bg-[#3a404a] text-white'
                    : 'bg-[#2d3138] hover:bg-[#3a404a]'
                    }`}
                >
                  {selectedRounds === option ? (
                    <span className="w-[10px] h-[10px] rounded-full bg-[#5BA100]"></span>
                  ) : (
                    <span className="w-[10px] h-[10px] rounded-full border border-gray-500"></span>
                  )}
                  {option}
                  <div></div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between items-center bg-[#2d3138] p-2 rounded-md">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDecreaseEnabled}
                    onChange={() => setIsDecreaseEnabled(!isDecreaseEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                <span className="text-gray-300 text-[13px]">Stop if cash decreases by</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={stopIfDecrease}
                  onChange={(e) => setStopIfDecrease(e.target.value)}
                  className={`w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right ${!isDecreaseEnabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  placeholder="0.00"
                  disabled={!isDecreaseEnabled}
                />
              </div>
            </div>
            <div className="flex justify-between items-center bg-[#2d3138] p-2 rounded-md">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWinExceedsEnabled}
                    onChange={() => setIsWinExceedsEnabled(!isWinExceedsEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                <span className="text-gray-300">Stop if single win exceeds</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={stopIfWinExceeds}
                  onChange={(e) => setStopIfWinExceeds(e.target.value)}
                  className={`w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right ${!isWinExceedsEnabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  placeholder="0.00"
                  disabled={!isWinExceedsEnabled}
                />
              </div>
            </div>
          </div>

          <div className="my-3 flex justify-center items-center">
            <button
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="text-white text-[12px] text-sm font-[400] bg-[#393b3f] px-3 py-1.5 rounded-[12px]"
            >
              More options {showMoreOptions ? '▲' : '▼'}
            </button>
          </div>

          {showMoreOptions && (
            <div className="mt-2 space-y-3 text-sm">
              <div className="flex justify-between items-center bg-[#2d3138] p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isIncreraseEnabled}
                      onChange={() => setIsIncreraseEnabled(!isIncreraseEnabled)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                  <span className="text-gray-300 text-[13px]">Stop if cash increase by</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={stopIfIncrease}
                    onChange={(e) => setStopIfIncrease(e.target.value)}
                    className={`w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right ${!isIncreraseEnabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    placeholder="0.00"
                    disabled={!isIncreraseEnabled}
                  />
                </div>
              </div>

              <div className="mt-2 space-y-3 text-sm">
                {/* If I lost section */}
                <div className="bg-[#1A1B1E] p-3 rounded-md">
                  <h3 className="text-gray-300 mb-2 text-center">If I lost</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleOptionChange('lost', 'return')}
                      className={`flex justify-between items-center w-full p-2 rounded-lg ${lostOption === 'return' ? 'bg-[#555961]' : 'bg-[#393B3F]'}`}
                    >
                      <span className={`w-[10px] h-[10px] rounded-full ${isActive('lost', 'return') ? 'bg-[#5BA100]' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300 text-[13px]">Return to initial bet</span>
                      <span></span>
                    </button>

                    <div className='grid grid-cols-2 gap-2'>
                      <button
                        onClick={() => handleOptionChange('lost', 'increase')}
                        className={`flex justify-between items-center p-2 rounded-lg ${lostOption === 'increase' ? 'bg-[#555961]' : 'bg-[#393B3F]'}`}
                      >
                        <span className={`w-[10px] h-[10px] rounded-full ${isActive('lost', 'increase') ? 'bg-[#5BA100]' : 'bg-gray-500'}`}></span>
                        <div className='flex flex-col'>
                          <span className="text-gray-300 text-[13px]">Increase bet by</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={increaseBy}
                              onChange={(e) => setIncreaseBy(e.target.value)}
                              className="w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right"
                              disabled={!isActive('lost', 'increase')}
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                          </div>
                        </div>
                        <span></span>
                      </button>

                      <button
                        onClick={() => handleOptionChange('lost', 'decrease')}
                        className={`flex justify-between items-center p-2 rounded-lg ${lostOption === 'decrease' ? 'bg-[#555961]' : 'bg-[#393B3F]'}`}
                      >
                        <span className={`w-[10px] h-[10px] rounded-full ${isActive('lost', 'decrease') ? 'bg-[#5BA100]' : 'bg-gray-500'}`}></span>
                        <div className='flex flex-col'>
                          <span className="text-gray-300 text-[13px]">Decrease bet by</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={decreaseBy}
                              onChange={(e) => setDecreaseBy(e.target.value)}
                              className="w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right"
                              disabled={!isActive('lost', 'decrease')}
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                          </div>
                        </div>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* If I win section */}
                <div className="bg-[#1A1B1E] p-3 rounded-md">
                  <h3 className="text-gray-300 mb-2 text-center">If I win</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleOptionChange('win', 'return')}
                      className={`flex justify-between items-center w-full p-2 rounded-lg ${winOption === 'return' ? 'bg-[#555961]' : 'bg-[#393B3F]'}`}
                    >
                      <span className={`w-[10px] h-[10px] rounded-full ${isActive('win', 'return') ? 'bg-[#5BA100]' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300 text-[13px]">Return to initial bet</span>
                      <span></span>
                    </button>

                    <div className='grid grid-cols-2 gap-2'>
                      <button
                        onClick={() => handleOptionChange('win', 'increase')}
                        className={`flex justify-between items-center p-2 rounded-lg ${winOption === 'increase' ? 'bg-[#555961]' : 'bg-[#393B3F]'}`}
                      >
                        <span className={`w-[10px] h-[10px] rounded-full ${isActive('win', 'increase') ? 'bg-[#5BA100]' : 'bg-gray-500'}`}></span>
                        <div className='flex flex-col'>
                          <span className="text-gray-300 text-[13px]">Increase bet by</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={increaseBy}
                              onChange={(e) => setIncreaseBy(e.target.value)}
                              className="w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right"
                              disabled={!isActive('win', 'increase')}
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                          </div>
                        </div>
                        <span></span>
                      </button>

                      <button
                        onClick={() => handleOptionChange('win', 'decrease')}
                        className={`flex justify-between items-center p-2 rounded-lg ${winOption === 'decrease' ? 'bg-[#555961]' : 'bg-[#393B3F]'}`}
                      >
                        <span className={`w-[10px] h-[10px] rounded-full ${isActive('win', 'decrease') ? 'bg-[#5BA100]' : 'bg-gray-500'}`}></span>
                        <div className='flex flex-col'>
                          <span className="text-gray-300 text-[13px]">Decrease bet by</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={decreaseBy}
                              onChange={(e) => setDecreaseBy(e.target.value)}
                              className="w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right"
                              disabled={!isActive('win', 'decrease')}
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                          </div>
                        </div>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="w-full border-t border-[#ffffff1a] py-4 px-2">
          <button className="w-full bg-[radial-gradient(circle_at_50%_50%,#61a503,#2d7500_94%)] hover:opacity-90 text-white py-3 rounded-[20px] font-medium">
            START AUTO
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoPlayModal;