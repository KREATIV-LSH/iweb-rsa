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

function erstellePrim1(minimum, maximum) {
    let zuffalsZahl;

    // Solange eine Zufallszahl generieren, bis die Zahl eine Primzahl ist
    while (!istPrim(zuffalsZahl)) {
        // Zufällige Zahl zwischen minimum und maximum
        zuffalsZahl = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }
        
    return zuffalsZahl;
}

const knownPrimes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127];

function erstellePrim2(minimum, maximum) {
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

function benchmark(func, label, min, max, iterations = 1000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        func(min, max);
    }
    const end = performance.now();
    console.log(`${label} took ${(end - start).toFixed(2)} milliseconds for ${iterations} iterations.`);
}


const min = 100000000;
const max = min * 2;
const iterations = 2000;

benchmark(erstellePrim1, "erstellePrim1", min, max, iterations);
benchmark(erstellePrim2, "erstellePrim2", min, max, iterations);