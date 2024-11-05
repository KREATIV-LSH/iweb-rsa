const chaptersData = [
    {
        title: "Chapter 1",
        location: "/static/markdown/Chapter1.md",
        parent: null,
    },
    {
        title: "Chapter 1.1",
        location: "/static/markdown/Chapter1.1.md",
        parent: "Chapter 1",
    },
];

const chapters = await fetchChapters();

async function fetchChapters() {
    try {
        const fetchPromises = chaptersData.map(chapter =>
            fetch(chapter.location)
                .then(response => response.text())
                .then(text => ({
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