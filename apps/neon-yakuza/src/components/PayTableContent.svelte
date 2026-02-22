<script lang="ts">
	import { stateI18nDerived } from 'state-shared';
	import config from '../game/config';

	const symbols = $derived(Object.entries(config.symbols ?? {}).filter(([, v]) => v && typeof v === 'object'));
</script>

<div class="paytable-content">
	<p class="paytable-intro">{stateI18nDerived.translate('GAME_RULES_CLUSTER')}</p>
	<p><strong>{stateI18nDerived.translate('WILD_SYMBOL')}</strong></p>
	<p><strong>{stateI18nDerived.translate('SCATTER_FREE_SPINS')}</strong></p>
	<section class="symbols-paytable">
		{#each symbols as [name, def]}
			{#if def.paytable && Array.isArray(def.paytable)}
				<div class="symbol-block">
					<strong>{name}</strong>
					<ul>
						{#each def.paytable as entry}
							{#each Object.entries(entry) as [size, mult]}
								<li>{size} {stateI18nDerived.translate('CLUSTER')}: {mult}x</li>
							{/each}
						{/each}
					</ul>
				</div>
			{:else if def.special_properties?.includes('wild')}
				<div class="symbol-block"><strong>{name}</strong>: {stateI18nDerived.translate('WILD_SYMBOL')}</div>
			{:else if def.special_properties?.includes('scatter')}
				<div class="symbol-block"><strong>{name}</strong>: {stateI18nDerived.translate('SCATTER_FREE_SPINS')}</div>
			{/if}
		{/each}
	</section>
</div>

<style>
	.paytable-content {
		text-align: left;
		padding: 0.5rem 0;
		color: #eee;
		font-size: 0.9rem;
		line-height: 1.5;
	}
	.paytable-intro {
		margin-bottom: 0.75rem;
	}
	.symbols-paytable {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}
	.symbol-block {
		min-width: 140px;
	}
	.symbol-block ul {
		margin: 0.25rem 0 0 1rem;
		padding: 0;
		list-style: disc;
	}
</style>
