<script lang="ts">
	import { stateConfig, stateI18nDerived } from 'state-shared';
	import config from '../game/config';

	const rtpPercent = $derived(Math.round((config.rtp ?? 0.96) * 100));
	const maxWinBase = $derived(config.betModes?.base?.max_win ?? 15000);
	const maxWinBonus = $derived(config.betModes?.bonus?.max_win ?? 15000);
	const showRtp = $derived(stateConfig.jurisdiction?.displayRTP ?? false);
</script>

<div class="game-rules-content">
	<section class="rtp-max">
		{#if showRtp}
			<p><strong>{stateI18nDerived.translate('RTP')}:</strong> {rtpPercent}%</p>
		{/if}
		<p><strong>{stateI18nDerived.translate('MAX_WIN')}:</strong> {stateI18nDerived.translate('BASE_MODE')} {maxWinBase.toLocaleString()}x, {stateI18nDerived.translate('BONUS_MODE')} {maxWinBonus.toLocaleString()}x</p>
	</section>
	<section class="rules-text">
		<p>{stateI18nDerived.translate('GAME_RULES_NEON_YAKUZA_INTRO')}</p>
		<p>{stateI18nDerived.translate('GAME_RULES_CLUSTER')}</p>
		<p>{stateI18nDerived.translate('GAME_RULES_SCATTER_FS')}</p>
		<p>{stateI18nDerived.translate('GAME_RULES_BONUS_BUY')}</p>
		<p>{stateI18nDerived.translate('GAME_RULES_MAX_WIN_DISCLAIMER')}</p>
		<p class="buttons-guide">{stateI18nDerived.translate('BUTTONS_GUIDE')}</p>
	</section>
</div>

<style>
	.game-rules-content {
		text-align: left;
		padding: 0.5rem 0;
		color: #eee;
		font-size: 0.95rem;
		line-height: 1.5;
	}
	.rtp-max {
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	.rtp-max p,
	.rules-text p {
		margin: 0.35rem 0;
	}
</style>
