

export async function searchManga(searchTerm) {
    const limit = 10;
    const offset = 0;
    const includedTagsMode = "AND";
    const excludedTagsMode = "OR";
    const contentRating = ["safe", "suggestive", "erotica"];
    const order = ["latestUploadedChapter", "desc"];

    let url = `https://api.mangadex.org/manga?`;

    url += `limit=${limit}&offset=${offset}&`;
    url += `title=${searchTerm}&`;
    for (let i = 0; i < contentRating.length; i++) {
        url += `contentRating[]=${contentRating[i]}&`;
    }
    url += `includedTagsMode=${includedTagsMode}&`;
    url += `excludedTagsMode=${excludedTagsMode}&`;
    url += `order[${order[0]}]=${order[1]}&`;
    url += `includes[]=cover_art`

    const response = await fetch(url);
    if (response.status !== 200) {
        return [];
    }

    const data = await response.json();

    return data.data;
}

export async function fetchMangaChapters(mangaId) {
    const limit = 500;
    const contentRating = ["safe", "suggestive", "erotica"];

    let url = `https://api.mangadex.org/manga/${mangaId}/feed?`;
    url += `limit=${limit}&`;
    url += `translatedLanguage[]=en&`;
    for (let i = 0; i < contentRating.length; i++) {
        url += `contentRating[]=${contentRating[i]}&`;
    }
    url += `includeFutureUpdates=1&`;
    //url += `order[publishAt]=asc&`;
    //url += `order[createdAt]=asc`;
    //url += `order[updatedAt]=asc`;
    //url += `order[readableAt]=asc`;

    const response = await fetch(url);
    if (response.status !== 200) {
        return [];
    }
    const data = await response.json();
    return data.data;
}

export function processMangaData(rawMangaData) {
    const coverFile = rawMangaData.relationships.find((rel) => rel.type === "cover_art");
    const coverFileUrl = `https://uploads.mangadex.org/covers/${rawMangaData.id}/${coverFile.attributes.fileName}.512.jpg`;
    let tags = [];
    for (let i = 0; i < rawMangaData.attributes.tags.length; i++) {
        tags.push([rawMangaData.attributes.tags[i].attributes.name.en, rawMangaData.attributes.tags[i].id]);
    }
    const processedManagData = {
        id: rawMangaData.id,
        title: Object.values(rawMangaData.attributes.title).join(" "),
        description: rawMangaData.attributes.description.en,
        coverImage: coverFileUrl,
        tags: tags,
        lastUpdated: new Date(rawMangaData.attributes.updatedAt).toLocaleDateString("en-IN"),
    }
    return processedManagData;
}


export function processMangaChapterData(rawMangaChapterData) {
    const processedChapterData = {
        id: rawMangaChapterData.id,
        pages: rawMangaChapterData.attributes.pages,
        chapter: parseFloat(rawMangaChapterData.attributes.chapter),
        volume: rawMangaChapterData.attributes.volume,
        translatedLanguage: rawMangaChapterData.attributes.translatedLanguage,
        title: rawMangaChapterData.attributes.title,
        publishedAt: new Date(rawMangaChapterData.attributes.publishAt).toLocaleDateString("en-IN"),
        publishedAtRaw: rawMangaChapterData.attributes.publishAt,
    };
    return processedChapterData;
}
