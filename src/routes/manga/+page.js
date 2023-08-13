import { fetchMangaChapters, processMangaChapterData, processMangaData } from "$lib/mangadex.js";

export async function load({fetch, url}) {
    const mangaDataReq = await fetch(`https://api.mangadex.org/manga/${url.searchParams.get("id")}?includes[]=cover_art`)
    const mangaData = await mangaDataReq.json();

    let mangaChapters = [];
    const mangaChaptersRaw = await fetchMangaChapters(url.searchParams.get("id"));
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