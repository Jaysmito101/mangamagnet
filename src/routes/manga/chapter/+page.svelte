<script>
    // @ts-ignore
    export let data;

    let isDownloading = true;
    let downloadMessage = " starting...";

    const numPages = parseInt(data.props.chapterData.pages + "");
    let downloadPages = {};
    let totalDownloaded = 0;

    function showDownloadedPages() {
        if (typeof window === 'undefined') return;
        
        for (let i = 0; i < numPages; i++) {
            // @ts-ignore
            let page = document.getElementById(downloadPages[i].id);
            page.src = URL.createObjectURL(downloadPages[i].blob);
        }
    }
    
    async function downloadChapterPages() {
        if (typeof window === 'undefined') return;
        const rawPagesData = data.props.chapterPagesData.chapter.data;
        const chapterHash = data.props.chapterPagesData.chapter.hash;
        for (let i = 0; i < rawPagesData.length; i++) {
            let pageDataUrl = "https://uploads.mangadex.org/data/" + chapterHash + "/" + rawPagesData[i];
            fetch(pageDataUrl)
                .then(response => response.blob())
                .then(blob => {
                    // @ts-ignore
                    downloadPages[i] = {
                        url: pageDataUrl,
                        id: rawPagesData[i].substring(2, rawPagesData[i].indexOf(".")),
                        blob: blob
                    };
                    totalDownloaded++;
                    downloadMessage = " " + totalDownloaded + "/" + numPages;
                    if (totalDownloaded == numPages) {
                        isDownloading = false;
                        showDownloadedPages();
                    }
                });
        }
      
    }

    downloadChapterPages();

</script>

{#if isDownloading}
    <div class="fixed top-0 left-0 w-screen h-screen bg-black z-50" style="width: 100%; height: 100vh; background-color: rgba(20, 20, 30, 255);">
        <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
            <p class="text-gray-300 ml-4 font-bold text-lg" style="font-family: Arial, sans-serif;">Downloading {downloadMessage}</p>
        </div>
    </div>

{/if}

    <div class="flex flex-col items-center">
        {#each data.props.chapterPagesData.chapter.data as page}
        <img id="{page.substring(2, page.indexOf("."))}" alt="{page}" class="max-w-full" />
        {/each}
    </div>
    <!-- <pre>{JSON.stringify(data.props, null, 4)}</pre> -->
    