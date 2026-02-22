// @ts-ignore
import config from 'config-vite';

const base = config();
export default {
	...base,
	server: {
		...base.server,
		host: true,
		port: 3001,
	},
	ssr: {
		noExternal: ['pixi-svelte'],
		...base.ssr,
	},
	resolve: {
		...(base.resolve || {}),
		// Aide la résolution SSR pour pixi-svelte (exports)
		conditions: ['svelte', 'import', 'require', 'default'],
	},
};
