<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import { GlowFilter } from 'pixi-filters';
	import { Graphics, Rectangle, SpineProvider, SpineTrack } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { BOARD_SIZES, SYMBOL_SIZE } from '../game/constants';
	import { NEON_CYAN, NEON_VIOLET } from '../game/neonColors';

	const context = getContext();
	const SPINE_SCALE = { width: 0.6, height: 0.6 };
	const POSITION_ADJUSTMENT = 1.01;
	const BORDER = 4;

	const neonGlowFilter = new GlowFilter({
		color: NEON_CYAN,
		distance: 15,
		outerStrength: 3,
		innerStrength: 0.5,
	});

	type AnimationName = 'reelhouse_glow_start' | 'reelhouse_glow_idle' | 'reelhouse_glow_exit';

	let animationName = $state<AnimationName | undefined>(undefined);
	let loop = $state(false);

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => {
			animationName = 'reelhouse_glow_start';
			loop = false;
		},
		boardFrameGlowHide: () => {
			if (animationName) animationName = 'reelhouse_glow_exit';
		},
	});
</script>

{#if animationName}
	<SpineProvider
		zIndex={-1}
		key="reelhouse"
		x={context.stateGameDerived.boardLayout().x * POSITION_ADJUSTMENT}
		y={context.stateGameDerived.boardLayout().y * POSITION_ADJUSTMENT}
		width={context.stateGameDerived.boardLayout().width * SPINE_SCALE.width}
		height={context.stateGameDerived.boardLayout().height * SPINE_SCALE.height}
	>
		<SpineTrack
			trackIndex={0}
			{animationName}
			{loop}
			listener={{
				complete: (entry) => {
					if (entry.animation) {
						if (entry.animation.name === 'reelhouse_glow_start') {
							animationName = 'reelhouse_glow_idle';
							loop = true;
						}

						if (entry.animation.name === 'reelhouse_glow_exit') {
							animationName = undefined;
							loop = false;
						}
					}
				},
			}}
		/>
	</SpineProvider>
{/if}

<!-- Zone symboles : fond sombre + cadrillage + bordures neon (même taille que la grille) -->
<Rectangle
	x={context.stateGameDerived.boardLayout().x}
	y={context.stateGameDerived.boardLayout().y}
	width={BOARD_SIZES.width}
	height={BOARD_SIZES.height}
	anchor={0.5}
	backgroundColor={0x050508}
/>

<Graphics
	x={context.stateGameDerived.boardLayout().x}
	y={context.stateGameDerived.boardLayout().y}
	draw={(g) => {
		const w = BOARD_SIZES.width;
		const h = BOARD_SIZES.height;
		const left = -w / 2;
		const top = -h / 2;
		g.clear();

		// Cadrillage 6x6 : 7 lignes verticales + 7 horizontales = 6x6 cellules
		const cellW = SYMBOL_SIZE;
		const cellH = SYMBOL_SIZE;
		const gridStyle = { width: 1, color: NEON_CYAN, alpha: 0.5 };
		for (let i = 0; i <= 6; i++) {
			g.moveTo(left + i * cellW, top);
			g.lineTo(left + i * cellW, top + h);
			g.stroke(gridStyle);
		}
		for (let j = 0; j <= 6; j++) {
			g.moveTo(left, top + j * cellH);
			g.lineTo(left + w, top + j * cellH);
			g.stroke(gridStyle);
		}

		// Bordures neon (sur le même contour que le fond)
		g.roundRect(left, top, w, h, 8);
		g.stroke({ width: BORDER, color: NEON_CYAN });
		g.roundRect(left + BORDER, top + BORDER, w - BORDER * 2, h - BORDER * 2, 6);
		g.stroke({ width: 2, color: NEON_VIOLET, alpha: 0.8 });
	}}
	filters={[neonGlowFilter]}
/>
