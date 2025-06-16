import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import GameLimitsModal from './GameLimitsModal';
import GameRulesModal from './GameRulesModal';
import BetHistoryModal from './BetHistoryModal';

interface MenuModalProps {
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  onSelect: (modal: 'gameLimits' | 'gameRules' | 'betHistory') => void;
}


const MenuModal: React.FC<MenuModalProps> = ({ onClose, triggerRef, onSelect }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [isGameLimitsOpen, setIsGameLimitsOpen] = useState(false);
  const [isGameRulesOpen, setIsGameRulesOpen] = useState(false);
  const [isBetHistoryOpen, setIsBetHistoryOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerRef]);

  const position = triggerRef.current
    ? {
      top: triggerRef.current.getBoundingClientRect().bottom + window.scrollY,
      right: window.innerWidth - triggerRef.current.getBoundingClientRect().right,
    }
    : { top: 0, right: 0 };

  // if (!isOpen) return null;

  // const position = getModalPosition();

  return (
    // <Modal isOpen={isOpen} onClose={onClose}>
    //   <div
    //     className="fixed w-64 bg-[#212226] rounded-lg shadow-xl text-white z-50"
    //     style={{
    //       top: `${position.top}px`,
    //       right: `${position.right}px`,
    //     }}
    //   >
    <>
      <div
        ref={menuRef}
        className="fixed w-64 bg-[#212226] rounded-lg shadow-xl text-white z-50"
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
      >
        <div className='flex justify-between items-center px-4 py-2 border-b border-gray-700'>
          <p className="text-xs text-gray-400">demo_96054</p>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-500 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
          <div className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer">
            <label className="text-sm cursor-pointer w-full">Sound</label>
          </div>

          <div className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer">
            <label className="text-sm cursor-pointer w-full">Free Bets</label>
          </div>

          <div
            onClick={() => onSelect('betHistory')}
            // onClick={() => setIsBetHistoryOpen(true)}
            className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer">
            <label className="text-sm cursor-pointer w-full">Bet History</label>
          </div>

          <div
            onClick={() => onSelect('gameLimits')}
            className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer"
          // onClick={() => setIsGameLimitsOpen(true)}
          >
            <label className="text-sm cursor-pointer w-full">Game Limits</label>
          </div>

          <div className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer">
            <label className="text-sm cursor-pointer w-full">How to Play</label>
          </div>

          <div
            className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer"
            // onClick={() => setIsGameRulesOpen(true)}
            onClick={() => onSelect('gameRules')}
          >
            <label className="text-sm cursor-pointer w-full">Game Rules</label>
          </div>

          <div className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer">
            <label className="text-sm cursor-pointer w-full">Provably Fair Settings</label>
          </div>

          <div className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer">
            <label className="text-sm cursor-pointer w-full">Back to Home</label>
          </div>

          <div className="flex items-center gap-2 p-2 hover:bg-[#0000004d] bg-[#0003] rounded cursor-pointer">
            <label className="text-sm cursor-pointer w-full">Provably Fair Game</label>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className='flex justify-between items-center'>
            <p className="text-center text-xs text-gray-500">Auto Game</p>
            <p className="text-center text-xs text-gray-500">Auto Game</p>
          </div>
        </div>
      </div>

      <GameLimitsModal
        isOpen={isGameLimitsOpen}
        onClose={() => setIsGameLimitsOpen(false)}
      />

      <GameRulesModal
        isOpen={isGameRulesOpen}
        onClose={() => setIsGameRulesOpen(false)}
      />

      <BetHistoryModal
        isOpen={isBetHistoryOpen}
        onClose={() => setIsBetHistoryOpen(false)}
      />
    </>
  );
};

export default MenuModal;