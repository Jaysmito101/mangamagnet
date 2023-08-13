// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		  }),
		  paths: {
			base: dev ? '' : process.env.BASE_PATH,
		  },
		  prerender: {
			handleHttpError: ({ path, referrer, message }) => {
			  // ignore deliberate link to shiny 404 page
			  if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
				return;
			  }
	   
			  // otherwise fail the build
			  throw new Error(message);
			},
			entries: []
		  }
	}
};

export default config;
