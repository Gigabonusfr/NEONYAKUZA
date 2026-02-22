/**
 * Configs d'animation des symboles (inspirées du HTML slot-animation-demo).
 * Idle = glow pulsé pour DRAGON / ONI. Win = bounce + pulse (et rotation pour KOI/KATANA).
 * Wild non utilisé (animation wild du HTML pas reprise).
 */

import type { SymbolName } from './types';

/** Idle : glow pulsé (dragonGlow, oniGlow) */
export type IdleAnimConfig = {
	glowMin: number;
	glowMax: number;
	brightnessMin: number;
	brightnessMax: number;
	durationMs: number;
	color?: number;
};

/** Win : bounce scale + pulse glow, optionnel rotation (koiWave, katanaWin, etc.) */
export type WinAnimConfig = {
	scaleBounce: number; // ex. 1.12
	glowMin: number;
	glowMax: number;
	durationMs: number;
	rotationDeg?: number; // amplitude en degrés (koi -3..3, katana 2)
};

const IDLE_DRAGON: IdleAnimConfig = {
	glowMin: 2,
	glowMax: 6,
	brightnessMin: 1,
	brightnessMax: 1.1,
	durationMs: 3000,
	color: 0xbf00ff,
};

const IDLE_ONI: IdleAnimConfig = {
	glowMin: 2,
	glowMax: 5,
	brightnessMin: 1,
	brightnessMax: 1.08,
	durationMs: 4000,
	color: 0xff0040,
};

/** Idle animations par symbole (DRAGON, ONI uniquement) */
export const IDLE_ANIM_MAP: Partial<Record<SymbolName, IdleAnimConfig>> = {
	DRAGON: IDLE_DRAGON,
	ONI: IDLE_ONI,
};

/** Win: cherry = pulse + bounce (léger) */
const WIN_CHERRY: WinAnimConfig = {
	scaleBounce: 1.04,
	glowMin: 2,
	glowMax: 6,
	durationMs: 600,
};

/** Win: seven = glow violet + bounce */
const WIN_SEVEN: WinAnimConfig = {
	scaleBounce: 1.04,
	glowMin: 2,
	glowMax: 6,
	durationMs: 800,
};

/** Win: koi = wave (scale + rotation) */
const WIN_KOI: WinAnimConfig = {
	scaleBounce: 1.03,
	glowMin: 2,
	glowMax: 5,
	durationMs: 700,
	rotationDeg: 3,
};

/** Win: katana = scale + léger rotation */
const WIN_KATANA: WinAnimConfig = {
	scaleBounce: 1.03,
	glowMin: 2,
	glowMax: 5,
	durationMs: 500,
	rotationDeg: 2,
};

/** Win: scatter = pulse + glow */
const WIN_SCATTER: WinAnimConfig = {
	scaleBounce: 1.03,
	glowMin: 2,
	glowMax: 5,
	durationMs: 600,
};

/** Win par défaut */
const WIN_DEFAULT: WinAnimConfig = {
	scaleBounce: 1.04,
	glowMin: 2,
	glowMax: 5,
	durationMs: 600,
};

export const WIN_ANIM_MAP: Partial<Record<SymbolName, WinAnimConfig>> = {
	CHERRY: WIN_CHERRY,
	SEVEN: WIN_SEVEN,
	KOI: WIN_KOI,
	KATANA: WIN_KATANA,
	SCATTER: WIN_SCATTER,
};

export function getIdleAnimConfig(name: SymbolName): IdleAnimConfig | null {
	return IDLE_ANIM_MAP[name] ?? null;
}

export function getWinAnimConfig(name: SymbolName): WinAnimConfig {
	return WIN_ANIM_MAP[name] ?? WIN_DEFAULT;
}
