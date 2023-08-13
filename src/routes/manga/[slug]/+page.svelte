<script>
    export let data;
    let sortOption = "publishedAtRaw"; // default sort option
    let sortOrder = "desc"; // default sort order
    let searchQuery = "";
    let sortedChapters = [...data.props.mangaFeed];

    const sortOptions = [
        { value: "chapter", label: "Chapter Number" },
        { value: "publishedAtRaw", label: "Published At" },
        { value: "volume", label: "Volume" }
    ];
    
    function sortChapters() {
        sortedChapters.sort((a, b) => {
            if (sortOrder === "asc") {
                return a[sortOption] > b[sortOption] ? 1 : -1;
            } else {
                return a[sortOption] < b[sortOption] ? 1 : -1;
            }
        });
        sortedChapters = [...sortedChapters];
    }

    sortChapters();

</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
    <div class="w-full md:w-1/3"  style="height: 40vh;">
        <img src={data.props.mangaData.coverImage} alt={data.props.mangaData.title} class="w-full h-auto">
    </div>
    <div class="w-full md:w-2/3 px-4 py-2">
        <h1 class="text-2xl font-bold">{data.props.mangaData.title}</h1>
        <p class="text-gray-600">{data.props.mangaData.description}</p>
        <div class="mt-2">
            {#each data.props.mangaData.tags as tag}
                <a href="/" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300">#{tag[0]}</a>
            {/each}
        </div>
    </div>
</div>

<div class="mt-4">
    <div class="flex flex-col md:flex-row items-center justify-between mb-4">
        <div class="flex items-center mb-2 md:mb-0">
            <label for="sortOption" class="mr-2">Sort By:</label>
            <select id="sortOption" class="border rounded-md px-2 py-1" bind:value={sortOption} on:change={sortChapters}>
                {#each sortOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
            <select class="border rounded-md px-2 py-1 ml-2" bind:value={sortOrder} on:change={sortChapters}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
        <div class="flex items-center">
            <label for="searchQuery" class="mr-2">Search:</label>
            <input type="text" id="searchQuery" class="border rounded-md px-2 py-1" bind:value={searchQuery} />
        </div>
    </div>
</div>





<div class="mt-4">
    {#each sortedChapters as chapter}
        {#if chapter.title.includes(searchQuery) || chapter.chapter.toString().includes(searchQuery) || searchQuery.length == 0}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4 flex flex-col md:flex-row">
                <div class="w-full md:w-3/4">
                    <div class="px-4 py-2">
                        <h2 class="text-lg font-bold">{chapter.title}</h2>
                        <p>Chapter Number: {chapter.chapter}</p>
                        <p>Translated Language: {chapter.translatedLanguage}</p>
                        {#if chapter.volume}
                            <p>Volume: {chapter.volume}</p>
                        {/if}
                        <p>Published At: {chapter.publishedAt}</p>
                    </div>
                </div>
                <div class="w-full md:w-1/4 flex justify-end px-4 py-2">
                    <a href={`/manga/chapter/${chapter.id}`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Read Chapter</a>
                </div>
            </div>
        {/if}
    {/each}
</div>
