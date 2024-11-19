import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <div className="text-2xl font-bold text-white">IWeb RSA</div>
            <div className="flex items-center gap-4">
                <input type="text" placeholder="Search" className="p-2 bg-gray-700 text-white rounded" />
                <button type="button" className="text-gray-300 hover:text-gray-400">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
        </header>
    )
}

export default Header;