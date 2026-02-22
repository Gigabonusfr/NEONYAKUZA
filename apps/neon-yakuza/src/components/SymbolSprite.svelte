<script lang="ts">
	import { Sprite } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import { NEON_STATIC_GLOW, NEON_WIN_GLOW } from '../game/glowFilters';
	import type { SymbolState } from '../game/types';
	import { onMount } from 'svelte';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		state?: SymbolState;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const isWinning = $derived(['win', 'postWinStatic'].includes(props.state ?? 'static'));
	const glowFilter = $derived(isWinning ? NEON_WIN_GLOW : NEON_STATIC_GLOW);

	onMount(() => {
		props.oncomplete?.();
	});

	$effect(() => {
		props.symbolInfo;
		props.oncomplete?.();
	});
</script>

<Sprite
	x={props.x}
	y={props.y}
	anchor={0.5}
	key={props.symbolInfo.assetKey}
	width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
	height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	blendMode="add"
	filters={[glowFilter]}
/>
