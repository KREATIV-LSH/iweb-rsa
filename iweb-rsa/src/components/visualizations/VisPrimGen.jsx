import React, { useState } from "react";

function VisPrimGen() {
    const [output, setOutput] = useState(null);
    const [min, setMin] = useState(1000);
    const [max, setMax] = useState(10000);

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

    const knownPrimes = [
        3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127,
    ];

    function erstellePrim(minimum, maximum) {
        let zuffalsZahl;

        // Solange eine Zufallszahl generieren, bis die Zahl eine Primzahl ist
        let isPrim = false;
        while (!isPrim) {
            // Zufällige Zahl zwischen minimum und maximum
            zuffalsZahl = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            zuffalsZahl |= 1;

            // Prüfen, ob die Zahl durch bekannte Primzahlen teilbar ist
            let hasKnownMod = false;
            for (const prime of knownPrimes) {
                if (zuffalsZahl % prime === 0) {
                    hasKnownMod = true;
                    break;
                }
            }
            if (hasKnownMod) continue;

            isPrim = istPrim(zuffalsZahl);
        }

        return zuffalsZahl;
    }

    const calc = () => {
        if (min === null || max === null) return;
        if (Number.isNaN(min) || Number.isNaN(max)) {
            setOutput("Bitte eine Zahl eingeben.");
            return;
        }

        if (min >= max) {
            setOutput("Das Minimum muss kleiner als das Maximum sein.");
            return;
        }

        if (min < 200) {
            setOutput("Das Minimum muss größer als 200 sein.");
            return
        }

        if (min > 1_000_000_000 || max > 1_000_000_000) {
            setOutput("Die Zahlen dürfen nicht größer als 1'000'000'000 sein.");
            return;
        }

        const prime = erstellePrim(min, max);
        setOutput(`Primzahl: ${prime}`);
    }

    return (
            <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Interaktive Prim-Erstellung</h1>
    
                <div className="space-y-4">
                    <p className="text-xl">
                        <strong>Minimum & Maximum wählen:</strong>
                    </p>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            value={min}
                            min={200}
                            max={1_000_000_000}
                            className="w-24 p-2 rounded bg-gray-700 text-white"
                            onChange={(e) => setMin(Number.parseInt(e.target.value))}
                        />
                        <input
                            type="number"
                            value={max}
                            min={200}
                            max={1_000_000_000}
                            className="w-24 p-2 rounded bg-gray-700 text-white"
                            onChange={(e) => setMax(Number.parseInt(e.target.value))}
                        />
                    </div>
                    <button type="button" className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded" onClick={calc}>
                        Erstellen
                    </button>
                    {output && <p className="text-xl mt-4">{output}</p>}
                </div>
            </div>
    );
}

export default VisPrimGen;