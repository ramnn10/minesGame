import React, { useState, useRef } from 'react';
import MenuModal from './MenuModal';
import GameLimitsModal from './GameLimitsModal';
import GameRulesModal from './GameRulesModal';
import BetHistoryModal from './BetHistoryModal';

const Dashboard: React.FC = () => {
    // Game Settings
    const MIN_BET = 1;
    const MAX_BET = 1000;
    const BET_STEP = 1;
    const GRID_SIZE = 25;

    // Game State
    const [betAmount, setBetAmount] = useState<number>(10);
    const [mineCount, setMineCount] = useState<number>(3);
    const [gemsFound, setGemsFound] = useState<number>(0);
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [gridState, setGridState] = useState<string[]>([]);
    const [revealedTiles, setRevealedTiles] = useState<boolean[]>(Array(GRID_SIZE).fill(false));
    const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');
    const [showMessage, setShowMessage] = useState<boolean>(false);

    // Initialize mine count options
    const mineOptions = Array.from({ length: 24 }, (_, i) => i + 1);

    // Update bet amount and validate
    const updateBetAmount = (newAmount: number): number => {
        let amount = newAmount;

        if (isNaN(amount)) amount = MIN_BET;
        if (amount < MIN_BET) amount = MIN_BET;
        if (amount > MAX_BET) amount = MAX_BET;

        amount = Math.round(amount / BET_STEP) * BET_STEP;
        setBetAmount(amount);
        return amount;
    };

    // Increase bet amount
    const increaseBet = () => {
        const newAmount = betAmount + 10;
        updateBetAmount(newAmount);
    };

    // Decrease bet amount
    const decreaseBet = () => {
        const newAmount = betAmount - BET_STEP;
        updateBetAmount(newAmount);
    };

    // Show message to user
    const displayMessage = (text: string, type: 'info' | 'success' | 'error') => {
        setMessage(text);
        setMessageType(type);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    // Start a new game
    const startGame = () => {
        const validatedBet = updateBetAmount(betAmount);
        if (isNaN(validatedBet)) {
            displayMessage("Please enter a valid bet amount.", 'error');
            return;
        }
        if (isNaN(mineCount) || mineCount < 1 || mineCount >= GRID_SIZE) {
            displayMessage(`Mines must be between 1 and ${GRID_SIZE - 1}.`, 'error');
            return;
        }

        setGameActive(true);
        setGemsFound(0);
        setCurrentMultiplier(1.0);
        setRevealedTiles(Array(GRID_SIZE).fill(false));

        // Create and shuffle grid
        const tempGrid = Array(GRID_SIZE).fill('gem');
        for (let i = 0; i < mineCount; i++) {
            tempGrid[i] = 'mine';
        }
        setGridState(tempGrid.sort(() => Math.random() - 0.5));

        displayMessage('Game started! Pick a tile.', 'info');
    };

    // Handle tile click
    const handleTileClick = (index: number) => {
        if (!gameActive || revealedTiles[index]) return;

        // Mark this tile as revealed
        const newRevealedTiles = [...revealedTiles];
        newRevealedTiles[index] = true;
        setRevealedTiles(newRevealedTiles);

        if (gridState[index] === 'mine') {
            // Game Over - Hit a mine
            revealAllTiles();
            endGame(false);
        } else {
            // Found a gem
            const newGemsFound = gemsFound + 1;
            setGemsFound(newGemsFound);
            updateMultiplierAndWinnings(newGemsFound);

            // Enable cashout button
            if (newGemsFound === 1) {
                displayMessage('Gem found! Keep going or cash out.', 'info');
            }

            // Check for win condition
            if (newGemsFound === GRID_SIZE - mineCount) {
                revealAllTiles();
                endGame(true);
            }
        }
    };

    // Reveal all tiles
    const revealAllTiles = () => {
        setRevealedTiles(Array(GRID_SIZE).fill(true));
    };

    // Update multiplier and winnings
    const updateMultiplierAndWinnings = (currentGemsFound: number) => {
        const riskFactor = 1 + (mineCount / GRID_SIZE) * 2;
        const progressFactor = 1 + (currentGemsFound / (GRID_SIZE - mineCount));
        let newMultiplier = parseFloat(((currentMultiplier * (riskFactor + progressFactor) / 2.5).toFixed(2)));

        if (currentGemsFound === 1) {
            newMultiplier = parseFloat((1 + mineCount * 0.08).toFixed(2));
        }

        setCurrentMultiplier(newMultiplier);
    };

    // End the game
    const endGame = (isWin: boolean) => {
        setGameActive(false);
        if (isWin) {
            const finalWinnings = betAmount * currentMultiplier;
            displayMessage(`You won $${finalWinnings.toFixed(2)}!`, 'success');
        } else {
            displayMessage('You hit a mine! Game Over.', 'error');
        }
    };

    // Cash out
    const cashOut = () => {
        if (!gameActive || gemsFound === 0) return;
        revealAllTiles();
        endGame(true);
    };

    // Calculate potential winnings
    const potentialWinnings = betAmount * currentMultiplier;

    const [isModalOpen, setIsModalOpen] = useState(false);

    // const menuButtonRef = useRef<HTMLDivElement>(null);


    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    const [activeModal, setActiveModal] = useState<'menu' | 'gameLimits' | 'gameRules' | 'betHistory' | null>(null);

    const menuButtonRef = useRef<HTMLDivElement>(null);

    const handleOpenMenu = () => {
        setActiveModal('menu'); // Show the MenuModal
    };

    const handleCloseAllModals = () => {
        setActiveModal(null); // Close everything
    };



    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-black w-full">
                <div className="w-full max-w-[960px] mx-auto p-1 bg-[#1a202c]">
                    <div className="w-full bg-gradient-to-b from-[#0435a1] to-[#0a6ed1] border-2 border-yellow-500 rounded-xl shadow-xl text-white font-medium sm:w-full md:w-[90%] lg:w-[80%] xl:w-full mx-auto">
                        <div className='bg-[#024495] rounded-xl relative overflow-hidden'>
                            <div className='flex justify-between items-center'>

                                <div className='flex justify-start items-center space-x-2 m-1' >
                                    <div className='bg-[#0267A5] px-5 text-white rounded'>Mines</div>
                                    <div className='flex justify-center items-center px-3 space-x-1 text-[13px] rounded-[12px] text-[#343a40] bg-[#F58D13]'>How to Play?</div>
                                </div>
                                <div className='flex justify-end items-center gap-2'>
                                    <span className='text-[12px] text-white'>
                                        1,0000.00 : USD
                                    </span>
                                    <div
                                        ref={menuButtonRef}
                                        onClick={handleOpenMenu}
                                        className="bg-[#013480] flex justify-center items-center w-6 h-6 rounded-full cursor-pointer text-white"
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleOpenMenu()}
                                    >
                                        =
                                    </div>
                                </div>
                            </div>


                            <div className="">

                                <div className="md:w-[35%] mx-auto">

                                    {/* Game Grid Column */}
                                    <div className="game-grid lg:col-span-2 grid grid-cols-5 gap-3 p-4 rounded-lg shadow-lg">
                                        {Array.from({ length: GRID_SIZE }).map((_, index) => {
                                            const isRevealed = revealedTiles[index];
                                            const tileContent = gridState[index];
                                            const isGem = tileContent === 'gem';
                                            const isMine = tileContent === 'mine';

                                            return (
                                                <div
                                                    key={index}
                                                    className={`game-tile bg-gray-600 hover:bg-gray-500 ${isRevealed ? 'revealed' : ''} ${isRevealed && isGem ? 'gem' : ''} ${isRevealed && isMine ? 'mine' : ''}`}
                                                    onClick={() => handleTileClick(index)}
                                                >
                                                    {isRevealed && (isGem ? '💎' : isMine ? '💣' : '')}
                                                </div>
                                            );
                                        })}
                                    </div>


                                </div>
                            </div>

                            {/* Controls Column */}
                            <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-lg shadow-lg flex flex-col space-y-6">
                                <h1 className="text-3xl font-bold text-center text-white">Mines</h1>

                                {/* Bet Amount Section */}
                                <div className="bet-amount">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-400">Bet Amount ($)</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button
                                            className="bet-adjust-btn"
                                            onClick={decreaseBet}
                                            disabled={betAmount <= MIN_BET || gameActive}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="bet-input"
                                            value={betAmount}
                                            min={MIN_BET}
                                            max={MAX_BET}
                                            onChange={(e) => updateBetAmount(parseFloat(e.target.value))}
                                            disabled={gameActive}
                                        />
                                        <button
                                            className="bet-adjust-btn"
                                            onClick={increaseBet}
                                            disabled={betAmount >= MAX_BET || gameActive}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Number of Mines */}
                                <div>
                                    <label htmlFor="mine-count" className="block mb-2 text-sm font-medium text-gray-400">
                                        Number of Mines
                                    </label>
                                    <select
                                        id="mine-count"
                                        className="w-20 p-1 rounded-lg text-white text-lg bg-gray-700 border-gray-600"
                                        value={mineCount}
                                        onChange={(e) => setMineCount(parseInt(e.target.value))}
                                        disabled={gameActive}
                                    >
                                        {mineOptions.map((count) => (
                                            <option key={count} value={count}>
                                                {count}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Game Buttons */}
                                <div className="space-y-4">
                                    <button
                                        className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors ${gameActive && gemsFound > 0 ? 'btn-secondary' : 'btn-primary'}`}
                                        onClick={gameActive ? cashOut : startGame}
                                        disabled={gameActive && gemsFound === 0}
                                    >
                                        {gameActive ? 'Cashout' : 'Bet'}
                                    </button>
                                </div>

                                {/* Game Info */}
                                <div className="space-y-4 text-center pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="text-gray-400">Multiplier</p>
                                        <p className="text-2xl font-bold text-white">{currentMultiplier.toFixed(2)}x</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Potential Winnings</p>
                                        <p className="text-2xl font-bold text-green-400">
                                            ${potentialWinnings.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Message Box */}
                                <div
                                    className={`info-box p-4 rounded-lg mt-4 text-center ${showMessage ? '' : 'hidden'}`}
                                    style={{
                                        borderLeftColor: messageType === 'success' ? '#2f855a' : messageType === 'error' ? '#c53030' : '#2b6cb0',
                                    }}
                                >
                                    <p className="font-semibold">{message}</p>
                                </div>
                            </div>
                            {activeModal === 'menu' && (
                                <MenuModal
                                    onClose={handleCloseAllModals}
                                    triggerRef={menuButtonRef}
                                    onSelect={(modalName) => setActiveModal(modalName)}
                                />
                            )}

                            <GameLimitsModal isOpen={activeModal === 'gameLimits'} onClose={handleCloseAllModals} />
                            <GameRulesModal isOpen={activeModal === 'gameRules'} onClose={handleCloseAllModals} />
                            <BetHistoryModal isOpen={activeModal === 'betHistory'} onClose={handleCloseAllModals} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;