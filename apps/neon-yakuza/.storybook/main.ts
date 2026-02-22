import type { StorybookConfig } from '@storybook/sveltekit';
import { main as sharedConfig } from 'config-storybook';

// Chemins relatifs au projet neon-yakuza (évite écran blanc : stories bien résolues)
const config: StorybookConfig = {
	...sharedConfig,
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	staticDirs: ['../static'],
};

export default config;
