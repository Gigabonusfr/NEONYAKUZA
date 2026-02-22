<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventFreeSpinOutro =
		| { type: 'freeSpinOutroShow' }
		| { type: 'freeSpinOutroHide' }
		| { type: 'freeSpinOutroCountUp'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { GlowFilter } from 'pixi-filters';
	import { SpineProvider, SpineTrack, SpineSlot, Text } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider } from 'components-pixi';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { waitForResolve } from 'utils-shared/wait';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';

	import { getContext } from '../game/context';
	import { NEON_CYAN, NEON_GOLD } from '../game/neonColors';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import ResponsiveNeonText from './ResponsiveNeonText.svelte';
	import WinCoins from './WinCoins.svelte';

	const outroGlowFilter = new GlowFilter({
		color: NEON_CYAN,
		distance: 15,
		outerStrength: 2.5,
	});

	type AnimationName = 'intro' | 'idle';

	const context = getContext();

	let show = $state(true);
	let animationName = $state<AnimationName>('intro');
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});
	let onCountUpComplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinOutroShow: () => (show = true),
		freeSpinOutroHide: async () => (show = false),
		freeSpinOutroCountUp: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const duration = winLevelData.presentDuration}
		{@const isBigWin = winLevelData.type === 'big'}
		<WinCountUpProvider {amount} {duration} oncomplete={() => onCountUpComplete()}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount onmount={() => startCountUp()} />

				<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

				<FreeSpinAnimation>
					{#snippet children({ sizes })}
						<Text
							y={-sizes.height * 0.3}
							anchor={0.5}
							text={isBigWin ? 'FREE SPINS' : 'WIN'}
							style={{
								fontFamily: 'Orbitron',
								fontSize: sizes.width * (isBigWin ? 0.08 : 0.06),
								fontWeight: '900',
								fill: NEON_CYAN,
							}}
							filters={[outroGlowFilter]}
						/>

						<SpineProvider key="fsOutroNumber" width={sizes.width * 0.4}>
							<SpineTrack
								trackIndex={0}
								{animationName}
								loop={animationName === 'idle'}
								listener={{
									complete: () => (animationName = 'idle'),
								}}
							/>
							<SpineSlot slotName="slot_number">
								<ResponsiveNeonText
									anchor={{ x: 0.5, y: 0.5 }}
									text={bookEventAmountToCurrencyString(countUpAmount)}
									maxWidth={sizes.width}
									fontSize={sizes.width * 0.15}
								/>
							</SpineSlot>
						</SpineProvider>

						<Text
							y={0}
							anchor={{ x: 0.5, y: isBigWin ? -3.2 : -2 }}
							text="TOTAL WIN"
							style={{
								fontFamily: 'Orbitron',
								fontSize: (isBigWin ? 2.2 : 3) * 24,
								fontWeight: 'bold',
								fill: NEON_GOLD,
							}}
							filters={[outroGlowFilter]}
						/>
					{/snippet}
				</FreeSpinAnimation>

				<WinCoins emit={!countUpCompleted} levelAlias={winLevelData?.alias} />

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
