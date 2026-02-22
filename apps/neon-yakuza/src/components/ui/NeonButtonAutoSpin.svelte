<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { Container, Graphics, Text } from 'pixi-svelte';
	import { stateBet, stateBetDerived, stateModal } from 'state-shared';
	import { getContext } from 'components-ui-pixi/src/context';
	import { i18nDerived } from 'components-ui-pixi/src/i18n/i18nDerived';
	import { NEON_BG, NEON_CYAN } from '../../game/neonColors';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();

	const active = $derived(stateBetDerived.hasAutoBetCounter());
	const disabled = $derived.by(() => {
		if (stateBet.isSpaceHold) return true;
		if (!context.stateXstateDerived.isIdle() && !stateBetDerived.hasAutoBetCounter()) return true;
		if (!stateBetDerived.isBetCostAvailable()) return true;
		return false;
	});

	const stopAutoSpin = () => (stateBet.autoSpinsCounter = 0);
	const openModal = () => (stateModal.modal = { name: 'autoSpin' });
	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.hasAutoBetCounter() ? stopAutoSpin() : openModal();
	};

	const text = $derived(i18nDerived.autoSpin());
	const fill = $derived(disabled ? 0x555555 : active ? 0xffffff : NEON_CYAN);
	const hitSize = 80;
	const pad = 48;
	const size = 96;
	const radius = 10;
</script>

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
			g.roundRect(-pad, -pad, size, size, radius);
			g.fill({ fill: NEON_BG, alpha: 0.95 });
			g.roundRect(-pad, -pad, size, size, radius);
			g.stroke({ width: 3, color: NEON_CYAN });
			g.rect(-hitSize / 2, -hitSize / 2, hitSize, hitSize);
			g.fill({ fill: 0x000000, alpha: 0 });
		}}
	/>
	<Text
		anchor={0.5}
		text={text}
		style={{
			fontFamily: 'proxima-nova, sans-serif',
			fontSize: 16,
			fontWeight: '700',
			fill,
			wordWrap: true,
			wordWrapWidth: 140,
		}}
	/>
</Container>
