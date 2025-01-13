import React, { useEffect, useState, useRef } from "react";
import { topics } from "./examTopics";

function Exam() {
    const [currentTopic, setCurrentTopic] = useState(0);
    const [doneCard, setDoneCard] = useState(null);
    const [currentCard, setCurrentCard] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [points, setPoints] = useState(0);
    const checkboxesRef = useRef([]);

    const [textAnswer, setTextAnswer] = useState("");

    const advance = async (points) => {
        let tDoneCard = doneCard;
        let tCurrentCard = currentCard;
        let tCurrentTopic = currentTopic;

        // Multiple choice
        if (points === null) {
            const correctAnswers = topics[currentTopic].cards[currentCard].answer;
            const selectedAnswers = checkboxesRef.current.map((checkbox) => checkbox.checked);

            const minusPoints = 1 / (topics[currentTopic].cards[currentCard].choices.length - correctAnswers.length);
            const plusPoints = 1 / correctAnswers.length;

            let points = 0;
            for (let i = 0; i < selectedAnswers.length; i++) {
                if (!selectedAnswers[i]) continue;
                if (correctAnswers.includes(i + 1)) {
                    points += plusPoints;
                } else {
                    points -= minusPoints;
                }
            }

            if (points < 0) points = 0;
            setPoints((prev) => prev + points);
        } else {
            setPoints((prev) => prev + points);
        }

        if (tDoneCard !== null) {
            tCurrentTopic++;
            tDoneCard = null;
        } else {
            tDoneCard = tCurrentCard;
        }

        setCurrentTopic(tCurrentTopic);
        if (tCurrentTopic === topics.length) return;

        setShowAnswer(false);
        let rnd = randomIndex(topics[tCurrentTopic].cards.length);
        while (rnd === tDoneCard) {
            rnd = randomIndex(topics[tCurrentTopic].cards.length);
        }
        tCurrentCard = rnd;

        setTextAnswer("");
        for (const checkbox of checkboxesRef.current) {
            if (checkbox) checkbox.checked = false;
        }

        setDoneCard(tDoneCard);
        setCurrentCard(tCurrentCard);
    };

    const randomIndex = (length) => Math.floor(Math.random() * length);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const rnd = randomIndex(topics[currentTopic].cards.length);
        setCurrentTopic(0);
        setCurrentCard(rnd);
    }, []);

    if (currentTopic >= topics.length) {
        return (
            <div className="relative flex flex-col h-screen bg-gray-900 text-gray-200">
                <header className="bg-gray-800 p-4 shadow-md z-10">
                    <h1 className="text-3xl font-bold text-center">easy-rsa | Prüfung</h1>
                </header>
                <main className="flex-grow flex flex-col items-center m-4 space-y-2">
                    <h1>Prüfung beendet</h1>
                    <p>
                        Du hast {points}/{topics.length * 2} Punkte erreicht.
                    </p>
                    <p>
                        Das wäre eine Note <strong>{((points / (topics.length * 2)) * 5 + 1).toFixed(1)}</strong>
                    </p>
                </main>
                <footer className="bg-gray-800 p-4 text-center z-10">
                    <p>&copy; 2025 Luis Hutterli</p>
                </footer>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col h-screen bg-gray-900 text-gray-200">
            <header className="bg-gray-800 p-4 shadow-md z-10">
                <h1 className="text-3xl font-bold text-center">easy-rsa | Prüfung</h1>
            </header>
            <main className="flex-grow flex flex-col items-center m-4 space-y-2">
                <h1>{topics[currentTopic].title}</h1>

                {/* Card */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-[800px] w-full mx-10">
                    <h4>{topics[currentTopic].cards[currentCard].question}</h4>
                    {topics[currentTopic].cards[currentCard].type === "text" && (
                        <textarea
                            className="w-full h-32 p-2 bg-gray-700 text-gray-200 rounded-md"
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                        />
                    )}
                    {topics[currentTopic].cards[currentCard].type === "multiple-choice" && (
                        <div className="flex flex-col space-y-2">
                            {topics[currentTopic].cards[currentCard].choices.map((choice, index) => (
                                <label key={choice} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        ref={(el) => {
                                            checkboxesRef.current[index] = el;
                                        }}
                                        disabled={showAnswer}
                                    />
                                    {choice}
                                </label>
                            ))}
                        </div>
                    )}
                    {showAnswer &&
                        (topics[currentTopic].cards[currentCard].type === "text" ? (
                            <p className="mt-4">{topics[currentTopic].cards[currentCard].answer}</p>
                        ) : (
                            <div className="mt-4">
                                {console.log(topics[currentTopic].cards[currentCard].answer)}
                                {topics[currentTopic].cards[currentCard].answer?.map((answer) => (
                                    <p key={answer}>
                                        {answer}) {topics[currentTopic].cards[currentCard].choices[answer - 1]}
                                    </p>
                                ))}
                            </div>
                        ))}
                    {!showAnswer ? (
                        <button type="button" className="bg-gray-700 p-2 rounded-md mt-4" onClick={() => setShowAnswer(!showAnswer)}>
                            Antwort anzeigen
                        </button>
                    ) : (
                        <CardActions type={topics[currentTopic].cards[currentCard].type} advance={advance} />
                    )}
                </div>
            </main>
            <footer className="bg-gray-800 p-4 text-center z-10">
                <p>&copy; 2025 Luis Hutterli</p>
            </footer>
        </div>
    );
}

export default Exam;

function CardActions({ type, advance }) {
    if (type === "text") {
        return (
            <div className="flex flex-row space-x-2">
                <button type="button" className="bg-gray-700 p-2 rounded-md mt-4 hover:bg-green-700" onClick={() => advance(1)}>
                    Richtig
                </button>
                <button type="button" className="bg-gray-700 p-2 rounded-md mt-4 hover:bg-yellow-700" onClick={() => advance(0.5)}>
                    Teilweise richtig
                </button>
                <button type="button" className="bg-gray-700 p-2 rounded-md mt-4 hover:bg-red-700" onClick={() => advance(0)}>
                    Falsch
                </button>
            </div>
        );
    }
    return (
        <button type="button" className="bg-gray-700 p-2 rounded-md mt-4 hover:bg-green-700" onClick={() => advance(null)}>
            Weiter
        </button>
    );
}
