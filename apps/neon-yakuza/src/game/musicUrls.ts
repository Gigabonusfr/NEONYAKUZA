import type { Howl } from 'howler';

/**
 * URLs des musiques BGM personnalisées (remplacent les sprites du fichier sound principal).
 * Fichiers à placer dans le même dossier que sounds.json (ex. static/assets/audio/)
 */
export const musicBaseUrl = new URL('../../assets/audio/music_base.mp3', import.meta.url).href;
export const musicFreespinUrl = new URL('../../assets/audio/music_freespin.mp3', import.meta.url).href;

/** Howls pour BGM personnalisés, définis par EnableSound et utilisés par Sound. */
export const customMusicRef: { current: { bgm_main: Howl; bgm_freespin: Howl } | null } = {
	current: null,
};
