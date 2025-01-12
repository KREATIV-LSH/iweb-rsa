import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { chapters, chaptersData } from "./Chapters";
import { useRemark } from "react-remark";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import remarkCodeTitles from "remark-flexible-code-titles";
import classNames from "classnames";
import { Quiz_1, Quiz_1_2 } from "./components/quizes/Quizes";
import "katex/dist/katex.min.css";
import VisKeyGeneration from "./components/visualizations/VisKeyGeneration";
import VisPrimCheck from "./components/visualizations/VisPrimCheck";
import VisPrimGen from "./components/visualizations/VisPrimGen";

function Article() {
    // Markdown rendering

    // TODO: Check out https://github.com/rehypejs/rehype-highlight
    const [reactContent, setMarkdownSource] = useRemark({
        rehypePlugins: [rehypeKatex, rehypeRaw, rehypeHighlight, [rehypeHighlightCodeLines, { showLineNumbers: true }]],
        remarkToRehypeOptions: { allowDangerousHtml: true },
        remarkPlugins: [remarkMath, remarkCodeTitles],
        rehypeReactOptions: {
            createElement: React.createElement,
            components: {
                a: ({ href, children }) => {
                    return (
                        <a href={href} className="text-blue-400 hover:underline">
                            {children}
                        </a>
                    );
                },
                quiz0: Quiz_1,
                quiz1: Quiz_1_2,
                viskeygen: VisKeyGeneration,
                visprimcheck: VisPrimCheck,
                visprimgen: VisPrimGen,
            },
        },
    });

    const navigate = useNavigate();

    // Params
    const { id: strId } = useParams();
    const id = Number.parseInt(strId);

    useEffect(() => {
        if (!chaptersData.some((chapter) => chapter.id === id) || Number.isNaN(id)) {
            navigate("/");
        } else {
            setMarkdownSource(chapters[id - 1].content);
        }
    }, [id, setMarkdownSource, navigate]);

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <div className="flex flex-col h-screen w-screen">
                <Header />
                <div className="flex flex-grow overflow-hidden">
                    <Sidebar chaptersData={chaptersData} currentId={id} />
                    <div className="flex-grow p-4 overflow-auto">
                        <div>{reactContent}</div>
                        <div className="flex mt-4">
                            {id === 1 ? (
                                <div className="bg-gray-500 cursor-not-allowed text-white font-bold py-2 px-4 rounded">Zurück</div>
                            ) : (
                                <Link
                                    to={`/article/${id - 1}`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Zurück
                                </Link>
                            )}
                            {id === chaptersData.length ? (
                                <div className="bg-gray-500 cursor-not-allowed text-white font-bold py-2 px-4 rounded ml-auto">
                                    Weiter
                                </div>
                            ) : (
                                <Link
                                    to={`/article/${id + 1}`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto">
                                    Weiter
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
