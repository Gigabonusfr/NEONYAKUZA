<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Container, Graphics } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';
	import { GlowFilter } from 'pixi-filters';

	import { getContext } from '../game/context';
	import { NEON_GOLD } from '../game/neonColors';

	type Props = {
		emit?: boolean;
		levelAlias?: string;
	};

	const props: Props = $props();
	const context = getContext();

	const NUM_CIRCLES = 12;
	const circles = Array.from({ length: NUM_CIRCLES }, (_, i) => ({
		angle: (i / NUM_CIRCLES) * Math.PI * 2,
		y: new Tween(0),
		scale: new Tween(0.5 + Math.random() * 0.5),
		alpha: new Tween(1),
	}));

	const glowFilter = new GlowFilter({
		color: NEON_GOLD,
		distance: 8,
		outerStrength: 2,
	});

	$effect(() => {
		if (props.emit) {
			circles.forEach((c, i) => {
				c.y.set(0);
				c.alpha.set(1);
				const delay = i * 40;
				setTimeout(() => {
					c.y.set(-120 - Math.random() * 80, { duration: 700, easing: cubicOut });
					c.alpha.set(0, { duration: 500, easing: cubicOut });
				}, delay);
			});
		}
	});
</script>

{#if props.emit}
	<MainContainer>
		<Container
			x={context.stateGameDerived.boardLayout().x}
			y={context.stateGameDerived.boardLayout().y}
		>
			{#each circles as circle, i}
				<Graphics
					x={80 * Math.cos(circle.angle)}
					y={circle.y.current}
					pivot={{ x: 15, y: 15 }}
					scale={circle.scale.current}
					alpha={circle.alpha.current}
					draw={(g) => {
						g.clear();
						g.circle(0, 0, 15);
						g.fill({ fill: NEON_GOLD, alpha: 0.9 });
						g.circle(0, 0, 15);
						g.stroke({ width: 2, color: 0xffec8b });
					}}
					filters={[glowFilter]}
				/>
			{/each}
		</Container>
	</MainContainer>
{/if}
