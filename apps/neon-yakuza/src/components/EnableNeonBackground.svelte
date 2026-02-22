<script lang="ts">
	import { getContextApp } from 'pixi-svelte';
	import { NEON_BG } from '../game/neonColors';

	$effect(() => {
		const app = getContextApp().stateApp.pixiApplication;
		if (app?.renderer) {
			app.renderer.background.color = NEON_BG;
			app.renderer.background.alpha = 1;
		}
	});
</script>
