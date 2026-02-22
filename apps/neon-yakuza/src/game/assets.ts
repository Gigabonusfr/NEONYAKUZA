export default {
	yakuzaLogo: {
		type: 'sprite',
		src: new URL('../../assets/loader/yakuza_logo.png', import.meta.url).href,
		preload: true,
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url).href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	// NEON YAKUZA symbol sprites (Leonardo AI)
	koi: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/koi.png', import.meta.url).href,
	},
	dragon: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/dragon.png', import.meta.url).href,
	},
	oni: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/oni.png', import.meta.url).href,
	},
	katana: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/katana.png', import.meta.url).href,
	},
	cherry: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/cherry.png', import.meta.url).href,
	},
	seven: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/seven.png', import.meta.url).href,
	},
	wild: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/wild.png', import.meta.url).href,
	},
	scatter: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/scatter.png', import.meta.url).href,
	},
	background: {
		type: 'sprite',
		src: new URL('../../assets/backgrounds/background.jpg', import.meta.url).href,
		preload: true,
	},
	providerLogo: {
		type: 'sprite',
		src: new URL('../../assets/sprites/uiSlotsAssetsBespoke/provider-logo.png', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
} as const;
