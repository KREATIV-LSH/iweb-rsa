import React, { useState } from "react";

function Quiz_1_2() {
  const [errors, setErrors] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      question: "Welcher Schlüssel wird bei der symmetrischen Verschlüsselung verwendet?",
      options: [
        "Nur ein Schlüssel für Verschlüsselung und Entschlüsselung",
        "Ein öffentlicher und ein privater Schlüssel",
        "Kein Schlüssel ist nötig",
        "Es werden zufällige Schlüssel generiert",
      ],
      correctAnswer: 0,
    },
    {
      question: "Was ist ein Vorteil der asymmetrischen Verschlüsselung?",
      options: [
        "Sie ist schneller als symmetrische Verschlüsselung",
        "Kein sicherer Austausch des Schlüssels nötig",
        "Man benötigt keinen Schlüssel",
        "Sie funktioniert nur bei kleinen Datenmengen",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welches Verfahren nutzt ein Schlüsselpaar?",
      options: [
        "Symmetrische Verschlüsselung",
        "Asymmetrische Verschlüsselung",
        "Beides",
        "Keines von beiden",
      ],
      correctAnswer: 1,
    },
  ];

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
      <h1 className="text-2xl font-bold mb-4">Quiz Symmetrische vs. Asymmetrische Verschlüsselung</h1>
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

export default Quiz_1_2;