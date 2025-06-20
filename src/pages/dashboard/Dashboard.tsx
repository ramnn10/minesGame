import React, { useState, useRef } from 'react';
import MenuModal from './MenuModal';
import GameLimitsModal from './GameLimitsModal';
import GameRulesModal from './GameRulesModal';
import BetHistoryModal from './BetHistoryModal';
import BetsButtonModal from './BetsButtonModal';
import AutoPlayModal from './AutoPlayModal';
import NumberPadModal from './NumberPadModal';

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
    const [gridState, setGridState] = useState<string[]>(Array(GRID_SIZE).fill(''));
    const [revealedTiles, setRevealedTiles] = useState<boolean[]>(Array(GRID_SIZE).fill(false));
    const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

        // Shuffle the array
        const shuffledGrid = [...tempGrid].sort(() => Math.random() - 0.5);
        setGridState(shuffledGrid);

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
    const betButtonRef = useRef<HTMLDivElement>(null);

    const handleOpenMenu = () => {
        setActiveModal('menu'); // Show the MenuModal
    };

    const handleCloseAllModals = () => {
        setActiveModal(null); // Close everything
    };

    const handleGameAction = () => {
        if (!gameActive) {
            startGame();
        } else {
            // showMessage('Cashed out (not implemented yet)', 'info');
            // resetUI();
        }
    };

    const [showNumberPad, setShowNumberPad] = useState(false);

    const handleNumberClick = (num: number | string) => {
        if (num === '✅') {
            setShowNumberPad(false);
            return;
        }

        const newValue = parseFloat(`${betAmount}${num}`);
        if (newValue <= MAX_BET) {
            setBetAmount(newValue);
        }
    };

    const handleBackspace = () => {
        const strAmount = betAmount.toString();
        if (strAmount.length > 0) {
            const newValue = strAmount.slice(0, -1);
            setBetAmount(newValue === '' ? 0 : parseFloat(newValue));
        }
    }

    const [isBetButton, setIsBetButton] = useState(false);

    const handleBetButtons = () => {
        setIsBetButton(!isBetButton);
    };

    const [isAutoPlay, setIsAutoPlay] = useState(false);

    const handleAutoPlay = () => {
        setIsAutoPlay(!isAutoPlay);
    };


    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-black w-full">
                <div className="w-full max-w-[960px] mx-auto p-1 bg-[#1a202c]">
                    <div
                        style={{
                            backgroundImage: 'linear-gradient(-57deg, #0048dc 3%, #0781cc 85%)'
                        }}
                        className="w-full border-2 border-[#FB9C23] rounded-xl shadow-xl text-white font-medium sm:w-full md:w-[90%] lg:w-[80%] xl:w-full mx-auto">
                        {/* bg-gradient-to-b from-[#0435a1] to-[#0a6ed1]  */}
                        <div className="rounded-xl relative overflow-hidden"
                            //    bg-[#024495] 
                            style={{
                                backgroundImage: "url('/images/mines-star.svg'), url('/images/mines-bomb.svg')",
                                backgroundRepeat: "no-repeat, no-repeat",
                                backgroundPosition: "calc(25% - 270px) center, calc(75% + 300px) center",
                                backgroundSize: "300px 300px",
                                // backgroundColor: "#024495",
                            }}
                        >

                            <div className='md:flex hidden justify-between items-center bg-[#0000004d] px-1'>

                                <div className='flex justify-start items-center space-x-2 m-1' >
                                    {/* <div className='bg-[#0267A5] px-5 text-white rounded'>Mines</div> */}
                                    <div className="flex items-center justify-between px-1.5 w-[150px] h-[22px] text-[#3c0606] text-[12px] rounded-[17px] ml-[15px] bg-gradient-to-b from-[#f9a119] to-[#f38410] overflow-hidden relative">
                                        <img src='/images/icon-question.svg' alt="Question Icon" className="filter invert-[1]" />
                                        <span>How to Play?</span>
                                        <div></div>
                                    </div>

                                </div>
                                <div className='flex justify-end items-center gap-2'>
                                    <span className='text-[12px] text-white'>
                                        3,000.00 : USD
                                    </span>
                                    <div
                                        ref={menuButtonRef}
                                        onClick={handleOpenMenu}
                                        className="bg-[#0267a5] flex justify-center items-center w-6 h-6 rounded-full cursor-pointer text-white"
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleOpenMenu()}
                                    >
                                        <img src='/images/icon-burger-menu.svg' alt="Menu Icon" />
                                    </div>
                                </div>
                            </div>


                            <div className="py-1">

                                <div className="md:w-[40%] mx-auto">

                                    <div className='my-1.5 flex justify-between items-center bg-[#0000004d] rounded-xl px-1.5 py-1'>

                                        <div>

                                            <select
                                                id="mine-count"
                                                className="w-[120px] px-[3px] py-[1px] rounded-[20px] text-white text-[15px] bg-[#0267a5] hover:bg-[#02578c] border-[1px] border-[#00000080] shadow shadow-[#fff1cd33] "
                                                value={mineCount}
                                                onChange={(e) => setMineCount(parseInt(e.target.value))}
                                                disabled={gameActive}
                                            >
                                                <option value="" disabled>Mines</option>
                                                {mineOptions?.map((count) => (
                                                    <option key={count} value={count}>
                                                        {count}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <div className='flex justify-center items-center px-3 space-x-1 text-[13px] rounded-[12px] text-[#343a40] bg-[#FFC107]'>
                                                <p className="">Next :</p>
                                                <p id="multiplier-display" className="">{currentMultiplier?.toFixed(2)}x</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Message Box */}
                                    <div
                                        className={`info-box p-1 rounded-lg text-center ${showMessage ? '' : 'hidden'}`}
                                        style={{
                                            borderLeftColor: messageType === 'success' ? '#2f855a' : messageType === 'error' ? '#c53030' : '#2b6cb0',
                                        }}
                                    >
                                        <p className="font-semibold text-[12px]">{message}</p>
                                    </div>

                                    {/* Game Grid Column */}
                                    <div className=" grid grid-cols-5 gap-2 my-1.5">
                                        {gridState?.map((tileContent, index) => {
                                            const isRevealed = revealedTiles[index];
                                            const isGem = tileContent === 'gem';
                                            const isMine = tileContent === 'mine';
                                            const getTileStyle = () => {
                                                if (isRevealed) {
                                                    if (isMine) return 'bg-red-500 text-white';
                                                    if (isGem) return 'bg-gradient-to-b from-yellow-300 to-orange-400 text-white';
                                                    return 'bg-[#1873c3]';
                                                }
                                                return 'bg-[#1873c3]';
                                            };

                                            return (
                                                <div
                                                    key={index}
                                                    className={` ${getTileStyle()}  ${isRevealed ? 'scale-95' : 'scale-100'} w-[72px] h-[60px] aspect-square flex items-center justify-center rounded-lg cursor-pointer text-2xl font-bold transition duration-150 ease-in-out shadow-lg shadow-[#0000004d]
                                                         ${isRevealed
                                                            ? isGem
                                                                ? 'bg-emerald-500 text-white'
                                                                : isMine
                                                                    ? 'bg-red-500 text-white'
                                                                    : 'bg-gray-500'
                                                            : 'bg-gray-600 hover:bg-[#02578c]/90'
                                                        }
                                                    `}
                                                    onClick={() => handleTileClick(index)}
                                                >
                                                    {isRevealed && (isGem ? '⭐' : isMine ? '💣' : '')}
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>

                            {/* Controls Column */}
                            {/* <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-lg shadow-lg flex flex-col space-y-6"> */}
                            {/* <h1 className="text-3xl font-bold text-center text-white">Mines</h1> */}

                            {/* Bet Amount Section */}
                            {/* <div className="bet-amount">
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
                                            className=" text-black"
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
                                </div> */}

                            {/* Number of Mines */}
                            {/* <div>
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
                                </div> */}

                            {/* Game Buttons */}
                            {/* <div className="space-y-4">
                                    <button
                                        className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors ${gameActive && gemsFound > 0 ? 'btn-secondary' : 'btn-primary'}`}
                                        onClick={gameActive ? cashOut : startGame}
                                        disabled={gameActive && gemsFound === 0}
                                    >
                                        {gameActive ? 'Cashout' : 'Bet'}
                                    </button>
                                </div> */}

                            {/* Game Info */}
                            {/* <div className="space-y-4 text-center pt-4 border-t border-gray-700"> */}
                            {/* <div>
                                        <p className="text-gray-400">Multiplier</p>
                                        <p className="text-2xl font-bold text-white">{currentMultiplier.toFixed(2)}x</p>
                                    </div> */}
                            {/* <div>
                                        <p className="text-gray-400">Potential Winnings</p>
                                        <p className="text-2xl font-bold text-green-400">
                                            ${potentialWinnings.toFixed(2)}
                                        </p>
                                    </div> */}
                            {/* </div> */}


                            {/* </div> */}

                            <div className='bg-[#0000004d] p-3 w-full rounded-xl'>
                                <div className='w-[60%] mx-auto'>
                                    <div className='md:flex justify-between items-center gap-2'>

                                        <div className='flex flex-col md:flex-row md:gap-1 justify-start items-center space-x-2 md:space-y-0 space-y-1 m-1 px-4 rounded-[20px] bg-[#0267A5] py-1 relative' >
                                            <div className=' flex flex-col items-center justify-center text-white rounded'>
                                                <span className='text-[13px]'>
                                                    Bet USD
                                                </span>
                                                <input
                                                    type="number"
                                                    value={betAmount}
                                                    min={MIN_BET}
                                                    max={MAX_BET}
                                                    onChange={(e) => updateBetAmount(parseFloat(e.target.value))}
                                                    onClick={() => setShowNumberPad(true)}
                                                    disabled={gameActive}
                                                    className="w-36 h-5 mx-2 rounded-lg bg-[#0000004d] border border-black text-white text-center focus:outline-none focus:border-black"
                                                    id="bet-amount"
                                                />
                                            </div>
                                            <div className='flex justify-end items-center gap-1'>
                                                <button id="bet-decrease"
                                                    onClick={decreaseBet}
                                                    disabled={betAmount <= MIN_BET || gameActive}
                                                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full shadow-md shadow-[#fff1cd33] bg-[#0267a5] border-[1px] border-black/50 text-white font-bold text-xl hover:bg-[#02578c] transition-colors disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
                                                <div
                                                    onClick={() => handleBetButtons()}
                                                    className="w-[32px] h-[32px] cursor-pointer flex items-center justify-center rounded-full shadow-md shadow-[#fff1cd33] bg-[#0267a5] border-[1px] border-black/50 text-white font-bold text-xl hover:bg-[#02578c] transition-colors">
                                                    <img src='/images/icon-coin.svg' alt="Home Icon" />
                                                </div>
                                                <button id="bet-increase"
                                                    onClick={increaseBet}
                                                    disabled={betAmount >= MAX_BET || gameActive}
                                                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full shadow-md shadow-[#fff1cd33] bg-[#0267a5] border-[1px] border-black/50 text-white font-bold text-xl hover:bg-[#02578c] transition-colors disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
                                            </div>
                                            <div className='absolute -top-[185px] left-0'>
                                                {showNumberPad && (
                                                    <NumberPadModal
                                                        isOpen={showNumberPad}
                                                        onClose={() => setShowNumberPad(false)}
                                                        onNumberClick={handleNumberClick}
                                                        onBackspace={handleBackspace}
                                                    />
                                                )}
                                            </div>
                                            <div className='absolute -top-[320px] left-0'>
                                                <BetsButtonModal
                                                    isOpen={isBetButton}
                                                    triggerRef={betButtonRef}
                                                    onClose={() => setIsBetButton(false)}
                                                />
                                            </div>
                                        </div>

                                        <div className='order-2 md:order-1 flex justify-start items-center w-full gap-2'>
                                            <div
                                                onClick={() => handleAutoPlay()}
                                                className="flex items-center justify-center h-[50px] w-[50px] min-w-[50px] max-w-[50px] rounded-full  text-white text-sm font-medium  border-2 border-black/90 shadow-[3px_3px_6px_#020b1a80,inset_-1px_-1px_#00000052,inset_1px_1px_#fff1cd33]  bg-[radial-gradient(circle_at_50%_50%,#0576dc,#025cd5_68%)] cursor-pointer">
                                                <img
                                                    src='/images/icon-auto-play.svg'
                                                    alt="auto-play"
                                                    className="pointer-events-none"
                                                />
                                            </div>
                                            {/* Game Buttons */}
                                            <div className="w-full order-1 md:order-2">
                                                <button
                                                    onClick={handleGameAction}
                                                    disabled={isButtonDisabled}
                                                    className={`w-full py-2 rounded-[20px] text-lg font-normal text-white transition-colors border-2 border-black shadow-md shadow-black  flex justify-between items-center px-2 ${gameActive
                                                        ? 'bg-[radial-gradient(circle_at_50%_50%,#666,#333)]'
                                                        : 'bg-[radial-gradient(circle_at_50%_50%,#61a503,#2d7500_94%)] hover:bg-green-700'} 
                                                         ${isButtonDisabled ? 'disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
                                                >
                                                    <span>
                                                        <img src='/images/icon-play.svg' alt="play" />
                                                    </span>
                                                    <span className="flex flex-col items-center">
                                                        {gameActive ? (
                                                            <>
                                                                <span className='text-[15px]'>CASHOUT</span>
                                                                <div className='bg-black/30 text-[12px] px-2 rounded-lg'>
                                                                    ${potentialWinnings.toFixed(2)} USD
                                                                </div>
                                                            </>
                                                        ) : (
                                                            'BET'
                                                        )}
                                                    </span>
                                                    <span>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* <div className='md:hidden flex  justify-between items-center'>

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
                                        <img src='/images/icon-burger-menu.svg' alt="Home Icon" />
                                    </div>
                                </div>
                            </div> */}

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

                            <div className=''>
                                <AutoPlayModal
                                    isOpen={isAutoPlay}
                                    onClose={() => setIsAutoPlay(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Dashboard;