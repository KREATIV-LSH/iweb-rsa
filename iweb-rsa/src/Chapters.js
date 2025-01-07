const chaptersData = [
    {
        id: 1,
        title: "1. Verschlüsselung Einführung",
        location: "/static/markdown/1/1.VerschlüsselungEinführung.md",
        parent: null,
    },
    {
        id: 2,
        title: "1.1 Symmetrische Verschlüsselungen",
        location: "/static/markdown/1/1.1.SymmetrischeVerschlüsselungen.md",
        parent: "1. Verschlüsselung Einführung",
    },
    {
        id: 3,
        title: "1.2 Asymmetrische Verschlüsselungen",
        location: "/static/markdown/1/1.2.AsymmetrischeVerschlüsselungen.md",
        parent: "1. Verschlüsselung Einführung",
    },
    {
        id: 4,
        title: "2 RSA-Verschlüsselung",
        location: "/static/markdown/2/2.RSA-Verschlüsselung.md",
        parent: null,
    },
    {
        id: 5,
        title: "2.1 Wieso funktioniert das?",
        location: "/static/markdown/2/2.1.WiesoFunktioniertDas.md",
        parent: "2 RSA-Verschlüsselung",
    },
    {
        id: 6,
        title: "2.2 Kryptowährungen",
        location: "/static/markdown/2/2.2.Kryptowährungen.md",
        parent: "2 RSA-Verschlüsselung",
    },
    {
        id: 7,
        title: "3 Implementation",
        location: "/static/markdown/3/3.Implementation.md",
        parent: null,
    },
    {
        id: 8,
        title: "3.1 Schlüssel Erstellung & Primzahlen mit Miller Rabin",
        location: "/static/markdown/3/3.1.SchlüsselErstellung+Primzahlen.md",
        parent: "3 Implementation",
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
