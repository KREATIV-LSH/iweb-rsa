import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { chapters, chaptersData } from "./Chapters";
import { useRemark } from "react-remark";
import rehypeRaw from "rehype-raw";

function Article() {
    // Markdown rendering
    const [reactContent, setMarkdownSource] = useRemark({
        rehypePlugins: [rehypeRaw],
        remarkToRehypeOptions: { allowDangerousHtml: true },
        rehypeReactOptions: {
            createElement: React.createElement,
            components: {},
        },
    });

    // Params
    const { id: strId } = useParams();

    const id = Number.parseInt(strId);
    // console.log(id);

    if (!chaptersData.some((chapter) => chapter.id === id) || Number.isNaN(id)) {
        return <Navigate to="/" />;
    }

    setMarkdownSource(chapters[id-1].content);
    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <div className="flex flex-col h-screen w-screen">
                <Header />
                <div className="flex flex-grow overflow-hidden">
                    <Sidebar chaptersData={chaptersData} currentId={id} />
                    <div className="flex-grow p-4 overflow-auto">
                        {reactContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
