import React from 'react';

interface NumberPadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNumberClick: () => void;
  onBackspace: () => void;

}

const NumberPadModal: React.FC<NumberPadModalProps> = ({ onClose, onNumberClick }) => {
  // if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0267a5] border border-black rounded-lg p-1 w-[234px] ">
        <div className="grid grid-cols-3 gap-[1px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
            <button
              key={num}
              onClick={() => onNumberClick()}
              className="h-[34px] flex items-center justify-center cursor-pointer shadow-sm shadow-[#fff1cd33] hover:bg-[#02578c] border border-black text-white rounded-lg bg-[#0267a5]"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => onNumberClick()}
            className="h-[34px] flex items-center justify-center cursor-pointer shadow-sm shadow-[#fff1cd33] hover:bg-[#02578c] border border-black text-white rounded-lg bg-[#0267a5]"
          >
            <img src='/images/icon-backspace.svg' alt="Home Icon" />

          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 mt-[2px] bg-[#00000080] text-white rounded-lg flex justify-center items-center">
          <img src='/images/icon-confirm.svg' alt="Home Icon" />
        </button>
      </div>
    </div>
  );
};

export default NumberPadModal;