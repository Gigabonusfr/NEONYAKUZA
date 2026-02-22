/**
 * Base URL des assets pour la production (CDN Stake Engine).
 * En dev/démo : vide. En prod : définir PUBLIC_ASSETS_BASE_URL (ex. URL du CDN).
 * @see README_NEON_YAKUZA.md — Configuration CDN
 */

const base = typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_ASSETS_BASE_URL != null
	? String(import.meta.env.PUBLIC_ASSETS_BASE_URL).replace(/\/$/, '')
	: '';

/**
 * Retourne la base URL des assets (vide si non configurée).
 */
export function getAssetsBaseUrl(): string {
	return base;
}

/**
 * Si PUBLIC_ASSETS_BASE_URL est défini, retourne base + pathname de l’URL.
 * Sinon retourne l’URL telle quelle.
 */
export function resolveAssetUrl(url: string): string {
	if (!base) return url;
	try {
		const pathname = new URL(url, typeof location !== 'undefined' ? location.origin : 'http://localhost').pathname;
		return base + pathname;
	} catch {
		return url;
	}
}

/**
 * Pour un chemin absolu (ex. /assets/backgrounds/background.mp4).
 * Si base est défini, retourne base + path ; sinon retourne path tel quel.
 */
export function resolveAssetPath(path: string): string {
	if (!base) return path;
	const p = path.startsWith('/') ? path : '/' + path;
	return base + p;
}
