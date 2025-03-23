import React from "react";

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="flex items-center justify-center px-6 py-12 min-h-screen">
            <div className="bg-cover bg-center max-w-5xl w-full mx-auto min-h-[90vh] p-10 rounded-lg shadow-xl flex items-center justify-center"
                style={{ backgroundImage: "url('/images/mapStamps.jpeg')" }}>

                <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full text-center">
                    <div className="bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1 rounded-full inline-block mb-4">
                        Geography & Travel
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                        Guess the Country by Its Neighbors Quiz
                    </h1>

                    <button
                        onClick={onStart}
                        className="bg-blue-900 hover:bg-blue-950 text-white text-lg font-semibold py-2 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        Start Quiz
                    </button>

                    <p className="text-gray-500 mt-4 text-sm">5 Questions</p>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;
