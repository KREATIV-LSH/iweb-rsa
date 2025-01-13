import React from "react";

const BackgroundAnimation = () => {
    const generateRandomStyle = () => {
        const randomX = Math.floor(Math.random() * 100);
        const randomDuration = Math.random() * 10 + 10;
        const randomDelay = Math.random() * 5;
        const scale = 2 - (randomDuration - 10) / 10;
        return {
            left: `${randomX}%`,
            animationDuration: `${randomDuration}s`,
            animationDelay: `${randomDelay}s`,
            transform: `scale(${scale})`,
        };
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-gray-900">
            {[...Array(120)].map((_) => (
                <div
                    key={_}
                    className="absolute text-white text-opacity-10 text-2xl animate-float italic"
                    style={generateRandomStyle()}
                >
                    rsa {Math.random() >= 0.5 ? "🔒" : "🔑"}
                </div>
            ))}
        </div>
    );
};

export default BackgroundAnimation;