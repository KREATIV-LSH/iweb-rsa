import React, { useState } from "react";
import { InlineMath } from "react-katex";

function VisPrimCheck() {
    const [p, setP] = useState(null);
    const [output, setOutput] = useState(null);

    // Genau gleiche Funktionen wie im Markdown
    function mrt(n, basis) {
        let exponent = (n - 1) / 2;
        let halbierungen = 1; // Zählt wie oft der Exponent halbiert wurde

        // Halbiert den Exponenten, bis er ungerade ist
        while (exponent % 2 === 0) {
            exponent /= 2;
            halbierungen++;
        }

        let aktuellesErgebnis = basis % n;
        let result = aktuellesErgebnis;

        // Binäre Exponentiation
        let tempExponent = exponent;
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        while ((tempExponent = Math.floor(tempExponent / 2)) > 0) {
            aktuellesErgebnis = (aktuellesErgebnis * aktuellesErgebnis) % n;
            if (tempExponent % 2 === 1) result = (result * aktuellesErgebnis) % n;
        }

        // Erste Bedinungen
        if (result === 1 || result === n - 1) return true;

        // Weitere Bedingungen
        while (--halbierungen > 0 && result > 1) {
            result = (result * result) % n;
            if (result === n - 1) return true;
        }
        return false;
    }
    function istPrim(n, wiederholungen = 5) {
        if (Number.isNaN(n)) return false;
        if (n <= 1) return false; // 1, 0 und alle negativen Zahlen sind keine Primzahlen
        if (n <= 3) return true; // 2 und 3 sind Primzahlen
        if (n % 2 === 0) return false; // Gerade Zahlen können keine Primzahlen sein (ausserd 2 selber)

        for (let i = 0; i < wiederholungen; i++) {
            // Zufällige Basis zwischen 2 und Zahl - 2
            const basis = Math.floor(Math.random() * (n - 3)) + 2;

            if (!mrt(n, basis)) return false; // Sobald eine Basis nicht wahrschenlich Prim ist, ist die Zahl nicht Prim
        }

        return true;
    }

    const calc = () => {
        if (p === null) return;
        if (Number.isNaN(p)) {
            setOutput("Bitte eine Zahl eingeben.");
            return;
        }

        const isPrim = istPrim(p);
        setOutput(isPrim ? "Die Zahl ist wahrscheinlich prim" : "Die Zahl ist definitiv nicht prim");
    };



    return (
        <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Interaktive Prim-Überprüfung</h1>

            <div className="space-y-4">
                <p className="text-xl">
                    <strong>Eine Zahl wählen:</strong>
                </p>
                <div className="flex space-x-4">
                    <input
                        type="number"
                        value={p}
                        className="w-24 p-2 rounded bg-gray-700 text-white"
                        onChange={(e) => setP(Number.parseInt(e.target.value))}
                    />
                </div>
                <button type="button" className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded" onClick={calc}>
                    Überprüfen
                </button>
                {output && <p className="text-xl mt-4">{output}</p>}
            </div>
        </div>
    );
}

export default VisPrimCheck;
