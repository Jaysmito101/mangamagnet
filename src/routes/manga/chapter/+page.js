import { processMangaChapterData } from '$lib/mangadex.js';

export async function load({fetch, url}) {
    const chapterDataReq = await fetch(`https://api.mangadex.org/chapter/${url.searchParams.get("id")}`)
    const chapterData = processMangaChapterData((await chapterDataReq.json()).data);



    const chapterPagesReq = await fetch(`https://api.mangadex.org/at-home/server/${url.searchParams.get("id")}`)
    const chapterPagesData = await chapterPagesReq.json();

    return {
        props: {
            chapterPagesData: chapterPagesData,
            chapterData: chapterData
        }
    }
}