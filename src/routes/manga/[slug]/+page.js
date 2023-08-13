import { fetchMangaChapters, processMangaChapterData, processMangaData } from "$lib/mangadex.js";

export async function load(pageParams) {
    const mangaDataReq = await pageParams.fetch(`https://api.mangadex.org/manga/${pageParams.params.slug}?includes[]=cover_art`)
    const mangaData = await mangaDataReq.json();

    let mangaChapters = [];
    const mangaChaptersRaw = await fetchMangaChapters(pageParams.params.slug);
    for (let chapter of mangaChaptersRaw) {
        mangaChapters.push(processMangaChapterData(chapter));
    }
    // sort chapters by volume and chapter number
    mangaChapters.sort((a, b) => {
        if (a.chapter === b.chapter) {
            return parseFloat(a.volume) - parseFloat(b.volume);
        }
        return parseInt(a.chapter) - parseInt(b.chapter);
    });


    return {
        props: {
            mangaData: processMangaData(mangaData.data),
            mangaFeed: mangaChapters
        }
    }
}