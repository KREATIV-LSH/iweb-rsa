const chaptersData = [
    {
        id: 1,
        title: "1. Verschlüsselung Einführung",
        location: "/static/markdown/1.VerschlüsselungEinführung.md",
        parent: null,
    },
    {
        id: 2,
        title: "1.1 Symmetrische Verschlüsselungen",
        location: "/static/markdown/1.1.SymmetrischeVerschlüsselungen.md",
        parent: "1. Verschlüsselung Einführung",
    },
    {
        id: 3,
        title: "1.2 Asymmetrische Verschlüsselungen",
        location: "/static/markdown/1.2.AsymmetrischeVerschlüsselungen.md",
        parent: "1. Verschlüsselung Einführung",
    },
    {
        id: 4,
        title: "2 RSA-Verschlüsselung",
        location: "/static/markdown/2.RSA-Verschlüsselung.md",
        parent: null,
    },
];

const chapters = await fetchChapters();

async function fetchChapters() {
    try {
        const fetchPromises = chaptersData.map(chapter =>
            fetch(chapter.location)
                .then(response => response.text())
                .then(text => ({
                    id: chapter.id,
                    title: chapter.title,
                    location: chapter.location,
                    parent: chapter.parent,
                    content: text,
                }))
        );

        return await Promise.all(fetchPromises);
    } catch (error) {
        console.error(`Failed to fetch chapters: ${error}`);
    }
}


export { chaptersData, chapters };
