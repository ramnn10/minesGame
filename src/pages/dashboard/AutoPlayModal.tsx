import React, { useState } from 'react';

interface AutoPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AutoPlayModal: React.FC<AutoPlayModalProps> = ({ isOpen, onClose }) => {
  const [selectedRounds, setSelectedRounds] = useState<number>(3);
  const [stopIfDecrease, setStopIfDecrease] = useState<string>('0.00');
  const [stopIfWinExceeds, setStopIfWinExceeds] = useState<string>('0.00');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  const [isDecreaseEnabled, setIsDecreaseEnabled] = useState(false);
  const [isWinExceedsEnabled, setIsWinExceedsEnabled] = useState(false);

  if (!isOpen) return null;

  const roundOptions = [3, 10, 25, 100, 200, 500];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-lg bg-[#212226] rounded-lg shadow-xl text-white">
        {/* Header */}
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

        <div className="p-4">
          {/* Number of Rounds */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2 text-center">Number of rounds</label>
            <div className="grid grid-cols-2 gap-2">
              {roundOptions?.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedRounds(option)}
                  className={`py-1 px-2 rounded-md transition-colors flex items-center justify-between gap-2 ${selectedRounds === option
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
                </button>
              ))}
            </div>
          </div>

          {/* Stop Conditions */}
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

          {/* More Options */}
          <div className="mb-6">
            <button
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="text-blue-400 text-sm hover:underline"
            >
              More options {showMoreOptions ? '▲' : '▼'}
            </button>
            {showMoreOptions && (
              <div className="mt-2 space-y-3 text-sm">
                {/* Add additional options here if needed */}
                <div className="flex justify-between items-center bg-[#2d3138] p-3 rounded-md">
                  <span className="text-gray-300">Additional option</span>
                  <input
                    type="text"
                    className="w-24 bg-[#575c68] border border-[#292e3e] rounded-md px-3 py-1 text-right"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Start Button */}
          <button className="w-full b bg-[radial-gradient(circle_at_50%_50%,#61a503,#2d7500_94%)] hover:opacity-90 text-white py-3 rounded-lg font-medium">
            START AUTO
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoPlayModal;