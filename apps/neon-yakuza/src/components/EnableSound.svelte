<script lang="ts">
	import { onMount } from 'svelte';

	import { Howl } from 'howler';
	import type { LoadedAudio } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { sound, type SoundName } from '../game/sound';
	import { customMusicRef, musicBaseUrl, musicFreespinUrl } from '../game/musicUrls';

	const context = getContext();

	onMount(() => {
		const loadedAudio = $state.snapshot(
			context.stateApp.loadedAssets['sound'],
		) as LoadedAudio<SoundName>;
		const { destroy } = sound.load(loadedAudio);

		const customMusic = {
			bgm_main: new Howl({ src: [musicBaseUrl], loop: true, volume: 1 }),
			bgm_freespin: new Howl({ src: [musicFreespinUrl], loop: true, volume: 1 }),
		};
		customMusicRef.current = customMusic;

		return () => {
			customMusic.bgm_main.unload();
			customMusic.bgm_freespin.unload();
			customMusicRef.current = null;
			destroy();
		};
	});

	sound.enableEffect();
	sound.volumeEffect();
</script>
