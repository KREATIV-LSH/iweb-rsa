import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "../../utils/state/quizReducer";

function Quiz({ title, questions }) {
  const [errors, setErrors] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();
  const pastResults = useSelector((state) =>
    state.quizzes.pastResults
  ); // Filter for past attempts of the same quiz

  const handleAnswerOptionClick = (index) => {
    if (index === questions[currentQuestion].correctAnswer) {
      setSelectedOption(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        handleQuizCompleted();
      }
    } else {
      setErrors(errors + 1);
      setSelectedOption(index);
    }
  };

  const handleQuizCompleted = () => {
    setShowScore(true);
    dispatch(
      addQuiz({
        title,
        errors,
        totalQuestions: questions.length,
        timestamp: new Date().toISOString(),
      })
    );
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setShowScore(false);
    setCurrentQuestion(0);
    setErrors(0);
  }


  return (
    <div className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {pastResults.filter((quiz) => quiz.title === title).length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Letzte Versuche:</h2>
          <ul className="space-y-1">
            {pastResults.filter((quiz) => quiz.title === title).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(-3).map((result, index) => (
              <li
                key={result.timestamp}
                className="flex justify-between items-center p-2 bg-gray-700 rounded-md"
              >
                <span>{new Date(result.timestamp).toLocaleDateString()}</span>
                <span>
                  Fehler: {result.errors}/{result.totalQuestions}
                </span>
                <span>
                  {((1 - result.errors / result.totalQuestions) * 100).toFixed(0)}%
                  korrekt
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showScore ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Du hast {errors} Fehler gemacht</h2>
          <p className="text-lg">
            {errors === 0
              ? "Perfekt! Gut gemacht!"
              : "Übe noch ein wenig, um alles zu meistern."}
          </p>
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto" onClick={resetQuiz}>
            Erneut versuchen
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
          <ul className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <li key={option}>
                <button
                  type="button"
                  className={`w-full py-2 px-4 rounded font-bold text-white ${
                    selectedOption === index
                      ? "bg-red-500"
                      : "bg-blue-500 hover:bg-blue-700"
                  }`}
                  onClick={() => handleAnswerOptionClick(index)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;
