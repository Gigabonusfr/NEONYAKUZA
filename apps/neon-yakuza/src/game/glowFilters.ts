import { GlowFilter } from 'pixi-filters';

/** Cyan/violet neon glow pour symboles au repos */
export const NEON_STATIC_GLOW = new GlowFilter({
	color: 0x00ccff,
	distance: 10,
	outerStrength: 2,
	innerStrength: 0,
	quality: 0.3,
	alpha: 0.9,
});

/** Glow pour symboles gagnants (classique) */
export const NEON_WIN_GLOW = new GlowFilter({
	color: 0xee82ee,
	distance: 10,
	outerStrength: 4,
	innerStrength: 0.5,
	quality: 0.4,
	alpha: 1,
});
