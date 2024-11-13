import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Sidebar({ chaptersData, currentId }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const parentChapters = chaptersData.filter((chapter) => chapter.parent === null);
    const childChapters = chaptersData.filter((chapter) => chapter.parent !== null);

    return (
        <>
            <button type="button" className="p-2 bg-gray-800 focus:outline-none" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <aside className={!isOpen ? "hidden" : "w-1/4 max-w-36 bg-gray-800 border-r border-gray-700 p-4 pl-0 overflow-y-auto"}>
                <ul className="space-y-2">
                    {parentChapters.map((chapter) => {
                        const subChapters = childChapters.filter((childChapter) => childChapter.parent === chapter.title);
                        return (
                            <li key={chapter.title} className={`${(chapter.id === currentId) && 'font-bold'} hover:text-white`}>
                                <Link to={`/article/${chapter.id}`}>{chapter.title}</Link>
                                {subChapters && (
                                    <ul className="pl-4">
                                        {subChapters.map((subChapter) => (
                                            <li key={subChapter.title} className={`${(subChapter.id === currentId) ? 'font-bold' : 'font-normal'} hover:text-white`}>
                                                <Link to={`/article/${subChapter.id}`}>{subChapter.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </>
    );
}

Sidebar.propTypes = {
    chaptersData: PropTypes.array.isRequired,
    currentId: PropTypes.number,
};

export default Sidebar;
