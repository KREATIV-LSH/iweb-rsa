import React, { useState } from "react";
import { motion } from "framer-motion";
import { InlineMath } from "react-katex";
import { modInverse } from "../../utils/rsa";


function VisKeyGeneration() {
  const [step, setStep] = useState(1);
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [n, setN] = useState(null);
  const [phi, setPhi] = useState(null);
  const [e, setE] = useState(17);
  const [d, setD] = useState(null);


  const calculateN = () => {
    setN(p * q);
    setStep(2);
  };

  const calculatePhi = () => {
    setPhi((p - 1) * (q - 1));
    setStep(3);
  };

  const calculateD = () => {
    // eslint-disable-next-line no-undef
    const dValue = modInverse(BigInt(e), BigInt(phi));
    setD(dValue);
    setStep(4);
  };

  return (
    <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Interaktive Schlüsselerzeugung</h1>

      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-xl">
            <strong>1. Primzahlen wählen:</strong> Wähle zwei Primzahlen <InlineMath>p</InlineMath> und <InlineMath>q</InlineMath>.
          </p>
          <div className="flex space-x-4">
            <input
              type="number"
              value={p}
              disabled={step > 1}
              className={`w-24 p-2 rounded ${
                step > 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white"
              }`}
              onChange={(e) => setP(Number.parseInt(e.target.value))}
            />
            <input
              type="number"
              value={q}
              disabled={step > 1}
              className={`w-24 p-2 rounded ${
                step > 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white"
              }`}
              onChange={(e) => setQ(Number.parseInt(e.target.value))}
            />
          </div>
          {step === 1 && (
            <button type="button"
              className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
              onClick={calculateN}
            >
              Modulus (n) berechnen
            </button>
          )}
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-xl">
            <strong>2. Modulus berechnen:</strong> <InlineMath>n = p \cdot q</InlineMath>
          </p>
          <p className="text-lg">
            <InlineMath math={`n = ${p} \\cdot ${q} = ${n}`} />
          </p>
          {step === 2 && (
            <button type="button"
              className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
              onClick={calculatePhi}
            >
              Phi(n) berechnen
            </button>
          )}
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-xl">
            <strong>3. Phi(n) berechnen:</strong> <InlineMath>\phi(n) = (p - 1) \cdot (q - 1)</InlineMath>
          </p>
          <p className="text-lg">
            <InlineMath math={`\\phi(n) = (${p} - 1) \\cdot (${q} - 1) = ${phi}`} />
          </p>
          <p className="text-lg">
            Wähle einen öffentlichen Exponenten <InlineMath>e</InlineMath>, die teilerfremd zu <InlineMath>\phi(n)</InlineMath> ist.
          </p>
          <input
            type="number"
            value={e}
            disabled={step > 3}
            className={`w-24 p-2 rounded ${
              step > 3 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white"
            }`}
            onChange={(e) => setE(Number.parseInt(e.target.value))}
          />
          {step === 3 && (
            <button type="button"
              className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
              onClick={calculateD}
            >
              Privaten Schlüssel (d) berechnen
            </button>
          )}
        </motion.div>
      )}

      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-xl">
            <strong>4. Privaten Schlüssel berechnen:</strong>
          </p>
          <p className="text-lg">
            Finde <InlineMath>d</InlineMath>, sodass <InlineMath>(d \cdot e) \mod \phi(n) = 1</InlineMath>
          </p>
          <p className="text-lg"><InlineMath math={`d = ${d}`} /></p>
          <div className="text-lg">
            <strong>Schlüsselpaar:</strong>
            <ul className="list-disc list-inside">
              <li>Öffentlich: <InlineMath math={`(n = ${n}, e = ${e})`} /></li>
              <li>Privat: <InlineMath math={`(n = ${n}, d = ${d})`} /></li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VisKeyGeneration;
