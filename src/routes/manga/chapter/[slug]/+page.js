import { processMangaChapterData } from '$lib/mangadex.js';

export async function load(pageParams) {
    const chapterDataReq = await pageParams.fetch(`https://api.mangadex.org/chapter/${pageParams.params.slug}`)
    const chapterData = processMangaChapterData((await chapterDataReq.json()).data);



    const chapterPagesReq = await pageParams.fetch(`https://api.mangadex.org/at-home/server/${pageParams.params.slug}`)
    const chapterPagesData = await chapterPagesReq.json();

    return {
        props: {
            chapterPagesData: chapterPagesData,
            chapterData: chapterData
        }
    }
}