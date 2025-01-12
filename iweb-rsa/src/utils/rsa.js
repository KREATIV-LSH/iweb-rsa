/* eslint-disable no-undef */
import { erstellePrim, erstelleSchluesselPrim } from './primes.js';

if (typeof BigInt === 'undefined') {
    throw new Error('BigInt is not supported in this environment.');
}

export function erstelleE(phi_n) {
    let e = erstellePrim(3, phi_n);
    while (ggt(e, phi_n) !== 1) {
        e = erstellePrim(3, phi_n);
    }
    return e;
}

export function ggt(a, b) {
    if (b === 0) return a;
    return ggt(b, a % b);
}

// Erweiteter Euklidischer Algorithmus:
export function modInverse(e_in, phi_n) {
    let e = e_in;

    let d = 0n;
    let x1 = 0n;
    let x2 = 1n;
    let y1 = 1n;
    let temp_phi_n = phi_n;

    while (e > 0n) {
        const temp1 = temp_phi_n / e;
        const temp2 = temp_phi_n % e;
        temp_phi_n = e;
        e = temp2;

        const x = x2 - temp1 * x1;
        const y = d - temp1 * y1;

        x2 = x1;
        x1 = x;
        d = y1;
        y1 = y;
    }

    if (temp_phi_n === 1n) {
        return d + phi_n;
    }
}

export function erstelleSchluessel(keySize) {
    const { p, q } = erstelleSchluesselPrim(keySize); // 1. Primzahlen erstellen
    const n = p * q;                                  // 2. Modulos berechnen
    const phi_n = (p - 1) * (q - 1);                // 3. Eulerische Phi-Funktion berechnen
    const e = erstelleE(phi_n);                       // 4. Öffentlicher Exponent berechnen
    const d = modInverse(BigInt(e), BigInt(phi_n));                   // 5. Privater Exponent berechnen

    return {
        publicKey: { e, n },     // Öffentlicher Schlüssel bestehend aus dem öffentlichen Exponenten und dem Modulos
        privateKey: { d, n }     // Privater Schlüssel bestehend aus dem privaten Exponenten und dem Modulos
    };
}

export function textToNumber(text) {
    let number = 0n;
    for (let i = 0; i < text.length; i++) {
        number = number * 128n + BigInt(text.charCodeAt(i));
    }
    return number;
}

export function numberToText(number_in) {
    let number = number_in;
    let text = "";
    while (number > 0n) {
        text = String.fromCharCode(Number(number % 128n)) + text;
        number = number / 128n;
    }
    return text;
}

// Helper-Funktion für Modular Exponentiation
export function modPow(base_in, exponent_in, modulus) {
    if (modulus === 1n) return 0n;
    let result = 1n;
    let base = base_in % modulus;
    let exponent = exponent_in;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n; // Exponent halbieren
        base = (base * base) % modulus;
    }
    return result;
}

export function verschluesseln(nachricht, publicKey) {
    const { e, n } = publicKey;
    const m = textToNumber(nachricht);
    return modPow(m, BigInt(e), BigInt(n));
}

export function entschluesseln(ciphertext, privateKey) {
    const { d, n } = privateKey;
    const m = modPow(ciphertext, BigInt(d), BigInt(n));
    return numberToText(m);
}

export function nachrichtAufteilen(nachricht, n) {
    const maxLength = Math.floor(Math.log2(n) / 7) - 1;
    const parts = [];
    for (let i = 0; i < nachricht.length; i += maxLength) {
        parts.push(nachricht.slice(i, i + maxLength));
    }
    return parts;
}