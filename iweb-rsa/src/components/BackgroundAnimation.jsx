import { transform } from "framer-motion";
import React from "react";

const BackgroundAnimation = () => {
    const generateRandomStyle = () => {
        const randomX = Math.floor(Math.random() * 100);
        const randomDuration = Math.random() * 10 + 10;
        const randomDelay = Math.random() * 5;
        return {
            left: `${randomX}%`,
            animationDuration: `${randomDuration}s`,
            animationDelay: `${randomDelay}s`,
            transform: "translate(-50%, -50%)",
        };
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-gray-900">
            {[...Array(30).keys()].map((i) => (
                <div
                    key={i}
                    className="absolute text-white text-opacity-10 text-2xl animate-float italic"
                    style={generateRandomStyle()}
                >
                    {Math.random() >= 0.5 ? "🔒" : "🔑"}rsa{Math.random() >= 0.5 ? "🔒" : "🔑"}
                </div>
            ))}
        </div>
    );
};

export default BackgroundAnimation;