<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { Container, Graphics, Text } from 'pixi-svelte';
	import { stateUi } from 'state-shared';
	import { getContext } from 'components-ui-pixi/src/context';
	import { i18nDerived } from 'components-ui-pixi/src/i18n/i18nDerived';
	import { NEON_BG, NEON_VIOLET } from '../../game/neonColors';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = true;
	};

	const text = $derived(i18nDerived.menu());
	const hitSize = 80;
	const pad = 48;
	const size = 96;
	const radius = 10;
</script>

<Container eventMode="static" cursor="pointer" onpointerup={onpress} {...props}>
	<Graphics
		draw={(g) => {
			g.clear();
			g.roundRect(-pad, -pad, size, size, radius);
			g.fill({ fill: NEON_BG, alpha: 1 });
			g.roundRect(-pad, -pad, size, size, radius);
			g.stroke({ width: 3, color: NEON_VIOLET });
			g.rect(-hitSize / 2, -hitSize / 2, hitSize, hitSize);
			g.fill({ fill: 0x000000, alpha: 0 });
		}}
	/>
	<Text
		anchor={0.5}
		text={text}
		style={{
			fontFamily: 'proxima-nova, sans-serif',
			fontSize: 18,
			fontWeight: '700',
			fill: NEON_VIOLET,
		}}
	/>
</Container>
