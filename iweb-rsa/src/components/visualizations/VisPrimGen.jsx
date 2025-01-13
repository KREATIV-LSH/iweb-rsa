import React, { useState } from "react";
import { erstellePrim } from "../../utils/primes";

function VisPrimGen() {
    const [output, setOutput] = useState(null);
    const [min, setMin] = useState(1000);
    const [max, setMax] = useState(10000);

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
            setOutput("Das Minimum muss grösser als 200 sein.");
            return
        }

        if (min > 1_000_000_000 || max > 1_000_000_000) {
            setOutput("Die Zahlen dürfen nicht grösser als 1'000'000'000 sein.");
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