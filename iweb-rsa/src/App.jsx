import React from "react";
import { Link } from "react-router";
import BackgroundAnimation from "./components/BackgroundAnimation";

function App() {
    return (
        <div className="relative flex flex-col h-screen bg-gray-900 text-gray-200">
            <BackgroundAnimation />
            <header className="bg-gray-800 p-4 shadow-md z-10">
                <h1 className="text-3xl font-bold text-center">easy-rsa</h1>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
                <h2 className="text-2xl mb-4">Entdecke den RSA Algorithmus</h2>
                <p className="text-center max-w-2xl">
                    Lerne die Grundlagen der Verschlüsselung und wie du deine Daten sicher hältst. Starte jetzt und entdecke spannende Inhalte und interaktive Visualisierungen.
                </p>
                <p className="mb-8 text-center max-w-2xl">
                    Lerne wie du RSA in JavaScript implementieren kannst.
                </p>
                <Link to="/article/1" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Beginne!</Link>
            </main>
            <footer className="bg-gray-800 p-4 text-center z-10">
                <p>&copy; 2025 Luis Hutterli</p>
            </footer>
        </div>
    );
}

export default App;