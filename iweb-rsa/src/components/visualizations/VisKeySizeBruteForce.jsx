import React, { useEffect, useState } from "react";

function VisKeySizeBruteForce() {
    const [keySize, setKeySize] = useState(1024);
    const [output, setOutput] = useState(null);

    useEffect(() => {
        const ln2 = Math.log(2);

        // Core calculation
        const innerTerm = keySize * ln2;
        const root = 4 - (keySize - 32) * (1 / (1024 - 32));
        const cubicRoot = innerTerm ** (1 / root);
        const logTerm = Math.log(innerTerm);
        const exponent = (2 / 3) * cubicRoot * logTerm;
        const seconds = 2 ** exponent / 1.5 + 120;


        // Convert to human readable format
        const timeUnits = ["s", "m", "h", "d", "y"];
        let time = seconds;
        let unit = 0;
        while (time > 60 && unit < timeUnits.length - 1) {
            time /= 60;
            unit++;
        }
        
        setOutput(`Es dauert ca. ${time.toFixed(0)} ${timeUnits[unit]} um einen Schlüssel der Grösse ${keySize} Bit zu knacken.`);
    }, [keySize]);

    return (
        <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Wie lange geht es um einen Schlüssel zu knacken?</h1>

            <div className="space-y-4">
                <p className="text-xl">
                    <strong>Schlüsselgrösse: {keySize} Bit</strong>
                </p>
                <input
                    type="range"
                    min="32"
                    max="1024"
                    value={keySize}
                    className="w-full"
                    onChange={(e) => setKeySize(Number.parseInt(e.target.value))}
                />
                {output && <p className="text-xl mt-4">{output}</p>}
            </div>
        </div>
    );
}

export default VisKeySizeBruteForce;
