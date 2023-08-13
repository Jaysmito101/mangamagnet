import { fetchMangaChapters, processMangaChapterData, processMangaData } from "$lib/mangadex.js";

export const prerender = false;


export async function load({fetch, url}) {
    const slug = url.searchParams.get("id") || "801513ba-a712-498c-8f57-cae55b38cc92";
    const mangaDataReq = await fetch(`https://api.mangadex.org/manga/${slug}?includes[]=cover_art`)
    const mangaData = await mangaDataReq.json();

    let mangaChapters = [];
    const mangaChaptersRaw = await fetchMangaChapters(slug);
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