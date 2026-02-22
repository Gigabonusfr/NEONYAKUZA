<script lang="ts">
	import { GlowFilter } from 'pixi-filters';
	import { Container, Text, type Sizes } from 'pixi-svelte';
	import { NEON_GOLD } from '../game/neonColors';

	type Props = {
		text: string;
		anchor?: { x: number; y: number } | number;
		maxWidth: number;
		fontSize?: number;
		align?: 'left' | 'center' | 'right';
	};

	const props: Props = $props();
	const textStyle = $derived({
		fontFamily: 'Orbitron',
		fontSize: props.fontSize ?? 48,
		fontWeight: 'bold' as const,
		fill: NEON_GOLD,
		align: props.align ?? 'center',
	});
	let baseSizes: Sizes = $state({ width: 0, height: 0 });
	const responsiveScale = $derived(props.maxWidth / (baseSizes.width || 1));
	const scale = $derived(Math.min(responsiveScale, 1));

	const glowFilter = new GlowFilter({
		color: NEON_GOLD,
		distance: 15,
		outerStrength: 2.5,
	});
</script>

<Container visible={false}>
	<Text
		text={props.text}
		anchor={props.anchor}
		style={textStyle}
		onresize={(s) => (baseSizes = s)}
	/>
</Container>

<Container scale={scale}>
	<Text
		text={props.text}
		anchor={props.anchor}
		style={textStyle}
		filters={[glowFilter]}
	/>
</Container>
