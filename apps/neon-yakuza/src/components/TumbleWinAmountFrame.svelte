<script lang="ts">
	import type { Snippet } from 'svelte';

	import { GlowFilter } from 'pixi-filters';
	import { Container, Graphics, Text, type Sizes } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { NEON_BG, NEON_CYAN, NEON_GOLD } from '../game/neonColors';

	type Props = {
		children: Snippet<[{ frameSizes: Sizes }]>;
	};

	const props: Props = $props();
	const TITLE_RATIO = 532 / 143;
	const TITLE_HEIGHT = SYMBOL_SIZE * 0.28;
	const TITLE_SIZES = {
		width: TITLE_HEIGHT * TITLE_RATIO,
		height: TITLE_HEIGHT,
	};

	const PANEL_RATIO = 1442 / 374;
	const PANEL_HEIGHT = SYMBOL_SIZE * 0.8;
	const PANEL_SIZES = {
		width: PANEL_HEIGHT * PANEL_RATIO,
		height: PANEL_HEIGHT,
	};

	const tumbleGlowFilter = new GlowFilter({
		color: NEON_CYAN,
		distance: 12,
		outerStrength: 2.5,
	});
</script>

<!-- Pay Frame / Tumble panel - Graphics neon -->
<Graphics
	pivot={{ x: PANEL_SIZES.width / 2, y: PANEL_SIZES.height / 2 }}
	draw={(g) => {
		g.clear();
		const w = PANEL_SIZES.width;
		const h = PANEL_SIZES.height;
		g.roundRect(-w / 2, -h / 2, w, h, 10);
		g.fill({ fill: NEON_BG, alpha: 0.95 });
		g.roundRect(-w / 2, -h / 2, w, h, 10);
		g.stroke({ width: 3, color: NEON_CYAN });
	}}
	filters={[tumbleGlowFilter]}
/>

<Container y={-TITLE_HEIGHT * 1.2}>
	<Text
		anchor={0.5}
		y={-TITLE_HEIGHT * 0.025}
		text="TUMBLE WIN"
		style={{
			fontFamily: 'Orbitron',
			fontSize: TITLE_HEIGHT * 0.45,
			fontWeight: '900',
			fill: NEON_GOLD,
		}}
		filters={[tumbleGlowFilter]}
	/>
</Container>

{@render props.children({ frameSizes: PANEL_SIZES })}
