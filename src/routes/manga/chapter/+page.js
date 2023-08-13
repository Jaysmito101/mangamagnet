import { processMangaChapterData } from '$lib/mangadex.js';
import {browser} from "$app/environment";

export const prerender = false;

export async function load({fetch, url}) {
    const searchParams = browser && url.searchParams;
    const slug = searchParams.get("id") || "6310f6a1-17ee-4890-b837-2ec1b372905b";

    const chapterDataReq = await fetch(`https://api.mangadex.org/chapter/${slug}`)
    const chapterData = processMangaChapterData((await chapterDataReq.json()).data);



    const chapterPagesReq = await fetch(`https://api.mangadex.org/at-home/server/${slug}`)
    const chapterPagesData = await chapterPagesReq.json();

    return {
        props: {
            chapterPagesData: chapterPagesData,
            chapterData: chapterData
        }
    }
}