<script lang="ts" module>
	export type EmitterEventFreeSpinCounter =
		| { type: 'freeSpinCounterShow' }
		| { type: 'freeSpinCounterHide' }
		| { type: 'freeSpinCounterUpdate'; current?: number; total?: number };
</script>

<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { GlowFilter } from 'pixi-filters';
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import { NEON_BG, NEON_CYAN, NEON_GOLD } from '../game/neonColors';
	import { anchorToPivot, Container, Graphics, Text, type Sizes } from 'pixi-svelte';

	const context = getContext();
	const PANEL_RATIO = 824 / 622;
	const panelWidth = $derived(SYMBOL_SIZE * 2);
	const panelSizes = $derived({
		width: panelWidth,
		height: panelWidth / PANEL_RATIO,
	});

	const fsPanelGlowFilter = new GlowFilter({
		color: NEON_CYAN,
		distance: 10,
		outerStrength: 2,
	});
	const scale = 1;
	const position = $derived({
		x:
			context.stateGameDerived.boardLayout().x -
			context.stateGameDerived.boardLayout().width * 0.5 -
			panelSizes.width -
			SYMBOL_SIZE * 0.7,
		y:
			context.stateGameDerived.boardLayout().y -
			context.stateGameDerived.boardLayout().height * 0.5,
	});

	const fontSize = SYMBOL_SIZE * 0.275;

	let show = $state(false);
	let current = $state(0);
	let total = $state(0);
	let titleSizes: Sizes = $state({ width: 0, height: 0 });
	let counterSizes: Sizes = $state({ width: 0, height: 0 });
	const textStyle = { fontFamily: 'Orbitron', fontWeight: '700' as const, fill: NEON_GOLD };

	const textContainerSizes = $derived({
		width: titleSizes.width,
		height: titleSizes.height + counterSizes.height,
	});
	const counterPosition = $derived({ x: titleSizes.width / 2, y: titleSizes.height });

	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow: () => (show = true),
		freeSpinCounterHide: () => (show = false),
		freeSpinCounterUpdate: (emitterEvent) => {
			if (emitterEvent.current !== undefined) current = emitterEvent.current;
			if (emitterEvent.total !== undefined) total = emitterEvent.total;
		},
	});
</script>

<MainContainer>
	<FadeContainer {show} {...position} {scale}>
		<!-- Frame FSCounter - Graphics neon -->
		<Graphics
			draw={(g) => {
				g.clear();
				const w = panelSizes.width;
				const h = panelSizes.height;
				g.roundRect(0, 0, w, h, 6);
				g.fill({ fill: NEON_BG, alpha: 0.95 });
				g.roundRect(0, 0, w, h, 8);
				g.stroke({ width: 2, color: NEON_CYAN });
			}}
			filters={[fsPanelGlowFilter]}
		/>
		<Container
			x={panelSizes.width * 0.5}
			y={panelSizes.height * 0.48}
			pivot={anchorToPivot({
				sizes: textContainerSizes,
				anchor: { x: 0.5, y: 0.5 },
			})}
		>
			<Text
				text="FREE SPIN"
				style={{ ...textStyle, fontSize }}
				onresize={(sizes: Sizes) => (titleSizes = sizes)}
			/>
			<Text
				text={`${current} OF ${total}`}
				x={counterPosition.x}
				y={counterPosition.y}
				anchor={{ x: 0.5, y: 0 }}
				style={{ ...textStyle, fontSize }}
				onresize={(sizes: Sizes) => (counterSizes = sizes)}
			/>
		</Container>
	</FadeContainer>
</MainContainer>
