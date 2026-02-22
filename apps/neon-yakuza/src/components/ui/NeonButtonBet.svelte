<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { Container, Graphics, Text } from 'pixi-svelte';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';
	import ButtonBetProvider from 'components-ui-pixi/src/components/ButtonBetProvider.svelte';
	import { i18nDerived } from 'components-ui-pixi/src/i18n/i18nDerived';
	import { NEON_BG, NEON_ROSE } from '../../game/neonColors';

	const BTN_PAD = 55;
	const BTN_SIZE = 110;
	const BTN_RADIUS = 12;

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();

	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Container
			eventMode="static"
			cursor={disabled ? 'not-allowed' : 'pointer'}
			onpointerup={() => {
				if (!disabled) onpress();
			}}
			{...props}
		>
			<Graphics
				draw={(g) => {
					g.clear();
					g.roundRect(-BTN_PAD, -BTN_PAD, BTN_SIZE, BTN_SIZE, BTN_RADIUS);
					g.fill({ fill: NEON_BG, alpha: 1 });
					g.roundRect(-BTN_PAD, -BTN_PAD, BTN_SIZE, BTN_SIZE, BTN_RADIUS);
					g.stroke({ width: 3, color: NEON_ROSE });
					g.rect(-50, -50, 100, 100);
					g.fill({ fill: 0x000000, alpha: 0 });
				}}
			/>
			<Text
				anchor={0.5}
				text={['spin_default', 'spin_disabled'].includes(key)
					? i18nDerived.bet()
					: i18nDerived.stop()}
				style={{
					fontFamily: 'proxima-nova, sans-serif',
					fontSize: 20,
					fontWeight: '700',
					fill: disabled ? 0x555555 : NEON_ROSE,
				}}
			/>
		</Container>
	{/snippet}
</ButtonBetProvider>
