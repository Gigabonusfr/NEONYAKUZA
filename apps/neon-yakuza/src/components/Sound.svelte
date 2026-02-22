<script lang="ts" module>
	import { sound, type MusicName, type SoundEffectName, type SoundName } from '../game/sound';

	export type EmitterEventSound =
		| { type: 'soundMusic'; name: MusicName }
		| { type: 'soundOnce'; name: SoundEffectName; forcePlay?: boolean }
		| { type: 'soundLoop'; name: SoundEffectName }
		| { type: 'soundStop'; name: SoundName }
		| { type: 'soundFade'; name: SoundName; from: number; to: number; duration: number }
		| { type: 'soundScatterCounterIncrease' }
		| { type: 'soundScatterCounterClear' };
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { waitForTimeout } from 'utils-shared/wait';
	import { SECOND } from 'constants-shared/time';
	import { stateBet, stateSoundDerived } from 'state-shared';

	import { getContext } from '../game/context';
	import { customMusicRef } from '../game/musicUrls';
	import type { MusicName } from '../game/sound';

	const context = getContext();

	const playMusic = (name: MusicName) => {
		const custom = customMusicRef.current;
		if (custom && (name === 'bgm_main' || name === 'bgm_freespin')) {
			sound.players.music.stop({ name: 'bgm_main' });
			sound.players.music.stop({ name: 'bgm_freespin' });
			custom.bgm_main.stop();
			custom.bgm_freespin.stop();
			const howl = name === 'bgm_main' ? custom.bgm_main : custom.bgm_freespin;
			howl.volume(stateSoundDerived.volumeMusic());
			howl.play();
		} else {
			if (custom) {
				custom.bgm_main.stop();
				custom.bgm_freespin.stop();
			}
			sound.players.music.play({ name });
		}
	};

	context.eventEmitter.subscribeOnMount({
		// ui
		soundBetMode: async ({ betModeKey }) => {
			if (betModeKey === 'SUPERSPIN') {
				sound.players.once.play({ name: 'sfx_winlevel_end' });
				await waitForTimeout(SECOND);
				playMusic('bgm_freespin');
			} else {
				playMusic('bgm_main');
			}
		},
		soundPressGeneral: () => sound.players.once.play({ name: 'sfx_btn_general' }),
		soundPressBet: () => sound.players.once.play({ name: 'sfx_btn_spin' }),
		// scatterCounter
		soundScatterCounterIncrease: () => (context.stateGame.scatterCounter = context.stateGame.scatterCounter + 1), // prettier-ignore
		soundScatterCounterClear: () => (context.stateGame.scatterCounter = 0),
		// game
		soundMusic: ({ name }) => playMusic(name),
		soundLoop: ({ name }) => sound.players.loop.play({ name }),
		soundOnce: ({ name, forcePlay }) => sound.players.once.play({ name, forcePlay }),
		soundStop: ({ name }) => sound.stop({ name }),
		soundFade: async ({ name, duration, from, to }) => await sound.fade({ name, duration, from, to }), // prettier-ignore
	});

	$effect(() => {
		const vol = stateSoundDerived.volumeMusic();
		const custom = customMusicRef.current;
		if (custom) {
			custom.bgm_main.volume(vol);
			custom.bgm_freespin.volume(vol);
		}
	});

	onMount(() => {
		if (stateBet.activeBetModeKey === 'SUPERSPIN') {
			playMusic('bgm_freespin');
		} else {
			playMusic('bgm_main');
		}
	});
</script>
