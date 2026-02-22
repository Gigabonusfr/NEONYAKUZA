<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Container, Graphics, Text } from 'pixi-svelte';
	import { GlowFilter } from 'pixi-filters';

	import { stateBet } from 'state-shared';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { i18nDerived } from 'components-ui-pixi/src/i18n/i18nDerived';
	import { NEON_BG, NEON_GOLD } from '../../game/neonColors';

	type Props = { stacked?: boolean };

	const props: Props = $props();

	const winBookEventAmountTween = new Tween(stateBet.winBookEventAmount);
	const label = $derived(i18nDerived.win());
	const value = $derived(bookEventAmountToCurrencyString(winBookEventAmountTween.current));

	$effect(() => {
		winBookEventAmountTween.set(stateBet.winBookEventAmount);
	});

	const glow = new GlowFilter({
		color: NEON_GOLD,
		distance: 8,
		outerStrength: 1.5,
		innerStrength: 0.2,
		alpha: 0.9,
	});

	const w = 140;
	const h = 52;
	const labelStyle = {
		fontFamily: 'proxima-nova, sans-serif',
		fontSize: 16,
		fontWeight: '600',
		fill: NEON_GOLD,
	};
	const valueStyle = {
		fontFamily: 'proxima-nova, sans-serif',
		fontSize: 22,
		fontWeight: '700',
		fill: NEON_GOLD,
	};
</script>

<Container>
	<Graphics
		x={-w / 2}
		y={-h / 2}
		draw={(g) => {
			g.clear();
			g.roundRect(0, 0, w, h, 10);
			g.fill({ color: NEON_BG, alpha: 0.95 });
			g.roundRect(0, 0, w, h, 10);
			g.stroke({ width: 2, color: NEON_GOLD, alpha: 0.9 });
		}}
		filters={[glow]}
	/>
	{#if props.stacked !== false}
		<Text anchor={{ x: 0.5, y: 0 }} text={label} style={labelStyle} y={-h / 2 + 6} />
		<Text anchor={{ x: 0.5, y: 0 }} text={value} style={valueStyle} y={-h / 2 + 28} />
	{:else}
		<Text anchor={{ x: 0, y: 0.5 }} text={label} style={labelStyle} x={-w / 2 + 12} />
		<Text anchor={{ x: 1, y: 0.5 }} text={value} style={valueStyle} x={w / 2 - 12} />
	{/if}
</Container>
