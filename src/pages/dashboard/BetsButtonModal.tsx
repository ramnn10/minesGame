import React from 'react';

interface BetsButtonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BetsButtonModal: React.FC<BetsButtonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[220px] right-0 left-52 inset-0 flex items-center justify-start z-50 w-full">
      <div className="w-[300px] bg-[#032e49] border border-[#082130] rounded-lg shadow-xl text-[#c6d6e0]">
        {/* Header */}
        <div className="px-2 flex justify-between items-center">
          <div></div>
          <h2 className="text-[14px] font-[400]">Bet USD</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-500 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="px-2 py-1 pb-2 text-[13px] grid grid-cols-2 gap-[8px]">

          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>


          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>
          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>

          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>
          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>

          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>
          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>

          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>
          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>


          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>
          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>

          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>
          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>

          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>
          <span className="flex justify-center items-center font-[400] hover:bg-[#02578c] cursor-pointer bg-[#094164] border-[1px] rounded-[20px] p-[3px] border-[#00000080]">
            100.00
          </span>

        </div>
      </div>
    </div>
  );
};

export default BetsButtonModal;