import { resolveAssetUrl } from './assetBaseUrl';

function url(rel: string): string {
	return resolveAssetUrl(new URL(rel, import.meta.url).href);
}

export default {
	yakuzaLogo: {
		type: 'sprite',
		src: url('../../assets/loader/yakuza_logo.png'),
		preload: true,
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/symbols3/symbols3.atlas'),
			skeleton: url('../../assets/spines/symbols3/explosion.json'),
			scale: 2,
		},
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/anticipation/anticipation.atlas'),
			skeleton: url('../../assets/spines/anticipation/anticipation.json'),
			scale: 2,
		},
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/bigwin/big_wins.atlas'),
			skeleton: url('../../assets/spines/bigwin/mm_bigwin.json'),
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/globalMultiplier/multiframe.atlas'),
			skeleton: url('../../assets/spines/globalMultiplier/multiframe.json'),
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/fsIntro/fs_screen.atlas'),
			skeleton: url('../../assets/spines/fsIntro/fs_screen.json'),
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/fsIntro/fs_screen.atlas'),
			skeleton: url('../../assets/spines/fsIntro/fs_screen_number.json'),
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/fsIntro/fs_screen.atlas'),
			skeleton: url('../../assets/spines/fsIntro/fs_total_number.json'),
			scale: 2,
		},
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/tumbleWin/tumble_win.atlas'),
			skeleton: url('../../assets/spines/tumbleWin/tumble_multiplier.json'),
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/tumbleWin/tumble_win.atlas'),
			skeleton: url('../../assets/spines/tumbleWin/tumble_win.json'),
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/reelhouse/reelhouse_glow.atlas'),
			skeleton: url('../../assets/spines/reelhouse/reelhouse_glow.json'),
			scale: 2,
		},
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/clusterWin/clusterpay.atlas'),
			skeleton: url('../../assets/spines/clusterWin/clusterpay.json'),
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: url('../../assets/spines/transition/transition.atlas'),
			skeleton: url('../../assets/spines/transition/transition.json'),
			scale: 2,
		},
	},
	// NEON YAKUZA symbol sprites (Leonardo AI)
	koi: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/koi.png') },
	dragon: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/dragon.png') },
	oni: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/oni.png') },
	katana: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/katana.png') },
	cherry: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/cherry.png') },
	seven: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/seven.png') },
	wild: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/wild.png') },
	scatter: { type: 'sprite', src: url('../../assets/sprites/symbolsStatic/scatter.png') },
	background: {
		type: 'sprite',
		src: url('../../assets/backgrounds/background.jpg'),
		preload: true,
	},
	providerLogo: {
		type: 'sprite',
		src: url('../../assets/sprites/uiSlotsAssetsBespoke/provider-logo.png'),
	},
	sound: {
		type: 'audio',
		src: url('../../assets/audio/sounds.json'),
		preload: true,
	},
} as const;
