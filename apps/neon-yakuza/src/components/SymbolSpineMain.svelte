<script lang="ts">
	import { SpineProvider, SpineTrack, type SpineTrackProps } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import { NEON_STATIC_GLOW, NEON_WIN_GLOW } from '../game/glowFilters';
	import type { SymbolState } from '../game/types';

	type Props = {
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		x?: number;
		y?: number;
		state?: SymbolState;
		listener: SpineTrackProps['listener'];
		loop?: boolean;
	};

	const props: Props = $props();
	const isWinning = $derived(['win', 'postWinStatic'].includes(props.state ?? 'static'));
	const glowFilter = $derived(isWinning ? NEON_WIN_GLOW : NEON_STATIC_GLOW);
</script>

<SpineProvider
	x={props.x}
	y={props.y}
	key={props.symbolInfo.assetKey}
	height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	blendMode="add"
	filters={[glowFilter]}
>
	<SpineTrack
		loop={props.loop}
		trackIndex={0}
		animationName={props.symbolInfo.animationName}
		timeScale={stateBetDerived.timeScale()}
		listener={props.listener}
	/>
</SpineProvider>
