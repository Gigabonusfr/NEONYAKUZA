<script lang="ts">
	import { type Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoaderStakeEngine, LoaderBase, LoadI18n } from 'components-shared';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';

	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };

	const props: Props = $props();

	// ?demo=1 : mode test jouable sans Storybook — saute les loaders externes, va direct au jeu
	const isDemoMode = $derived($page.url.searchParams.get('demo') === '1');
	let showYourLoader = $state(isDemoMode);

	const loaderUrlStakeEngine = new URL('../../stake-engine-loader.gif', import.meta.url).href;
	const loaderUrl = new URL('../../loader.gif', import.meta.url).href;

	setContext();
</script>

<GlobalStyle>
	<Authenticate skipAuth={isDemoMode}>
		<LoadI18n {messagesMap}>
			<Game />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>

<style>
	/* Évite la barre blanche en bas sur PC (fond de page visible à travers le canvas) */
	:global(html),
	:global(body),
	:global(.game-root) {
		background-color: #0a0a0f !important;
		margin: 0;
		min-height: 100vh;
	}
	:global(.game-root) {
		min-height: 100vh;
		width: 100%;
	}
</style>

{#if !isDemoMode}
	<LoaderStakeEngine src={loaderUrlStakeEngine} oncomplete={() => (showYourLoader = true)} />
{/if}

{#if showYourLoader && !isDemoMode}
	<LoaderBase
		src={loaderUrl}
		maxWidth={450}
		backgroundColor="#000000"
		timeout={2000}
	/>
{:else if isDemoMode}
	<!-- En mode demo, le jeu est déjà visible (écran de chargement Pixi puis jeu) -->
{/if}

<div class="game-root">
	{@render props.children()}
</div>