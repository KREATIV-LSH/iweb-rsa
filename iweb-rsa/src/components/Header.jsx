import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Header({ searchValue, setSearchValue }) {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <button
                type="button"
                className="text-2xl font-bold text-white"
                onClick={() => {
                    window.location = "/";
                }}>
                easy-rsa
            </button>
            <div className="flex items-center gap-4">
                <input type="text" placeholder="Search" value={searchValue} onInput={(e) => setSearchValue(e.target.value)} className="p-2 bg-gray-700 text-white rounded" />
                <button
                    type="button"
                    className="text-gray-300 hover:text-gray-400">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
        </header>
    );
}

Header.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
};

export default Header;
