<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';
	import { GlowFilter } from 'pixi-filters';

	import { stateBetDerived, stateModal } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';
	import { getContext } from 'components-ui-pixi/src/context';
	import { i18nDerived } from 'components-ui-pixi/src/i18n/i18nDerived';
	import { NEON_BG, NEON_ROSE } from '../../game/neonColors';

	type Props = { stacked?: boolean };

	const props: Props = $props();
	const context = getContext();

	const label = $derived(stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet());
	const value = $derived(numberToCurrencyString(stateBetDerived.betCost()));
	const disabled = $derived(!context.stateXstateDerived.isIdle());

	const onpress = () => {
		if (disabled) return;
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'betAmountMenu' };
	};

	const glow = new GlowFilter({
		color: NEON_ROSE,
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
		fill: disabled ? 0x666666 : NEON_ROSE,
	};
	const valueStyle = {
		fontFamily: 'proxima-nova, sans-serif',
		fontSize: 22,
		fontWeight: '700',
		fill: disabled ? 0x666666 : NEON_ROSE,
	};
</script>

<Container
	eventMode="static"
	cursor={disabled ? 'not-allowed' : 'pointer'}
	onpointerup={onpress}
>
	<Graphics
		x={-w / 2}
		y={-h / 2}
		draw={(g) => {
			g.clear();
			g.roundRect(0, 0, w, h, 10);
			g.fill({ fill: NEON_BG, alpha: 0.95 });
			g.roundRect(0, 0, w, h, 10);
			g.stroke({ width: 2, color: NEON_ROSE, alpha: disabled ? 0.4 : 0.9 });
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
