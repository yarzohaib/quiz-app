import React from 'react';
import { MdClose } from 'react-icons/md';

interface Option {
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    question: string;
    options: Option[];
}

interface QuizCardProps {
    question: Question;
    onSelectAnswer: (option: string) => void;
    selectedAnswer: string | null;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onSelectAnswer, selectedAnswer }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const correctOption = question.options.find(option => option.isCorrect)?.text;

    return (
        <div className="p-8 bg-sky-50 rounded-lg shadow-md animate-fadeIn">
            <h2 className="text-2xl font-serif text-center mb-10">{question.question}</h2>

            <div className="grid grid-cols-2 gap-4">
                {question.options.map((option) => {
                    const isSelected = selectedAnswer === option.text;
                    const isWrong = isSelected && !option.isCorrect; // Check if it's a wrong selection
                    const isCorrect = option.isCorrect; // Check if it's the correct option
                    const isDisabled = selectedAnswer !== null; // Gray out other options after selecting one

                    return (
                        <div key={option.text} className="relative">
                            <button
                                onClick={() => !selectedAnswer && onSelectAnswer(option.text)}
                                disabled={isDisabled}
                                className={`
                                    border-4 rounded-lg p-4 text-center text-lg font-medium 
                                    transition-all duration-200 h-12 flex items-center justify-center w-full
                                    ${isSelected
                                        ? option.isCorrect
                                            ? 'border-green-500 font-bold'
                                            : 'border-red-500 bg-red-100'
                                        : isCorrect && selectedAnswer
                                            ? 'border-green-500 font-bold'
                                            : isDisabled
                                                ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' // Gray out other options
                                                : 'border-blue-100 hover:border-blue-500 hover:bg-gray-100' // Default state
                                    }
                                `}
                            >
                                {option.text}
                            </button>
                            {isWrong && (
                                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1">
                                    <MdClose size={16} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizCard;

