import React, { useState } from "react";

function Quiz( {title, questions} ) {
  const [errors, setErrors] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswerOptionClick = (index) => {
    if (index === questions[currentQuestion].correctAnswer) {
      setSelectedOption(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    } else {
      setErrors(errors + 1);
      setSelectedOption(index);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {showScore ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Du hast {errors} Fehler gemacht</h2>
          <p className="text-lg">{errors === 0 ? "Perfekt! Gut gemacht!" : "Übe noch ein wenig, um alles zu meistern."}</p>
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
                    selectedOption === index ? "bg-red-500" : "bg-blue-500 hover:bg-blue-700"
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