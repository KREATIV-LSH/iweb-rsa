export const topics = [
    {
        title: "Grundlagen der Verschlüsselung",
        cards: [
            {
                type: "text",
                question:
                    "Was ist der Hauptunterschied zwischen symmetrischer und asymmetrischer Verschlüsselung? Bezogen auf Schlüssel und auch deren Austausch.",
                answer: "Symmetrische Verschlüsselung verwendet denselben Schlüssel zum Verschlüsseln und Entschlüsseln. Dieser Schlüssel muss sicher ausgetauscht werden. Asymmetrische Verschlüsselung verwendet zwei Schlüssel, einen öffentlichen und einen privaten. Der öffentliche Schlüssel kann frei verteilt werden, während der private Schlüssel geheim gehalten wird.",
            },
            {
                type: "multiple-choice",
                question: "Welches der folgenden Beispiele ist ein Anwendungsfall für symmetrische Verschlüsselung?",
                choices: ["Password-Hashing mit sha256", "Datenbankverschlüsselung mit AES", "HTTPS mit RSA", "Digitale Signatur"],
                answer: [2],
            },
            {
                type: "multiple-choice",
                question: "Welches der folgenden Beispiele ist ein Anwendungsfall für asymmetrische Verschlüsselung?",
                choices: ["Password-Hashing mit sha256", "Datenbankverschlüsselung mit AES", "HTTPS mit RSA", "Digitale Signatur"],
                answer: [3,4]
            },
        ],
    },
    {
        title: "RSA-Funktionalität",
        cards: [
            {
                type: "multiple-choice",
                question: "Auf welcher Schwierigkeit basiert RSA?",
                choices: ["Speicherung grosser Zahlen", "Addition grosser Zahlen", "Multiplikation grosser Zahlen", "Faktorisierung grosser Zahlen"],
                answer: [4],
            },
            {
                type: "multiple-choice",
                question: "Aus was besteht der öffentliche Schlüssel?",
                choices: ["e und n", "d und n", "p und q", "e und d"],
                answer: [1],
            },
            {
                type: "text",
                question: "Wieso darf der öffentliche Schlüssel frei verteilt werden?",
                answer: "Der öffentliche Schlüssel kann frei verteilt werden, da er nur zum Verschlüsseln verwendet wird. Um die Nachricht zu entschlüsseln, wird der private Schlüssel benötigt.",
            },
            {
                type: "text",
                question: "Wieso hashen wir Nachrichten, bevor wir sie Signieren?",
                answer: "Wir hashen Nachrichten, bevor wir sie signieren, um die Grösse der Nachricht zu reduzieren. Die Signatur wird dann auf den Hashwert angewendet, was effizienter ist.\nAuch wird so erschwert, dass ein Angreifer den Private Key aus der Signatur statistisch ableiten kann.",
            }
        ]
    },
    {
        title: "Implementierung",
        cards: [
            {
                type: "multiple-choice",
                question: "Was macht der Miller-Rabin Algorithmus?",
                choices: ["Primfaktorzerlegung", "Primmzahlgenerierung", "Schlüsselgenerierung", "Primzahltest"],
                answer: [4],
            },
            {
                type: "text",
                question: "Was bedeutet es, wenn zwei Zahlen zueinander relativ prim sind? Auch bekannt als teilerfremd.",
                answer: "Zwei Zahlen sind zueinander relativ prim, wenn sie keinen gemeinsamen Teiler ausser 1 haben. Also ggt(a,b) = 1.",
            },
            {
                type: "multiple-choice",
                question: "Welche der folgenden Zahlen sind relativ prim zu 15?",
                choices: ["3", "5", "7", "9"],
                answer: [3,4],
            },
            {
                type: "text",
                question: "Aus was besteht ein RSA-Schlüsselpaar?",
                answer: "Ein RSA-Schlüsselpaar besteht aus einem öffentlichen und einem privaten Schlüssel. Der öffentliche Schlüssel besteht aus e und n, der private Schlüssel aus d und n.",
            },
        ]
    },
    {
        title: "Sicherheit",
        cards: [
            {
                type: "multiple-choice",
                question: "Welche Schlüsselgrösse reicht heute für RSA?",
                choices: ["256 Bit", "512 Bit", "1024 Bit", "2048 Bit",],
                answer: [4],
            },
            {
                type: "text",
                question: "Welche Art von Angriff kann auftreten, wenn schlechte Primzahlen für p und q gewählt werden?",
                answer: "Wenn schlechte Primzahlen für p und q gewählt werden, kann ein Angreifer den privaten Schlüssel durch Faktorisierung von n berechnen. Dieser Angriff wird als Faktorisierungsangriff bezeichnet.",
            },
        ]
    }
];
        
