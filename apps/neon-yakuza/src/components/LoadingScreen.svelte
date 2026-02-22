<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { Container, Text, Graphics, Rectangle } from 'pixi-svelte';
	import SpriteFit from './SpriteFit.svelte';
	import { GlowFilter } from 'pixi-filters';
	import { FadeContainer } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import TransitionAnimation from './TransitionAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';

	type Props = {
		onloaded: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let loadingType = $state<'start' | 'transition'>('start');
	let pulsePhase = $state(0);

	const mainLayout = $derived(context.stateLayoutDerived.mainLayout());
	const loadingProgress = $derived(context.stateApp.loadingProgress);
	const loaded = $derived(context.stateApp.loaded);

	const neonGlowFilter = new GlowFilter({
		color: 0x00f5ff,
		distance: 20,
		outerStrength: 4,
		innerStrength: 0.5,
		quality: 0.5,
		alpha: 1,
	});

	const progressBarGlowFilter = new GlowFilter({
		color: 0x00f5ff,
		distance: 15,
		outerStrength: 4,
		innerStrength: 0.5,
		quality: 0.3,
		alpha: 0.9,
	});

	$effect(() => {
		if (loadingType !== 'start') return;
		let raf: number;
		const tick = () => {
			pulsePhase += 0.06;
			progressBarGlowFilter.outerStrength = 3 + Math.sin(pulsePhase) * 2;
			neonGlowFilter.outerStrength = 4 + Math.sin(pulsePhase) * 2.5;
			neonGlowFilter.alpha = 0.9 + Math.sin(pulsePhase * 0.7) * 0.15;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	const barWidth = $derived(mainLayout.width * 0.7);
	const barHeight = 24;
	const barY = $derived(mainLayout.height * 0.82);
	const logoY = $derived(mainLayout.height * 0.4);
	const maskWidth = $derived(Math.max(barWidth * (loadingProgress / 100), 0.1));
	const canvasSizes = $derived(context.stateLayoutDerived.canvasSizes());
</script>

<FadeContainer show={loadingType === 'start'} zIndex={10}>
	<!-- Fond noir pour masquer le background de la slot pendant le chargement -->
	<Rectangle {...canvasSizes} backgroundColor={0x000000} />
	<MainContainer>
		<Container x={mainLayout.width * 0.5} y={mainLayout.height * 0.5} pivot={{ x: 0.5, y: 0.5 }}>
			<!-- Texte "NEON" au dessus du logo - animation pulse -->
			<Text
				text="NEON"
				anchor={{ x: 0.5, y: 1 }}
				x={0}
				y={logoY - mainLayout.height * 0.5 - 180}
				style={{
					fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
					fontSize: 96,
					fontWeight: '900',
					fill: 0x00f5ff,
				}}
				filters={[neonGlowFilter]}
			/>

			<!-- Logo centré (agrandi) -->
			<SpriteFit key="yakuzaLogo" x={0} y={logoY - mainLayout.height * 0.5} anchor={0.5} maxHeight={280} />

			<!-- Zone barre de chargement -->
			<Container x={0} y={barY - mainLayout.height * 0.5} pivot={{ x: 0.5, y: 0.5 }}>
				<!-- Texte pourcentage + LOADING -->
				<Text
					text="{Math.round(loadingProgress)}%"
					anchor={{ x: 0.5, y: 1 }}
					x={0}
					y={-28}
					style={{
						fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
						fontSize: 22,
						fontWeight: '700',
						fill: 0x00f5ff,
					}}
				/>
				<Text
					text="LOADING..."
					anchor={{ x: 0.5, y: 1 }}
					x={0}
					y={-6}
					style={{
						fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
						fontSize: 14,
						fontWeight: '600',
						fill: 0x00f5ff,
						alpha: 0.85,
					}}
				/>

				<!-- Barre plus grande avec GlowFilter pulsant -->
				<Container x={-barWidth / 2} y={0} filters={[progressBarGlowFilter]}>
					<Graphics
						draw={(g) => {
							g.clear();
							const r = barHeight / 2;
							const gradient = new PIXI.FillGradient(0, 0, barWidth, 0);
							gradient.addColorStop(0, 0x7b2fbe);
							gradient.addColorStop(1, 0x00f5ff);
							g.roundRect(0, 0, barWidth, barHeight, r);
							g.fill({ fill: gradient });
						}}
					/>
					<Rectangle isMask width={maskWidth} height={barHeight} backgroundColor={0xffffff} />
				</Container>
			</Container>
		</Container>
	</MainContainer>
</FadeContainer>

<!-- press to continue -->
<FadeContainer show={loadingType === 'start' && loaded} zIndex={11}>
	<PressToContinue onpress={() => (loadingType = 'transition')} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'} zIndex={10}>
	<TransitionAnimation oncomplete={props.onloaded} />
</FadeContainer>
