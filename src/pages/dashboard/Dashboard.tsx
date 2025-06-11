import React from 'react'
// import { MdMenu } from "react-icons/md";


function Dashboard() {
    return (

        <>
            <div className='flex items-center justify-center min-h-screen bg-black'>
                <div className='p-2 bg-[#1a202c]'>
                    <div className=' bg-[#0843CD] border-[3px] border-[#F58D13] rounded-[8px]'>
                        <div className='bg-[#024495]'>
                            <div className='flex justify-between items-center'>

                                <div className='flex justify-start items-center space-x-2 m-1' >
                                    <div className='bg-[#0267A5] px-5 text-white rounded'>Mines</div>
                                    <div className='bg-[#F58D13] px-5 text-black rounded'>How to Play?</div>
                                </div>
                                <div className='bg-[#F58D13] px-6 rounded -mt-2 rounded-r rounded-l rounded-b text-white'>Fun Mode</div>
                                <div className='flex justify-end items-center gap-1'>
                                    <span className='text-[12px] text-white'>
                                        1,0000.00 : USD
                                    </span>
                                    <div className='bg-red-300 py-[1.5px] px-2 rounded-full cursor-pointer'>
                                        {/* <MdMenu /> */}=
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Game Grid Column */}
                            <div
                                id="game-grid"
                                className="lg:col-span-2 grid grid-cols-5 gap-3 p-4 bg-gray-800/50 rounded-lg shadow-lg"
                            >
                                {/* Tiles will be injected dynamically */}
                            </div>

                            {/* Controls Column */}
                            <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-lg shadow-lg flex flex-col space-y-6">





                                <h1 className="text-3xl font-bold text-center text-white">Mines</h1>

                                {/* Bet Amount Section */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-400">Bet Amount ($)</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button id="bet-decrease" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-white font-bold text-xl hover:bg-blue-800 transition-colors disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
                                        <input
                                            type="number"
                                            className="w-24 mx-2 py-2 px-3 rounded-lg bg-gray-700 border border-gray-600 text-white text-center focus:outline-none focus:border-blue-500"
                                            id="bet-amount"
                                            defaultValue={10}
                                            min={1}
                                            max={1000}
                                        />
                                        <button id="bet-increase" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-white font-bold text-xl hover:bg-blue-800 transition-colors disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
                                    </div>
                                </div>

                                {/* Number of Mines */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-400">Number of Mines</label>
                                    <select
                                        id="mine-count"
                                        className="w-20 p-1 rounded-lg text-white text-lg bg-gray-700 border-gray-600"
                                    >
                                        {/* Options to be added dynamically */}
                                    </select>
                                </div>

                                {/* Game Buttons */}
                                <div className="space-y-4">
                                    <button
                                        id="game-action-btn"
                                        className="w-full py-3 rounded-lg text-lg font-semibold bg-blue-700 text-white hover:bg-blue-800 transition-colors disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Bet
                                    </button>
                                </div>

                                {/* Game Info */}
                                <div className="space-y-4 text-center pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="text-gray-400">Multiplier</p>
                                        <p id="multiplier-display" className="text-2xl font-bold text-white">1.00x</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Potential Winnings</p>
                                        <p id="winnings-display" className="text-2xl font-bold text-green-400">$0.00</p>
                                    </div>
                                </div>

                                {/* Message Box */}
                                <div id="message-box" className="info-box p-4 rounded-lg mt-4 text-center hidden">
                                    <p id="message-text" className="font-semibold"></p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#024495] p-3'>
                            <div className='flex justify-between items-center'>

                                <div className='flex justify-start items-center space-x-2 m-1' >
                                    <div className='bg-[#0267A5] px-5 text-white rounded'>Mines</div>
                                    <div className='bg-[#F58D13] px-5 text-black rounded'>How to Play?</div>
                                </div>
                                <div className='bg-[#F58D13] px-6 rounded -mt-2 rounded-r rounded-l rounded-b text-white'>Fun Mode</div>
                                <div className='flex justify-end items-center gap-1'>
                                    <span className='text-[12px] text-white'>
                                        1,0000.00 : USD
                                    </span>
                                    <div className='bg-red-300 py-[1.5px] px-2 rounded-full cursor-pointer'>
                                        {/* <MdMenu /> */}=
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >

        </>

    )
}

export default Dashboard;