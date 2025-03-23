

// 'use client';

// import { useState, useEffect } from 'react';
// import QuizCard from '@/app/components/QuizCard';
// import ResultCard from '@/app/components/ResultCard';
// import StartScreen from "@/app/components/StartScreen";
// import { MdArrowForward } from "react-icons/md";

// interface Option {
//   text: string;
//   isCorrect: boolean;
// }

// interface Question {
//   id: number;
//   question: string;
//   options: Option[];
// }

// export default function Home() {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [timer, setTimer] = useState(29); // Starting timer at 29 seconds
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [showNextButton, setShowNextButton] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch('/data/questions.json');
//         const data = await response.json();
//         setQuestions(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading questions:', error);
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Timer effect
//   useEffect(() => {
//     if (loading || timer <= 0 || showNextButton) return;

//     const interval = setInterval(() => {
//       setTimer(prevTime => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer, loading, showNextButton]);

//   const handleAnswerSelect = (optionText: string) => {
//     setSelectedAnswer(optionText);
//     setShowNextButton(true);

//     const currentQuestion = questions[currentQuestionIndex];
//     const selectedOption = currentQuestion.options.find(option => option.text === optionText);

//     if (selectedOption && selectedOption.isCorrect) {
//       setScore(prevScore => prevScore + 1);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//       setSelectedAnswer(null);
//       setShowNextButton(false);
//       setTimer(29); // Reset timer for next question
//     } else {
//       setQuizCompleted(true); // Show result when last question is reached
//     }
//   };

//   const restartQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setSelectedAnswer(null);
//     setShowNextButton(false);
//     setTimer(29);
//     setQuizCompleted(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl font-semibold">Loading quiz...</div>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center p-4">
//       <div className="max-w-3xl w-full quiz-container rounded-lg shadow-md overflow-hidden bg-white">
//         <div className="flex items-center justify-between p-4 border-b border-opacity-20">
//           <h1 className="text-xl font-bold">Guess the Country by Its Neighbors Quiz</h1>
//           <div className="flex items-center gap-4">
//             <div className="relative h-14 w-14">
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="h-12 w-12 rounded-full border-4 border-red-500 flex items-center justify-center">
//                   <span className="text-lg font-bold">{timer}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-lg font-medium">{currentQuestionIndex + 1} of {questions.length}</div>
//               <div className="text-lg">Score: {score}</div>
//             </div>
//           </div>
//         </div>

//         {quizCompleted ? (
//           <ResultCard score={score} totalQuestions={questions.length} onRestart={restartQuiz} />
//         ) : (
//           <div className="relative">
//             <QuizCard
//               question={questions[currentQuestionIndex]}
//               onSelectAnswer={handleAnswerSelect}
//               selectedAnswer={selectedAnswer}
//             />

//             {showNextButton && (
//               <div className="flex justify-center pb-6 bg-sky-50">
//                 <button
//                   onClick={handleNextQuestion}
//                   className="bg-blue-900 hover:bg-blue-950 text-white py-2 px-6 rounded-md flex items-center gap-2 transition-colors border-4 border-black"
//                 >
//                   Next <MdArrowForward size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import QuizCard from '@/app/components/QuizCard';
import ResultCard from '@/app/components/ResultCard';
import StartScreen from '@/app/components/StartScreen';
import { MdArrowForward } from "react-icons/md";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(29); // Timer starts at 29 seconds
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch questions on page load
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/data/questions.json');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Timer Effect
  useEffect(() => {
    if (loading || timer <= 0 || showNextButton) return;

    const interval = setInterval(() => {
      setTimer(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, loading, showNextButton]);

  // Start Quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  // Handle Answer Selection
  const handleAnswerSelect = (optionText: string) => {
    setSelectedAnswer(optionText);
    setShowNextButton(true);

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(option => option.text === optionText);

    if (selectedOption && selectedOption.isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  // Move to Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowNextButton(false);
      setTimer(29); // Reset timer for next question
    } else {
      setQuizCompleted(true); // Show results when quiz is completed
    }
  };

  // Restart Quiz
  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowNextButton(false);
    setTimer(29);
    setQuizCompleted(false);
  };

  // Show Start Screen First
  if (!quizStarted) {
    return <StartScreen onStart={handleStartQuiz} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading quiz...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full quiz-container rounded-lg shadow-md overflow-hidden bg-white">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-opacity-20">
          <h1 className="text-xl font-bold">Guess the Country by Its Neighbors Quiz</h1>
          <div className="flex items-center gap-4">
            {/* Timer Display */}
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-red-500 flex items-center justify-center">
                  <span className="text-lg font-bold">{timer}</span>
                </div>
              </div>
            </div>
            {/* Question Number & Score */}
            <div className="text-right">
              <div className="text-lg font-medium">{currentQuestionIndex + 1} of {questions.length}</div>
              <div className="text-lg">Score: {score}</div>
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        {quizCompleted ? (
          <ResultCard score={score} totalQuestions={questions.length} onRestart={restartQuiz} />
        ) : (
          <div className="relative">
            <QuizCard
              question={questions[currentQuestionIndex]}
              onSelectAnswer={handleAnswerSelect}
              selectedAnswer={selectedAnswer}
            />

            {/* Next Button */}
            {showNextButton && (
              <div className="flex justify-center pb-6 bg-sky-50">
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-900 hover:bg-blue-950 text-white py-2 px-6 rounded-md flex items-center gap-2 transition-colors border-4 border-black"
                >
                  Next <MdArrowForward size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
