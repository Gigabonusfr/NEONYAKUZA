<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { NEON_STATIC_GLOW, NEON_WIN_GLOW } from '../game/glowFilters';
	import type { RawSymbol, SymbolState } from '../game/types';
	import type { getSymbolInfo } from '../game/utils';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		state?: SymbolState;
		rawSymbol?: RawSymbol | null;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const isWinning = $derived(['win', 'postWinStatic'].includes(props.state ?? 'static'));
	const currentFilter = $derived(isWinning ? NEON_WIN_GLOW : NEON_STATIC_GLOW);

	// Flux du livre : oncomplete doit être appelé (pas d’animation custom)
	onMount(() => props.oncomplete?.());
</script>

<Sprite
	x={props.x}
	y={props.y}
	anchor={0.5}
	key={props.symbolInfo.assetKey}
	width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
	height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	blendMode="add"
	filters={[currentFilter]}
/>
