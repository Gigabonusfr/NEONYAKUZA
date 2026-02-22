<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import { Container, Text, REM } from 'pixi-svelte';
	import { GlowFilter } from 'pixi-filters';

	const neonGlowFilter = new GlowFilter({
		color: 0x00f5ff,
		distance: 10,
		outerStrength: 2.5,
		innerStrength: 0.2,
		quality: 0.4,
		alpha: 1,
	});

	const reactiveDate = new SvelteDate();
	const clock = $derived(
		reactiveDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		}),
	);

	let clockSizes = $state({ width: 0, height: 0 });

	$effect(() => {
		const interval = setInterval(() => {
			reactiveDate.setTime(Date.now());
		}, 1000);
		return () => clearInterval(interval);
	});
</script>

<Container>
	<Text
		text={clock}
		onresize={(value) => (clockSizes = value)}
		style={{
			fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
			fontSize: REM * 1.8,
			fontWeight: '700',
			fill: 0x00f5ff,
		}}
		filters={[neonGlowFilter]}
	/>
	<Text
		text="Neon Yakuza"
		x={clockSizes.width + 12}
		style={{
			fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
			fontSize: REM * 2.4,
			fontWeight: '900',
			fill: 0x00f5ff,
		}}
		filters={[neonGlowFilter]}
	/>
</Container>
