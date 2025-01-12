import React, { useState } from "react";
import { motion } from "framer-motion";
import { InlineMath } from "react-katex";
import { entschluesseln, erstelleSchluessel, verschluesseln, numberToText, textToNumber, nachrichtAufteilen } from "../../utils/rsa";

function VisEnDecode() {
    const [step, setStep] = useState(1);
    const [publicKey, setPublicKey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);

    const [message, setMessage] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState("");

    const [decryptedMessage, setDecryptedMessage] = useState("");

    const createKeys = () => {
        const keys = erstelleSchluessel(32);
        setPublicKey(keys.publicKey);
        setPrivateKey(keys.privateKey);
        setStep(2);
    };

    const encryptMessage = () => {
        if (message.length === 0) return;
        const parts = nachrichtAufteilen(message, publicKey.n);
        const encryptedParts = parts.map((part) => verschluesseln(part, publicKey));
        setEncryptedMessage(encryptedParts.join(", "));
        setStep(3);
    };

    const decryptMessage = () => {
        const parts = encryptedMessage.split(", ");
        // eslint-disable-next-line no-undef
        const decryptedParts = parts.map((part) => entschluesseln(BigInt(part), privateKey));
        setDecryptedMessage(`\\text{${decryptedParts.join("")}}`);
        setStep(4);
    };

    return (
        <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Interaktive Verschlüsselung und Entschlüsselung</h1>

            {step >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4">
                    <p className="text-xl">
                        <strong>1. Schlüsselpaar erstellen</strong>
                    </p>
                    {publicKey && (
                        <p>
                            Öffentlicher Schlüssel: <InlineMath>{`e=${publicKey.e}, n=${publicKey.n}`}</InlineMath>
                        </p>
                    )}
                    {privateKey && (
                        <p>
                            Privater Schlüssel: <InlineMath>{`d=${privateKey.d}, n=${privateKey.n}`}</InlineMath>
                        </p>
                    )}
                    {step === 1 && (
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={createKeys}>
                            Schlüsselpaar erstellen
                        </button>
                    )}
                </motion.div>
            )}

            {step >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4">
                    <p className="text-xl">
                        <strong>2. Nachricht umwandeln & verschlüsseln:</strong>
                    </p>
                    <input
                        type="text"
                        value={message}
                        disabled={step > 2}
                        className={`w-full p-2 rounded ${
                            step > 2 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white"
                        }`}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nachricht eingeben"
                    />
                    {step === 2 && (
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={encryptMessage}>
                            Nachricht verschlüsseln
                        </button>
                    )}
                    {step >= 3 && (
                        <p>
                            Aufgeteilte Nachricht: <InlineMath>{nachrichtAufteilen(message, publicKey.n).join(", ")}</InlineMath>{" "}
                            <br />
                            Nachricht in Zahlen:{" "}
                            <InlineMath>{nachrichtAufteilen(message, publicKey.n).map(textToNumber).join(", ")}</InlineMath>
                        </p>
                    )}
                </motion.div>
            )}

            {step >= 3 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4">
                    <p className="text-xl">
                        <strong>3. Verschlüsselte Nachricht:</strong> <InlineMath>{encryptedMessage}</InlineMath>
                    </p>
                    {step === 3 && (
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={decryptMessage}>
                            Nachricht entschlüsseln
                        </button>
                    )}
                </motion.div>
            )}

            {step >= 4 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4">
                    <p className="text-xl">
                        <strong>4. Entschlüsselte Nachricht:</strong> <InlineMath>{decryptedMessage}</InlineMath>
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default VisEnDecode;
