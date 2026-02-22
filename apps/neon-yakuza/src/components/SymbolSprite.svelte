<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Sprite } from 'pixi-svelte';
	import { GlowFilter } from 'pixi-filters';

	import { SYMBOL_SIZE } from '../game/constants';
	import { NEON_STATIC_GLOW, NEON_WIN_GLOW } from '../game/glowFilters';
	import {
		getIdleAnimConfig,
		getWinAnimConfig,
		type IdleAnimConfig,
		type WinAnimConfig,
	} from '../game/symbolAnimations';
	import type { RawSymbol, SymbolState } from '../game/types';
	import type { getSymbolInfo } from '../game/utils';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		state?: SymbolState;
		rawSymbol?: RawSymbol | null;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const symbolName = $derived(props.rawSymbol?.name);
	const isWinning = $derived(['win', 'postWinStatic'].includes(props.state ?? 'static'));

	const animatedGlow = new GlowFilter({
		color: NEON_STATIC_GLOW.color,
		distance: NEON_STATIC_GLOW.distance,
		outerStrength: NEON_STATIC_GLOW.outerStrength,
		innerStrength: NEON_STATIC_GLOW.innerStrength,
		alpha: NEON_STATIC_GLOW.alpha,
		quality: NEON_STATIC_GLOW.quality,
	});

	const idleConfig = $derived(symbolName ? getIdleAnimConfig(symbolName) : null);
	const winConfig = $derived(symbolName ? getWinAnimConfig(symbolName) : null);

	const scale = tweened(1);
	const rotation = tweened(0);
	let winAnimationStarted = false;

	const useAnimatedFilter = $derived(
		(idleConfig && props.state === 'static') || props.state === 'win',
	);
	const currentFilter = $derived(
		useAnimatedFilter ? animatedGlow : isWinning ? NEON_WIN_GLOW : NEON_STATIC_GLOW,
	);

	let rafId = 0;

	function runIdleGlow(config: IdleAnimConfig) {
		let start = performance.now();
		const tick = () => {
			const t = ((performance.now() - start) / config.durationMs) * Math.PI * 2;
			const s = 0.5 + 0.5 * Math.sin(t);
			animatedGlow.outerStrength = config.glowMin + (config.glowMax - config.glowMin) * s;
			if (config.color !== undefined) animatedGlow.color = config.color;
			rafId = requestAnimationFrame(tick);
		};
		tick();
	}

	function runWinAnimation(config: WinAnimConfig) {
		animatedGlow.color = 0xee82ee;
		animatedGlow.distance = 6;
		const half = config.durationMs / 2;

		scale.set(config.scaleBounce, { duration: half, easing: cubicOut }).then(() => {
			scale.set(1, { duration: half, easing: cubicOut }).then(() => {
				props.oncomplete?.();
			});
		});

		if (config.rotationDeg) {
			const deg = (config.rotationDeg * Math.PI) / 180;
			rotation.set(deg, { duration: half / 2, easing: cubicOut }).then(() => {
				rotation.set(-deg, { duration: half / 2, easing: cubicOut }).then(() => {
					rotation.set(0, { duration: half / 2, easing: cubicOut });
				});
			});
		}

		let start = performance.now();
		const tick = () => {
			const elapsed = performance.now() - start;
			const s = 0.5 + 0.5 * Math.sin((elapsed / 200) * Math.PI * 2);
			animatedGlow.outerStrength = config.glowMin + (config.glowMax - config.glowMin) * s;
			if (elapsed < config.durationMs) {
				rafId = requestAnimationFrame(tick);
			}
		};
		tick();
	}

	$effect(() => {
		const state = props.state;
		const idle = idleConfig;
		if (state !== 'win') winAnimationStarted = false;
		if (state === 'static' && idle) {
			runIdleGlow(idle);
			return () => cancelAnimationFrame(rafId);
		}
		if (state === 'win' && winConfig && !winAnimationStarted) {
			winAnimationStarted = true;
			runWinAnimation(winConfig);
			return () => cancelAnimationFrame(rafId);
		}
	});

	onMount(() => {
		if (props.state !== 'win') {
			props.oncomplete?.();
		}
	});

	onDestroy(() => {
		if (rafId) cancelAnimationFrame(rafId);
	});
</script>

<Sprite
	x={props.x}
	y={props.y}
	anchor={0.5}
	key={props.symbolInfo.assetKey}
	width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
	height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	scale={$scale}
	rotation={$rotation}
	blendMode="add"
	filters={[currentFilter]}
/>
