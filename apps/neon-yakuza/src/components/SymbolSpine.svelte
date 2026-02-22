<script lang="ts">
	import { type SpineTrackProps } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import type { SymbolState } from '../game/types';
	import SymbolSpineMain from './SymbolSpineMain.svelte';

	type Props = {
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		x?: number;
		y?: number;
		state?: SymbolState;
		listener: SpineTrackProps['listener'];
		loop?: boolean;
	};

	const props: Props = $props();
</script>

<!-- main -->
<SymbolSpineMain
	x={props.x}
	y={props.y}
	symbolInfo={props.symbolInfo}
	state={props.state}
	listener={props.listener}
	loop={props.loop}
/>
