<script content="module">
    import { searchManga, processMangaData } from '$lib/mangadex.js';

    let searchTerm = "";
    let lastSearchedTime = new Date().getTime();

    let foundMangas = [];

    let onSearch = () => {
        if (new Date().getTime() - lastSearchedTime < 1000) {
            return;
        }

        lastSearchedTime = new Date().getTime();

        searchManga(searchTerm).then((data) => {
            foundMangas = [];
            for (let manga of data) {
                console.log(manga);
                foundMangas.push(processMangaData(manga));
            }
        });

    }

</script>


<div class="flex items-center">
    <input type="text" id="input" bind:value={searchTerm} on:keydown={onSearch} placeholder="Search..." class="border border-gray-700 rounded-md py-2 px-3 w-full bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2 flex items-center" on:click={onSearch}>
        Search
    </button>
</div>


<div class="grid-cols-1 sm:grid md:grid-cols-3 ">
{#each foundMangas as foundManga}
    <div
      class="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
    <a href="/manga/{foundManga.id}">
        <img
            class="rounded-t-lg"
            src={foundManga.coverImage}
            alt="Skyscrapers"
            style="height: 300px;"
        />
    </a>
      <div class="p-6 overflow-hidden">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {foundManga.title}
        </h5>
        <div class="mb-4 text-base text-neutral-600 dark:text-neutral-200 h-32">
            {foundManga.description}
        </div>
      </div>
      <div
        class="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center dark:border-neutral-600 dark:text-neutral-50">
        <div class="flex flex-wrap">
            <!-- {#each foundManga.tags as tag}
                <span class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2" style="display: inline-block;">
                    {tag[0]}
                </span>
            {/each} -->
            {foundManga.lastUpdated}
        </div>
      </div>
    </div>    
{:else}
    <div class="text-white font-bold text-lg">No results found</div>
{/each}
</div>