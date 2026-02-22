<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as PIXI from 'pixi.js';
	import { Rectangle, Sprite, BaseSprite } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const context = getContext();
	const canvasSizes = $derived(context.stateLayoutDerived.canvasSizes());

	let videoTexture = $state<PIXI.Texture | null>(null);
	let videoWidth = $state(0);
	let videoHeight = $state(0);
	let videoEl: HTMLVideoElement | null = null;

	const VIDEO_SRC = '/assets/backgrounds/background.mp4';

	/** Scale pour remplir tout le canvas (étiré / cover), pas de bandes noires */
	const videoScale = $derived(
		videoWidth > 0 && videoHeight > 0
			? Math.max(canvasSizes.width / videoWidth, canvasSizes.height / videoHeight)
			: 1,
	);
	const videoX = $derived(canvasSizes.width * 0.5);
	const videoY = $derived(canvasSizes.height * 0.5);
	/** Vitesse de lecture : 0.2 = x0,2 (lent), 0.1 = x0,1 (très lent) */
	const VIDEO_PLAYBACK_RATE = 0.2;

	onMount(() => {
		videoEl = document.createElement('video');
		videoEl.muted = true;
		videoEl.loop = true;
		videoEl.playsInline = true;
		videoEl.setAttribute('playsinline', '');
		videoEl.preload = 'auto';
		videoEl.crossOrigin = 'anonymous';
		videoEl.playbackRate = VIDEO_PLAYBACK_RATE;

		const onReady = () => {
			if (!videoEl) return;
			try {
				videoEl.playbackRate = VIDEO_PLAYBACK_RATE;
				videoWidth = videoEl.videoWidth;
				videoHeight = videoEl.videoHeight;
				const texture = PIXI.Texture.from(videoEl);
				videoTexture = texture;
				videoEl.play().catch(() => {});
			} catch {
				// Fallback: keep videoTexture null, JPG will show
			}
		};

		const onError = () => {
			// Fichier absent ou erreur : on garde le fallback JPG
		};

		videoEl.addEventListener('loadeddata', onReady);
		videoEl.addEventListener('canplay', onReady);
		videoEl.addEventListener('error', onError);
		videoEl.src = VIDEO_SRC;
		videoEl.load();
	});

	onDestroy(() => {
		if (videoEl) {
			videoEl.pause();
			videoEl.removeAttribute('src');
			videoEl.load();
			videoEl = null;
		}
		if (videoTexture) {
			videoTexture.destroy(true);
			videoTexture = null;
		}
	});
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-4} />

{#if videoTexture}
	<BaseSprite
		texture={videoTexture}
		scale={videoScale}
		anchor={{ x: 0.5, y: 0.5 }}
		x={videoX}
		y={videoY}
		zIndex={-3}
	/>
{:else}
	<Sprite key="background" {...canvasSizes} zIndex={-3} />
{/if}
