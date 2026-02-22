<script lang="ts">
	import { Container, Graphics } from 'pixi-svelte';
	import { GlowFilter } from 'pixi-filters';

	import { MainContainer } from 'components-layout';
	import { getContext } from 'components-ui-pixi/src/context';
	import type { LayoutUiProps } from 'components-ui-pixi';
	import { NEON_BG, NEON_CYAN, NEON_VIOLET, NEON_ROSE } from '../../game/neonColors';
	import { getContext as getGameContext } from '../../game/context';
	import { BOARD_SIZES } from '../../game/constants';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const gameContext = getGameContext();

	// Position : juste sous la slot (board)
	const boardLayout = $derived(gameContext.stateGameDerived.boardLayout());
	const slotBottom = $derived(boardLayout.y + BOARD_SIZES.height / 2);
	const barY = $derived(slotBottom + 35);
	const mainW = $derived(context.stateLayoutDerived.mainLayout().width);

	// Barre [ - ] [ BET ] [ TURBO ] [ + ] — taille agréable à jouer (desktop plus grands, mobile compacts)
	const btnSize = 88;
	const gap = 12;
	const barPadding = 24;
	const barWidth = barPadding * 2 + btnSize * 4 + gap * 3;
	const barHeight = 60;
	const isDesktop = $derived(context.stateLayoutDerived.layoutType() === 'desktop');
	const btnScale = $derived(isDesktop ? 0.88 : 0.72);

	const glowCyan = new GlowFilter({
		color: NEON_CYAN,
		distance: 10,
		outerStrength: 2,
		innerStrength: 0.3,
		alpha: 0.9,
	});
	const glowViolet = new GlowFilter({
		color: NEON_VIOLET,
		distance: 8,
		outerStrength: 1.5,
		innerStrength: 0.2,
		alpha: 0.85,
	});
	const glowRose = new GlowFilter({
		color: NEON_ROSE,
		distance: 8,
		outerStrength: 1.5,
		innerStrength: 0.2,
		alpha: 0.85,
	});
</script>

<MainContainer>
	<Container x={mainW * 0.5} y={barY}>
		<!-- Fond barre neon -->
		<Graphics
			x={-barWidth / 2}
			y={-barHeight / 2}
			draw={(g) => {
				g.clear();
				g.roundRect(0, 0, barWidth, barHeight, 14);
				g.fill({ fill: NEON_BG, alpha: 0.98 });
				g.roundRect(0, 0, barWidth, barHeight, 14);
				g.stroke({ width: 3, color: NEON_CYAN });
				g.roundRect(3, 3, barWidth - 6, barHeight - 6, 12);
				g.stroke({ width: 1, color: NEON_VIOLET, alpha: 0.8 });
			}}
			filters={[glowCyan]}
		/>

		<!-- Slot - (violet) -->
		<Container x={-barWidth / 2 + barPadding + btnSize / 2} y={0} scale={btnScale}>
			<Graphics
				x={-btnSize / 2 - 2}
				y={-btnSize / 2 - 2}
				draw={(g) => {
					g.clear();
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.fill({ fill: 0x0d0a12, alpha: 0.95 });
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.stroke({ width: 2, color: NEON_VIOLET });
				}}
				filters={[glowViolet]}
			/>
			<Container y={0}>
				{@render props.buttonDecrease({ anchor: 0.5 })}
			</Container>
		</Container>

		<!-- Slot BET (rose) -->
		<Container x={-barWidth / 2 + barPadding + btnSize + gap + btnSize / 2} y={0} scale={btnScale}>
			<Graphics
				x={-btnSize / 2 - 2}
				y={-btnSize / 2 - 2}
				draw={(g) => {
					g.clear();
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.fill({ fill: 0x120a0d, alpha: 0.95 });
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.stroke({ width: 2, color: NEON_ROSE });
				}}
				filters={[glowRose]}
			/>
			<Container y={0}>
				{@render props.buttonBet({ anchor: 0.5 })}
			</Container>
		</Container>

		<!-- Slot TURBO (cyan) -->
		<Container x={-barWidth / 2 + barPadding + (btnSize + gap) * 2 + btnSize / 2} y={0} scale={btnScale}>
			<Graphics
				x={-btnSize / 2 - 2}
				y={-btnSize / 2 - 2}
				draw={(g) => {
					g.clear();
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.fill({ fill: 0x0a1212, alpha: 0.95 });
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.stroke({ width: 2, color: NEON_CYAN });
				}}
				filters={[glowCyan]}
			/>
			<Container y={0}>
				{@render props.buttonTurbo({ anchor: 0.5 })}
			</Container>
		</Container>

		<!-- Slot + (violet) -->
		<Container x={-barWidth / 2 + barPadding + (btnSize + gap) * 3 + btnSize / 2} y={0} scale={btnScale}>
			<Graphics
				x={-btnSize / 2 - 2}
				y={-btnSize / 2 - 2}
				draw={(g) => {
					g.clear();
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.fill({ fill: 0x0d0a12, alpha: 0.95 });
					g.roundRect(0, 0, btnSize + 4, btnSize + 4, 8);
					g.stroke({ width: 2, color: NEON_VIOLET });
				}}
				filters={[glowViolet]}
			/>
			<Container y={0}>
				{@render props.buttonIncrease({ anchor: 0.5 })}
			</Container>
		</Container>
	</Container>
</MainContainer>
