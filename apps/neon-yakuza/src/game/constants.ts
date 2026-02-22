import _ from 'lodash';

import type { RawSymbol, SymbolState } from './types';

export const SYMBOL_SIZE = 92;

export const REEL_PADDING = 0.53;

// initial board 6x6 (padded top and bottom) - NEON YAKUZA
export const INITIAL_BOARD: RawSymbol[][] = [
	[
		{ name: 'CHERRY' },
		{ name: 'KOI' },
		{ name: 'CHERRY' },
		{ name: 'SEVEN' },
		{ name: 'SEVEN' },
		{ name: 'DRAGON' },
		{ name: 'SEVEN' },
		{ name: 'ONI' },
	],
	[
		{ name: 'SEVEN' },
		{ name: 'SEVEN' },
		{ name: 'DRAGON' },
		{ name: 'SEVEN' },
		{ name: 'SEVEN' },
		{ name: 'ONI' },
		{ name: 'SEVEN' },
		{ name: 'DRAGON' },
	],
	[
		{ name: 'ONI' },
		{ name: 'ONI' },
		{ name: 'CHERRY' },
		{ name: 'CHERRY' },
		{ name: 'KATANA' },
		{ name: 'SEVEN' },
		{ name: 'KATANA' },
		{ name: 'KATANA' },
	],
	[
		{ name: 'KATANA' },
		{ name: 'CHERRY' },
		{ name: 'DRAGON' },
		{ name: 'DRAGON' },
		{ name: 'KATANA' },
		{ name: 'DRAGON' },
		{ name: 'DRAGON' },
		{ name: 'ONI' },
	],
	[
		{ name: 'CHERRY' },
		{ name: 'CHERRY' },
		{ name: 'ONI' },
		{ name: 'KOI' },
		{ name: 'KOI' },
		{ name: 'SEVEN' },
		{ name: 'SEVEN' },
		{ name: 'ONI' },
	],
	[
		{ name: 'CHERRY' },
		{ name: 'SEVEN' },
		{ name: 'SEVEN' },
		{ name: 'KOI' },
		{ name: 'KATANA' },
		{ name: 'KATANA' },
		{ name: 'DRAGON' },
		{ name: 'ONI' },
	],
];

// Grille 6×6 : 6 colonnes (reels) × 6 lignes visibles
export const BOARD_DIMENSIONS = { x: 6, y: 6 };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const BACKGROUND_RATIO = 2039 / 1000;
export const PORTRAIT_BACKGROUND_RATIO = 1242 / 2208;
const PORTRAIT_RATIO = 800 / 1422;
const LANDSCAPE_RATIO = 1600 / 900;
const DESKTOP_RATIO = 1422 / 800;

const DESKTOP_HEIGHT = 800;
const LANDSCAPE_HEIGHT = 900;
const PORTRAIT_HEIGHT = 1422;
export const DESKTOP_MAIN_SIZES = { width: DESKTOP_HEIGHT * DESKTOP_RATIO, height: DESKTOP_HEIGHT };
export const LANDSCAPE_MAIN_SIZES = {
	width: LANDSCAPE_HEIGHT * LANDSCAPE_RATIO,
	height: LANDSCAPE_HEIGHT,
};
export const PORTRAIT_MAIN_SIZES = {
	width: PORTRAIT_HEIGHT * PORTRAIT_RATIO,
	height: PORTRAIT_HEIGHT,
};

export const HIGH_SYMBOLS = ['KOI', 'DRAGON', 'ONI', 'KATANA'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const M_SIZE = 0.3;
const HIGH_SYMBOL_SIZE = 0.9;
const LOW_SYMBOL_SIZE = 0.9;
const SPECIAL_SYMBOL_SIZE = 1;

const SPIN_OPTIONS_SHARED = {
	reelFallInDelay: 80,
	reelPaddingMultiplierNormal: 1.25,
	reelPaddingMultiplierAnticipated: 18,
	reelFallOutDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 3.5,
	symbolFallInInterval: 30,
	symbolFallInBounceSpeed: 0.15,
	symbolFallInBounceSizeMulti: 0.5,
	symbolFallOutSpeed: 3.5,
	symbolFallOutInterval: 20,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 7,
	symbolFallInInterval: 0,
	symbolFallInBounceSpeed: 0.3,
	symbolFallInBounceSizeMulti: 0.25,
	symbolFallOutSpeed: 7,
	symbolFallOutInterval: 0,
};

export const MOTION_BLUR_VELOCITY = 31;

export const zIndexes = {
	background: {
		backdrop: -3,
		normal: -2,
		feature: -1,
	},
};

const explosion = {
	type: 'spine',
	assetKey: 'explosion',
	animationName: 'explosion',
	sizeRatios: { width: 1, height: 1 },
};

// NEON YAKUZA symbol sprites (Leonardo AI)
const koiStatic = { type: 'sprite', assetKey: 'koi', sizeRatios: { width: 1, height: 1 } };
const dragonStatic = { type: 'sprite', assetKey: 'dragon', sizeRatios: { width: 1, height: 1 } };
const oniStatic = { type: 'sprite', assetKey: 'oni', sizeRatios: { width: 1, height: 1 } };
const katanaStatic = { type: 'sprite', assetKey: 'katana', sizeRatios: { width: 1, height: 1 } };
const cherryStatic = { type: 'sprite', assetKey: 'cherry', sizeRatios: { width: 1, height: 1 } };
const sevenStatic = { type: 'sprite', assetKey: 'seven', sizeRatios: { width: 1, height: 1 } };
const wildStatic = { type: 'sprite', assetKey: 'wild', sizeRatios: { width: 1.12, height: 1.12 } };
const scatterStatic = { type: 'sprite', assetKey: 'scatter', sizeRatios: { width: 1.243, height: 1.243 } };

// Tous les symboles utilisent des sprites (assets Neon Yakuza) - mapping H1/L1 = anciens noms du bet
const symbolConfig = (staticRef: typeof koiStatic) => ({
	explosion,
	win: staticRef,
	postWinStatic: staticRef,
	static: staticRef,
	spin: staticRef,
	land: staticRef,
});

export const SYMBOL_INFO_MAP = {
	KOI: symbolConfig(koiStatic),
	DRAGON: symbolConfig(dragonStatic),
	ONI: symbolConfig(oniStatic),
	KATANA: symbolConfig(katanaStatic),
	CHERRY: symbolConfig(cherryStatic),
	SEVEN: symbolConfig(sevenStatic),
	WILD: symbolConfig(wildStatic),
	SCATTER: symbolConfig(scatterStatic),
	H1: symbolConfig(koiStatic),
	H2: symbolConfig(dragonStatic),
	H3: symbolConfig(oniStatic),
	H4: symbolConfig(katanaStatic),
	H5: symbolConfig(katanaStatic),
	L1: symbolConfig(cherryStatic),
	L2: symbolConfig(sevenStatic),
	L3: symbolConfig(cherryStatic),
	L4: symbolConfig(sevenStatic),
	W: symbolConfig(wildStatic),
	S: symbolConfig(scatterStatic),
} as const;

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
	4: 'sfx_scatter_stop_4',
	5: 'sfx_scatter_stop_5',
} as const;
