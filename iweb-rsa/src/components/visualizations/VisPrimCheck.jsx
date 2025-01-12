import React, { useState } from "react";
import { istPrim } from "../../utils/primes";

function VisPrimCheck() {
    const [p, setP] = useState(null);
    const [output, setOutput] = useState(null);

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
