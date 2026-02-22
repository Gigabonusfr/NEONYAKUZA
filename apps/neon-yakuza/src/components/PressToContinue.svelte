<script lang="ts">
	import { MainContainer, OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { Text } from 'pixi-svelte';
	import { GlowFilter } from 'pixi-filters';

	import { getContext } from '../game/context';
	import { NEON_CYAN } from '../game/neonColors';

	type Props = {
		onpress: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let pulse = $state(0);
	const glowFilter = new GlowFilter({
		color: NEON_CYAN,
		distance: 12,
		outerStrength: 2.5,
		innerStrength: 0.3,
	});

	$effect(() => {
		let raf: number;
		const tick = () => {
			pulse += 0.05;
			glowFilter.outerStrength = 2.5 + Math.sin(pulse) * 1;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<MainContainer alignVertical="bottom">
	<Text
		anchor={{ x: 0.5, y: 1 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height}
		text="APPUYEZ POUR CONTINUER"
		style={{
			fontFamily: 'Orbitron, Helvetica, sans-serif',
			fontSize: 24,
			fontWeight: '700',
			fill: NEON_CYAN,
		}}
		filters={[glowFilter]}
	/>
</MainContainer>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />
