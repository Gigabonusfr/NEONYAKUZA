<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { Container, Graphics, Text } from 'pixi-svelte';
	import { stateBet, stateBetDerived, stateConfig } from 'state-shared';
	import { getContext } from 'components-ui-pixi/src/context';
	import { i18nDerived } from 'components-ui-pixi/src/i18n/i18nDerived';
	import { NEON_BG, NEON_VIOLET } from '../../game/neonColors';

	const BTN_PAD = 55;
	const BTN_SIZE = 110;
	const BTN_RADIUS = 12;

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();

	const smallest = $derived(stateConfig.betAmountOptions[0]);
	const disabled = $derived(
		!context.stateXstateDerived.isIdle() || stateBet.betAmount === smallest,
	);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		const nextSmaller = [...stateConfig.betAmountOptions]
			.sort((a, b) => b - a)
			.find((option) => option < stateBet.betAmount);
		stateBetDerived.setBetAmount(nextSmaller || smallest);
	};

	const handlePointerUp = () => {
		if (disabled) return;
		onpress();
	};

	const text = $derived(i18nDerived.decrease());
	const fill = $derived(disabled ? 0x555555 : NEON_VIOLET);
</script>

<Container
	eventMode="static"
	cursor={disabled ? 'not-allowed' : 'pointer'}
	onpointerup={handlePointerUp}
	{...props}
>
	<Graphics
		draw={(g) => {
			g.clear();
			g.roundRect(-BTN_PAD, -BTN_PAD, BTN_SIZE, BTN_SIZE, BTN_RADIUS);
			g.fill({ color: NEON_BG, alpha: 1 });
			g.roundRect(-BTN_PAD, -BTN_PAD, BTN_SIZE, BTN_SIZE, BTN_RADIUS);
			g.stroke({ width: 3, color: NEON_VIOLET });
			g.rect(-50, -50, 100, 100);
			g.fill({ color: 0x000000, alpha: 0 });
		}}
	/>
	<Text
		anchor={0.5}
		text={text}
		style={{
			fontFamily: 'proxima-nova, sans-serif',
			fontSize: 32,
			fontWeight: '700',
			fill,
		}}
	/>
</Container>
