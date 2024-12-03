import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { chapters, chaptersData } from "./Chapters";
import { useRemark } from "react-remark";
import rehypeRaw from "rehype-raw";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import classNames from "classnames";
import { Quiz_1, Quiz_1_2 } from "./components/quizes/Quizes";
import 'katex/dist/katex.min.css';

function Article() {
    // Markdown rendering
    const [reactContent, setMarkdownSource] = useRemark({
        rehypePlugins: [rehypeKatex, rehypeRaw],
        remarkToRehypeOptions: { allowDangerousHtml: true },
        remarkPlugins: [remarkMath],
        rehypeReactOptions: {
            createElement: React.createElement,
            components: {
                quiz0: Quiz_1,
                quiz1: Quiz_1_2,
            },
        },
    });

    // Params
    const { id: strId } = useParams();
    const id = Number.parseInt(strId);

    useEffect(() => {
        if (!chaptersData.some((chapter) => chapter.id === id) || Number.isNaN(id)) {
            return <Navigate to="/" />;
        }
        setMarkdownSource(chapters[id - 1].content);
    }, [id, setMarkdownSource]);

    if (!chaptersData.some((chapter) => chapter.id === id) || Number.isNaN(id)) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <div className="flex flex-col h-screen w-screen">
                <Header />
                <div className="flex flex-grow overflow-hidden">
                    <Sidebar chaptersData={chaptersData} currentId={id} />
                    <div className="flex-grow p-4 overflow-auto">
                        <div>{reactContent}</div>
                        <div className="flex mt-4">
                            <button
                                type="button"
                                className={classNames("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", {
                                    "bg-gray-500 cursor-not-allowed hover:bg-gray-500": id === 1,
                                })}
                                onClick={() => {
                                    window.location = `/article/${id - 1}`;
                                }}
                                disabled={id === 1}>
                                Zurück
                            </button>
                            <button
                                type="button"
                                className={classNames("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto", {
                                    "bg-gray-500 cursor-not-allowed hover:bg-gray-500": id === chaptersData.length,
                                })}
                                onClick={() => {
                                    window.location = `/article/${id + 1}`;
                                }}
                                disabled={id === chaptersData.length}>
                                Weiter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;