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
};
