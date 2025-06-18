import React, { useEffect, useRef } from 'react';

interface BetsButtonModalProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  onClose: () => void;
}

const BetsButtonModal: React.FC<BetsButtonModalProps> = ({ isOpen, triggerRef, onClose }) => {

  const betRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (
        betRef.current &&
        !betRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-start z-50 w-full">
      <div
        ref={betRef}
        className="w-[300px] bg-[#032e49] border border-[#082130] rounded-lg shadow-xl text-[#c6d6e0]">
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