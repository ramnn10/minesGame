import React, { useState } from 'react';

const GRID_SIZE = 25;
const MIN_BET = 0.1;
const MAX_BET = 100;


const Dashboard: React.FC = () => {
    const [revealed, setRevealed] = useState<boolean[]>(Array(GRID_SIZE).fill(false));

    const [mineCount, setMineCount] = useState<number>(3);
    const [betAmount, setBetAmount] = useState<number>(0.3);
    const [gridState, setGridState] = useState<string[]>([]);
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);
    const [message, setMessage] = useState<string>('');

    const [gameActionText, setGameActionText] = useState<string>('BET');
    const [gameActionStyle, setGameActionStyle] = useState<'primary' | 'secondary'>('primary');


    const [gemsFound, setGemsFound] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    


    const updateMultiplierAndWinnings = () => {
        const newMultiplier = parseFloat((1 + gemsFound * 0.2).toFixed(2));
        setCurrentMultiplier(newMultiplier);
    };

    const updateDisplay = () => {
        const displayEl = document.getElementById("multiplier-display");
        if (displayEl) {
            displayEl.innerText = `${currentMultiplier.toFixed(2)}x`;
        }
    };

    const endGame = (isWin: boolean) => {
        revealAllTiles();
        setGameActive(false);
        setIsButtonDisabled(true);
        showMessage(isWin ? '🎉 You won!' : '💥 You hit a mine!', isWin ? 'info' : 'error');
    };


    const handleTileClick = (index: number) => {
        if (!gameActive || revealed[index]) return;

        const newRevealed = [...revealed];
        newRevealed[index] = true;
        setRevealed(newRevealed);

        if (gridState[index] === 'mine') {
            endGame(false);
        } else {
            const newGems = gemsFound + 1;
            setGemsFound(newGems);
            updateMultiplierAndWinnings();
            updateDisplay();
            // setGameActive('Cashout');
            setGameActionDisabled(false);
            // setGameActive('secondary');

            if (newGems === GRID_SIZE - mineCount) {
                endGame(true);
            }
        }
    };

    const revealAllTiles = () => {
        setRevealed(Array(GRID_SIZE).fill(true));
    };

    const updateBetAmount = (value: string): number => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : Math.max(MIN_BET, Math.min(num, MAX_BET));
    };

    const showMessage = (msg: string, type: 'info' | 'error') => {
        // Basic message handler
        setMessage(`${type.toUpperCase()}: ${msg}`);
    };

    const startGame = () => {
        const updatedBet = updateBetAmount(betAmount.toString());

        if (isNaN(updatedBet)) {
            showMessage("Please enter a valid bet amount.", 'error');
            return;
        }

        if (isNaN(mineCount) || mineCount < 1 || mineCount >= GRID_SIZE) {
            showMessage(`Mines must be between 1 and ${GRID_SIZE - 1}.`, 'error');
            return;
        }

        setGameActive(true);
        setCurrentMultiplier(1.0);

        const tempGrid = Array(GRID_SIZE).fill('gem');
        for (let i = 0; i < mineCount; i++) {
            tempGrid[i] = 'mine';
        }
        const shuffledGrid = tempGrid.sort(() => Math.random() - 0.5);

        setGridState(shuffledGrid);
        showMessage('Game started! Pick a tile.', 'info');
    };

    const resetUI = () => {
        setGameActive(false);
        setCurrentMultiplier(1.0);
        setGridState([]);
        setMessage('');
    };

    const handleGameAction = () => {
        if (!gameActive) {
            startGame();
        } else {
            showMessage('Cashed out (not implemented yet)', 'info');
            resetUI();
        }
    };


    return (

        <>
            <div className="flex items-center justify-center min-h-screen bg-black w-full">
                <div className="w-full max-w-[960px] mx-auto p-1 bg-[#1a202c]">
                    <div className="w-full bg-gradient-to-b from-[#0435a1] to-[#0a6ed1] border-2 border-yellow-500 rounded-xl shadow-xl text-white font-medium sm:w-full md:w-[90%] lg:w-[80%] xl:w-full mx-auto">
                        <div className='bg-[#024495] rounded-xl'>
                            <div className='flex justify-between items-center'>

                                <div className='flex justify-start items-center space-x-2 m-1' >
                                    <div className='bg-[#0267A5] px-5 text-white rounded'>Mines</div>
                                    <div className='flex justify-center items-center px-3 space-x-1 text-[13px] rounded-[12px] text-[#343a40] bg-[#F58D13]'>How to Play?</div>
                                </div>
                                <div className='flex justify-end items-center gap-1'>
                                    <span className='text-[12px] text-white'>
                                        1,0000.00 : USD
                                    </span>
                                    <div className='bg-[#013480] flex justify-center items-center w-6 h-6 rounded-full cursor-pointer'>
                                        =
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="">

                            <div className="md:w-[35%] mx-auto">

                                <div className='my-1.5 flex justify-between items-center bg-[#024495] rounded-xl px-1'>

                                    <div>
                                        <select
                                            id="mine-count"
                                            className="w-24 p-1 rounded-lg text-white text-lg bg-gray-700 border border-gray-600"
                                            value={mineCount}
                                            onChange={(e) => setMineCount(parseInt(e.target.value))}
                                            disabled={gameActive}
                                        >
                                            {Array?.from({ length: GRID_SIZE - 1 }, (_, i) => i + 1).map((num) => (
                                                <option key={num} value={num}>
                                                    {num}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <div className='flex justify-center items-center px-3 space-x-1 text-[13px] rounded-[12px] text-[#343a40] bg-[#FFC107]'>
                                            <p className="">Next :</p>
                                            <p id="multiplier-display" className="">1.00x</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-5 gap-3 p-4 bg-gray-800/50 rounded-lg shadow-lg mb-1">
                                    {Array?.from({ length: GRID_SIZE }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`game-tile rounded-md w-full aspect-square flex items-center justify-center text-xl font-bold cursor-pointer transition-all
                                                            ${revealed[i] ? 'revealed ' + (gridState[i] === 'mine' ? 'bg-red-600' : 'bg-green-600') : 'bg-gray-600 hover:bg-gray-500'}`}
                                            onClick={() => handleTileClick(i)}
                                        >
                                            {revealed[i] ? (gridState[i] === 'mine' ? '💣' : '💎') : ''}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='bg-[#024495] p-3 w-full rounded-xl'>
                                <div className='w-[60%] mx-auto'>
                                    <div className='flex justify-between items-center gap-2'>

                                        <div className='flex justify-start items-center space-x-2 m-1 px-4 rounded-[20px] bg-[#0267A5] py-1' >
                                            <div className=' flex flex-col items-center justify-center px-5 text-white rounded'>
                                                <span className='text-[13px]'>
                                                    Bet USD
                                                </span>
                                                <input
                                                    type="number"
                                                    className="w-36 h-5 mx-2 rounded-lg bg-[#0000004d] border border-black text-white text-center focus:outline-none focus:border-black"
                                                    id="bet-amount"
                                                    defaultValue={10}
                                                    min={1}
                                                    max={1000}
                                                />
                                            </div>
                                            <div className='flex justify-end items-center gap-1'>
                                                <button id="bet-decrease" className="w-8 h-8 flex items-center justify-center rounded-full shadow-md shadow-[#fff1cd33] bg-[#00000026] border-[1px] border-black/50 text-white font-bold text-xl hover:bg-blue-800 transition-colors disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">-</button>

                                                <div className="w-8 h-8 flex items-center justify-center rounded-full shadow-md shadow-[#fff1cd33] bg-[#00000026] border-[1px] border-black/50 text-white font-bold text-xl hover:bg-blue-800 transition-colors">
                                                    =
                                                </div>
                                                <button id="bet-increase" className="w-8 h-8 flex items-center justify-center rounded-full shadow-md shadow-[#fff1cd33] bg-[#00000026] border-[1px] border-black/50 text-white font-bold text-xl hover:bg-blue-800 transition-colors disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">+</button>


                                            </div>
                                        </div>

                                        <div className="w-28 h-11 flex items-center justify-center rounded-full shadow-md shadow-[#fff1cd33] bg-[#00000026] border-[1px] border-black/50 text-white font-bold text-xl hover:bg-blue-800 transition-colors">
                                            =
                                        </div>

                                        {/* Game Buttons */}
                                        <div className="w-full">
                                            <button
                                                onClick={handleGameAction}
                                                disabled={isButtonDisabled}
                                                className={`w-full py-2 rounded-[20px] text-lg font-normal text-white transition-colors border-2 border-black shadow-md shadow-black  flex justify-between items-center px-2 ${gameActive
                                                    ? 'bg-[radial-gradient(circle_at_50%_50%,#666,#333)]'
                                                    : 'bg-[radial-gradient(circle_at_50%_50%,#61a503,#2d7500_94%)] hover:bg-green-700'} 
                                                         ${isButtonDisabled ? 'disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
                                            >
                                                <span>=</span>
                                                <span>{gameActive ? 'CASHOUT' : 'BET'}</span>
                                                <span></span>
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Dashboard;

function setGameActionDisabled(arg0: boolean) {
    throw new Error('Function not implemented.');
}
