import React from 'react';

interface GameLimitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameLimitsModal: React.FC<GameLimitsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-80 bg-[#212226] rounded-lg shadow-xl text-white">
        {/* Header */}
        <div className="p-2 border-b border-gray-700">
          <div className='flex justify-between items-center'>
            <h2 className="text-xl font-bold">GAME LIMITS</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-500 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-2">

          <p className="text-sm text-gray-400 mt-1">
            Game limits are managed by operator. Current game limits for this game are below:
          </p>

        </div>


        {/* Limits List */}
        <div className="p-4 space-y-1 text-[13px]">
          <div className="flex justify-between bg-[#0003] py-[9px] rounded-[6px] px-[12px]">
            <span>Maximum bet USD:</span>
            <span className="font-[400] bg-[#575c68] border-[1px] rounded-2xl px-3 border-[#292e3e]">
              100.00
            </span>
          </div>
          <div className="flex justify-between bg-[#0003] py-[9px] rounded-[6px] px-[12px]">
            <span>Minimum bet USD:</span>
            <span className="font-[400] bg-[#575c68] border-[1px] rounded-2xl px-3 border-[#292e3e]">
              0.10
            </span>
          </div>
          <div className="flex justify-between bg-[#0003] py-[9px] rounded-[6px] px-[12px]">
            <span >Maximum win for one bet USD:</span>
            <span className="font-[400] bg-[#575c68] border-[1px] rounded-2xl px-3 border-[#292e3e]">
              10,000.00
            </span>
          </div>
          <div className="flex justify-between bg-[#0003] py-[9px] rounded-[6px] px-[12px]">
            <span>Auto cashout in sec:</span>
            <span className="font-[400] bg-[#575c68] border-[1px] rounded-2xl px-3 border-[#292e3e]">
              30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLimitsModal;