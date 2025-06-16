import React from 'react';

interface GameRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BetHistoryModal: React.FC<GameRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto h-[100%] w-full">
      <div className="bg-[#212226] h-[-webkit-fill-available] w-[90%] max-w-4xl rounded-lg shadow-xl text-white overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">BET HISTORY</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-500 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 text-sm">
              <thead>
                <tr className="bg-[#2e2f33] text-left">
                  <th className="p-2 border-b border-gray-700">#</th>
                  <th className="p-2 border-b border-gray-700">Game</th>
                  <th className="p-2 border-b border-gray-700">Bet Amount</th>
                  <th className="p-2 border-b border-gray-700">Multiplier</th>
                  <th className="p-2 border-b border-gray-700">Profit</th>
                  <th className="p-2 border-b border-gray-700">Date</th>
                  <th className="p-2 border-b border-gray-700">Result</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)]?.map((_, i) => (
                  <tr key={i} className="odd:bg-[#1c1d20] even:bg-[#2a2b2e]">
                    <td className="p-2 border-b border-gray-700">{i + 1}</td>
                    <td className="p-2 border-b border-gray-700">Mines</td>
                    <td className="p-2 border-b border-gray-700">₹100</td>
                    <td className="p-2 border-b border-gray-700">2.5x</td>
                    <td className="p-2 border-b border-gray-700 text-green-400">₹150</td>
                    <td className="p-2 border-b border-gray-700">16 Jun 2025</td>
                    <td className="p-2 border-b border-gray-700 text-green-500">Win</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};

export default BetHistoryModal;