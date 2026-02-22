<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	type Props = {
		key: string;
		maxHeight?: number;
		maxWidth?: number;
		anchor?: { x: number; y: number } | number;
		x?: number;
		y?: number;
	};

	const props: Props = $props();
	const context = getContext();

	const texture = $derived(
		(context.stateApp.loadedAssets?.[props.key] ?? PIXI.Texture.EMPTY) as PIXI.Texture,
	);

	const scale = $derived.by(() => {
		if (!texture || texture === PIXI.Texture.EMPTY) return 1;
		const w = texture.orig?.width ?? texture.width ?? 1;
		const h = texture.orig?.height ?? texture.height ?? 1;
		if (props.maxHeight != null && props.maxWidth != null) {
			const scaleH = props.maxHeight / h;
			const scaleW = props.maxWidth / w;
			return Math.min(scaleH, scaleW);
		}
		if (props.maxHeight != null) return props.maxHeight / h;
		if (props.maxWidth != null) return props.maxWidth / w;
		return 1;
	});
</script>

<Sprite
	key={props.key}
	anchor={props.anchor}
	x={props.x}
	y={props.y}
	scale={scale}
/>
