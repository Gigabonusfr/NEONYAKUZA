import './preview.css';
import { preview } from 'config-storybook';

// Éviter écran blanc : fond sombre et fullscreen pour le canvas Pixi
const customPreview = {
	...preview,
	parameters: {
		...preview.parameters,
		layout: 'fullscreen',
		backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0a0a0f' }] },
	},
};

export default customPreview;
