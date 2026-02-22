<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { Text, SpineProvider, SpineSlot, SpineTrack } from 'pixi-svelte';
	import { GlowFilter } from 'pixi-filters';
	import { i18nDerived } from 'components-ui-pixi';

	import { getContext } from '../game/context';
	import { NEON_CYAN, NEON_GOLD } from '../game/neonColors';
	import PressToContinue from './PressToContinue.svelte';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';

	const freeSpinsGlowFilter = new GlowFilter({
		color: NEON_CYAN,
		distance: 20,
		outerStrength: 4,
		innerStrength: 0.5,
	});

	type AnimationName = 'intro' | 'idle';

	const context = getContext();
	const freeSpinsLabel = $derived(i18nDerived.freeSpins());

	let show = $state(false);
	let animationName = $state<AnimationName>('intro');
	let freeSpinsFromEvent = $state(0);
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => (show = true),
		freeSpinIntroHide: () => (show = false),
		freeSpinIntroUpdate: async (emitterEvent) => {
			freeSpinsFromEvent = emitterEvent.totalFreeSpins;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

	<FreeSpinAnimation>
		{#snippet children({ sizes })}
			<!-- Free Spins text - Orbitron style neon -->
			<Text
				y={-sizes.height * 0.3}
				anchor={0.5}
				text={freeSpinsLabel}
				style={{
					fontFamily: 'Orbitron',
					fontSize: sizes.width * 0.08,
					fontWeight: '900',
					fill: NEON_CYAN,
				}}
				filters={[freeSpinsGlowFilter]}
			/>

			<SpineProvider key="fsIntroNumber" width={sizes.width * 0.4}>
				<SpineTrack
					trackIndex={0}
					{animationName}
					loop={animationName === 'idle'}
					listener={{
						complete: () => (animationName = 'idle'),
					}}
				/>
				<SpineSlot slotName="slot_number">
					<Text
						anchor={{ x: 0.5, y: 0.5 }}
						text={freeSpinsFromEvent}
						style={{
							fontFamily: 'Orbitron',
							fontSize: sizes.width * 0.15,
							fontWeight: 'bold',
							fill: NEON_GOLD,
						}}
						filters={[freeSpinsGlowFilter]}
					/>
				</SpineSlot>
			</SpineProvider>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
