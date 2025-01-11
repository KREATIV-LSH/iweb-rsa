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
        if (tempExponent % 2 === 1)
            result = (result * aktuellesErgebnis) % n
    }

    // Erste Bedinungen
    if (result === 1 || result === n - 1)
        return true;

    // Weitere Bedingungen
    while (--halbierungen > 0 && result > 1) {
        result = (result * result) % n;
        if (result === n - 1)
            return true;
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

        if (!mrt(n, basis))
            return false; // Sobald eine Basis nicht wahrschenlich Prim ist, ist die Zahl nicht Prim
    }

    return true;
}

// Die ersten 30 Primzahlen
const knownPrimes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127];

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

function erstelleSchluesselPrim(keySize) {
    const bitLaenge = keySize / 2;

    const minimum = Math.pow(2, bitLaenge - 1);
    const maximum = Math.pow(2, bitLaenge) - 1;

    const p = erstellePrim(minimum, maximum);
    let q = erstellePrim(minimum, maximum);

    while (p === q) {
        q = erstellePrim(minimum, maximum);
    }

    return { p, q };
}

function erstelleE(phi_n) {
    let e = erstellePrim(3, phi_n);
    while (ggt(e, phi_n) !== 1) {
        e = erstellePrim(3, phi_n);
    }
    return e;
}

function ggt(a, b) {
    if (b === 0) return a;
    return ggt(b, a % b);
}

// Erweiteter Euklidischer Algorithmus:
function modInverse(e, phi_n) {
    let d = 0;
    let x1 = 0;
    let x2 = 1;
    let y1 = 1;
    let temp_phi_n = phi_n;

    while (e > 0) {
        let temp1 = Math.floor(temp_phi_n / e);
        let temp2 = temp_phi_n % e;
        temp_phi_n = e;
        e = temp2;

        let x = x2 - temp1 * x1;
        let y = d - temp1 * y1;

        x2 = x1;
        x1 = x;
        d = y1;
        y1 = y;
    }

    if (temp_phi_n === 1) {
        return d + phi_n;
    }
}

function erstelleSchluessel(keySize) {
    const { p, q } = erstelleSchluesselPrim(keySize); // 1. Primzahlen erstellen
    console.log("p:", p);
    console.log("q:", q);
    const n = p * q;                                  // 2. Modulos berechnen
    const phi_n = (p - 1) * (q - 1);                  // 3. Eulerische Phi-Funktion berechnen
    const e = erstelleE(phi_n);                       // 4. Öffentlicher Exponent berechnen
    const d = modInverse(e, phi_n);                   // 5. Privater Exponent berechnen

    return {
        publicKey: { e, n },     // Öffentlicher Schlüssel bestehend aus dem öffentlichen Exponenten und dem Modulos
        privateKey: { d, n }     // Privater Schlüssel bestehend aus dem privaten Exponenten und dem Modulos
    };
}

function textToNumber(text) {
    let number = BigInt(0);
    for (let i = 0; i < text.length; i++) {
        number = number * BigInt(128) + BigInt(text.charCodeAt(i));
    }
    return number;
}

function numberToText(number) {
    let text = "";
    while (number > 0) {
        text = String.fromCharCode(Number(number % BigInt(128))) + text;
        number = number / BigInt(128);
    }
    return text;
}

// Helper-Funktion für Modular Exponentiation
function modPow(base, exponent, modulus) {
    if (modulus === 1n) return 0n;
    let result = 1n;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n; // Exponent halbieren
        base = (base * base) % modulus;
    }
    return result;
}

function verschluesseln(nachricht, publicKey) {
    const { e, n } = publicKey;
    const m = textToNumber(nachricht);
    return modPow(m, BigInt(e), BigInt(n));
}

function entschluesseln(ciphertext, privateKey) {
    const { d, n } = privateKey;
    const m = modPow(ciphertext, BigInt(d), BigInt(n));
    return numberToText(m);
}


const keySize = 50;
const { publicKey, privateKey } = erstelleSchluessel(keySize);
console.log("Öffentlicher Schlüssel:", publicKey);
console.log("Privater Schlüssel:", privateKey);

const nachricht = "abcdef";
console.log("Nachricht:", nachricht);
console.log("Nachricht:", textToNumber(nachricht));

const ciphertext = verschluesseln(nachricht, publicKey);
console.log("Ciphertext:", ciphertext.toString());

const entschluesselteNachricht = entschluesseln(ciphertext, privateKey);
console.log("Entschlüsselte Nachricht:", textToNumber(entschluesselteNachricht));
console.log("Entschlüsselte Nachricht:", entschluesselteNachricht);