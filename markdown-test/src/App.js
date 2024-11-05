import React, { useEffect } from "react";
import { useRemark } from "react-remark";
import rehypeRaw from "rehype-raw";

function App() {
    const [reactContent, setMarkdownSource] = useRemark({
        rehypePlugins: [rehypeRaw],
        remarkToRehypeOptions: { allowDangerousHtml: true },
        rehypeReactOptions: {
            createElement: React.createElement,
            components: {
                p: ({ children }) => {
                    const hasCustomComponent = React.Children.toArray(children).some((child) => child?.type === TestComponent);
                    return hasCustomComponent ? children : <p>{children}</p>;
                },
                // Würde sonst ein Fehler geben. Einfache Lösung: Eigene Komponenten in einem Seperaten abschnitt verwenden
                custom: TestComponent,
                test: Test,
            },
        },
    });

    useEffect(() => {
        fetch("/mark1.md")
            .then((response) => response.text())
            .then((text) => setMarkdownSource(text))
            .catch((error) => console.error("Error fetching markdown:", error));
    }, [setMarkdownSource]);

    return <>{reactContent}</>;
}

export default App;

function TestComponent() {
    return <div style={{ backgroundColor: "#ff00aa", color: "black" }}>This is the Custom component</div>;
}

function Test({ children }) {
    return (
        <div
            style={{
                padding: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
            }}>
            {children}
        </div>
    );
}
