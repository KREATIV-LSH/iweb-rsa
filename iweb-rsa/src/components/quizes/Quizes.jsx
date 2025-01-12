import Quiz from "./Quiz";

// Quiz 1 (md quiz0), Kapitel 1
const q_1 = [
    {
        question: "Was ist der Hauptunterschied zwischen Verschlüsselung und Codierung?",
        options: [
            "Verschlüsselung schützt Daten, Codierung macht Daten lesbar",
            "Verschlüsselung macht Daten lesbar, Codierung schützt Daten",
            "Beide sind dasselbe",
            "Keines von beiden",
        ],
        correctAnswer: 0,
    },
    {
        question: "Was ist Base64?",
        options: [
            "Ein Verschlüsselungsalgorithmus",
            "Ein Codierungsverfahren",
            "Ein Hashing-Algorithmus",
            "Ein Kompressionsverfahren",
        ],
        correctAnswer: 1,
    },
    {
        question: "Was ist UTF-8? UTF-8 ordnet jedem Zeichen (Buchstaben, Sonderzeichen, Emojies ...) eine Zahl zu.",
        options: ["Eine Verschlüsselung", "Eine Codierung"],
        correctAnswer: 1,
    },
];
const Quiz_1 = () => {
    return <Quiz title="Quiz Verschlüsselung vs Codierung" questions={q_1} />;
};

// Quiz 1_2 (md quiz1), Kapitel 1.2
const q_2 = [
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
        options: ["Symmetrische Verschlüsselung", "Asymmetrische Verschlüsselung", "Beides", "Keines von beiden"],
        correctAnswer: 1,
    },
];
const Quiz_1_2 = () => {
    return <Quiz title="Quiz Symmetrische vs. Asymmetrische Verschlüsselung" questions={q_2} />;
}

export { Quiz_1, Quiz_1_2 };
