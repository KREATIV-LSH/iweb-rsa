import React from "react";
import { Link } from "react-router";

function App() {

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-200">
            <header className="bg-gray-800 p-4 shadow-md">
                <h1 className="text-3xl font-bold text-center">IWeb RSA</h1>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl mb-4">Entdecke ...</h2>
                <p className="mb-8 text-center max-w-2xl">
                    ....
                </p>
                <Link to="/article/1" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Beginne!</Link>
            </main>
            <footer className="bg-gray-800 p-4 text-center">
                <p>&copy; 2024 Luis Hutterli</p>
            </footer>
        </div>
    );
}

export default App;
