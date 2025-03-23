import React from 'react';
import { FiRefreshCw } from "react-icons/fi";

interface ResultCardProps {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ score, totalQuestions, onRestart }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold bg-blue-900 text-white h-12 w-40 pt-1.5 rounded-lg">Congrats!
            </h2>
            <p className="text-lg mt-2">Your Score:</p>
            <div className="text-4xl font-extrabold text-blue-900 mt-2">
                {score} / {totalQuestions}
            </div>
            <button
                onClick={onRestart}
                className="mt-4 flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 py-2 px-6 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition">
                <FiRefreshCw size={18} />
                Play Again
            </button>
        </div>
    );
};

export default ResultCard;

