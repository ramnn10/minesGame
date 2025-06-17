import React from 'react';

interface GameRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameRulesModal: React.FC<GameRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto h-[100%]">
      <div className=" bg-[#212226] h-[-webkit-fill-available] rounded-lg shadow-xl text-gray-300 font-[400] overflow-y-auto">
        <div className="p-2 border-b border-gray-700">
          <div className='flex justify-between items-center'>
            <h2 className="text-xl font-bold">GAME RULES</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-500 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-2 border-b border-gray-700">

          <div className='flex justify-center items-center space-x-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" _ngcontent-yqs-c45="" aria-hidden="true"><g fill="#0295D0" fill-rule="nonzero" _ngcontent-yqs-c45=""><path d="M24.4 19.39a7.23 7.23 0 1 1 0 14.46 7.23 7.23 0 0 1 0-14.46Zm0 .95a6.27 6.27 0 1 0 0 12.55 6.27 6.27 0 0 0 0-12.55Z" _ngcontent-yqs-c45=""></path><path d="M33.06 21.2c.37.38.37.98 0 1.36l-2.13 2.13-3.8-4.07 2-2a.96.96 0 0 1 1.35 0l2.58 2.58Zm-.68.68L29.8 19.3l-1.33 1.34 2.48 2.67 1.43-1.43ZM24.33 22.67a.33.33 0 0 1-.19-.06.34.34 0 0 1 .12-.61.34.34 0 0 1 .4.27.33.33 0 0 1-.05.25.33.33 0 0 1-.15.12.34.34 0 0 1-.13.03ZM21.4 29.74a.34.34 0 0 1-.24-.1 4.45 4.45 0 0 1 0-6.34c.5-.5 1.1-.86 1.76-1.08a.34.34 0 1 1 .21.64 3.77 3.77 0 0 0-1.49 6.3.34.34 0 0 1-.24.58ZM22.65.73 20.9 4.3a.36.36 0 0 1-.27.2l-3.93.57a1.32 1.32 0 0 0-.73 2.25l2.84 2.77c.09.08.12.2.1.32l-.67 3.9a1.32 1.32 0 0 0 1.92 1.4l3.5-1.85c.11-.06.24-.06.34 0l3.52 1.85c.96.5 2.1-.32 1.9-1.4l-.66-3.9a.36.36 0 0 1 .1-.32L31.7 7.3c.78-.76.35-2.1-.73-2.25l-3.93-.57a.36.36 0 0 1-.27-.2L25.02.73a1.32 1.32 0 0 0-2.37 0Zm1.5.43 1.76 3.56c.2.39.57.66 1 .72l3.92.57c.3.04.42.4.2.61L28.2 9.4c-.3.3-.45.74-.38 1.17l.67 3.9c.05.3-.26.53-.52.39L24.45 13c-.39-.2-.84-.2-1.23 0l-3.51 1.85a.36.36 0 0 1-.52-.38l.67-3.91c.07-.43-.07-.87-.38-1.17l-2.84-2.77a.36.36 0 0 1 .2-.61l3.92-.57c.43-.06.8-.33 1-.72l1.75-3.56a.36.36 0 0 1 .65 0ZM7.08 10.74 5.33 14.3a.36.36 0 0 1-.27.2l-3.93.57a1.32 1.32 0 0 0-.73 2.25l2.84 2.77c.09.08.12.2.1.32l-.67 3.9a1.32 1.32 0 0 0 1.91 1.4l3.52-1.85c.1-.06.23-.06.33 0l3.51 1.85c.97.5 2.1-.32 1.92-1.4l-.67-3.9a.36.36 0 0 1 .1-.32l2.84-2.77c.78-.76.35-2.1-.73-2.25l-3.93-.57a.36.36 0 0 1-.27-.2l-1.75-3.56a1.32 1.32 0 0 0-2.37 0Zm1.5.43 1.76 3.56c.2.39.57.66 1 .72l3.92.57c.3.04.42.4.2.61l-2.84 2.77c-.31.3-.45.74-.38 1.17l.67 3.9c.05.3-.26.53-.52.39L8.88 23c-.39-.2-.84-.2-1.23 0l-3.51 1.85a.36.36 0 0 1-.52-.38l.67-3.91c.07-.43-.07-.87-.38-1.17l-2.84-2.77a.36.36 0 0 1 .2-.61l3.92-.57c.43-.06.8-.33 1-.72l1.75-3.56a.36.36 0 0 1 .65 0Z" _ngcontent-yqs-c45=""></path></g></svg>
            <p className="text-2xl text-white text-center">
              MINES
            </p>
          </div>

          <div className="space-y-2 text-sm p-2">
            <p>
              A goal of the game is to reveal stars and avoid mines. With each revealed star, payout multiplier increases. Tiles can be revealed by selecting certain tile or clicking “pick randomply” button;
            </p>
            <p> Player can cash out winnings at any time by clicking “Cash out” button; </p>
            <p> Number of mines per field can be adjusted from dropdown. This affects game odds and bet multiplier; </p>
            <p>" The maximum winning odds for this game are 5044291X. However, the maximum win is limited by the operator and can be accessed from the “Game Limits” section in the menu. "</p>
          </div>
        </div>

        <div className="p-2 border-b border-gray-700">
          <p className="text-[15px] text-white my-2">
            GAME INTERFACE
          </p>

          <div className="space-y-2 text-sm">
            <p>
              Bets can be made from the bet panel, by selecting predefined bet amounts, or entering your own. Click (-) and (+) buttons to move between bet options;
            </p>
            <p>Player balance shows available funds to play;</p>
            <p>   Sound can be turned off and back on from game menu;  </p>
            <p>  Bet history can be accessed from game menu; </p>
            <p> Game information and rules can be accessed from game menu; </p>
            <p> Provably Fair settings can be accessed from game menu; </p>
          </div>
        </div>

        <div className="p-2 border-b border-gray-700">
          <p className="text-[15px] text-white my-2">
            AUTO PLAY
          </p>

          <div className="space-y-2 text-sm">
            <p>
              Note: this feature might be unavailable in some casinos.
            </p>
            <p>  Auto Play is activated by pressing the “Auto Game” button. To continue tiles on the board should be selected;  </p>
            <p>  Auto play settings are activated by pressing “Auto Play” button, if tiles are selected on the board;  </p>
            <p>  In the Auto Play panel, the “Stop if cash decreases by” option stops Auto Play, if the balance is decreased by the selected amount."</p>
            <p> In the Auto Play panel, the “Stop if single win exceeds” option stops Auto Play, if a single win exceeds the selected amount. </p>
            <p>
              In the Auto Play panel, the “Stop if cash increases by” option stops Auto Play, if the balance is increased by the selected amount.
            </p>
            <p>
              After start, remaining number of rounds is displayed on the counter. The player can stop Auto Play at any time, by clicking the counter.
            </p>
          </div>
        </div>

        <div className="p-2 border-b border-gray-700">
          <p className="text-[15px] text-white my-2">
            ADDITIONAL INFORMATION
          </p>

          <div className="space-y-2 text-sm">
            <p>
              In the event of a malfunction of the gaming hardware/software, all affected game bets and payouts are rendered void and all affected bets are refunded.
            </p>
            <p>
              If the internet connection is interrupted when the bet is active, the game will auto cash out with the current multiplier, and the winning amount will be added to your balance.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameRulesModal;