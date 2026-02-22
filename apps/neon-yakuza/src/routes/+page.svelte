<script lang="ts">
	const DEMO_URL = '/?demo=1';
	const MOBILE_WIDTH = 390;
	const MOBILE_HEIGHT = 700;

	function launchDemoPc() {
		window.location.href = DEMO_URL;
	}

	function launchDemoMobile() {
		window.open(
			DEMO_URL,
			'neon-yakuza-mobile',
			`width=${MOBILE_WIDTH},height=${MOBILE_HEIGHT},scrollbars=no,resizable=yes`,
		);
	}
</script>

<div class="landing">
	<div class="landing__bg" aria-hidden="true"></div>
	<main class="landing__main">
		<h1 class="landing__title">Neon Yakuza</h1>
		<p class="landing__subtitle">Démo jouable — choisissez votre version</p>
		<div class="landing__actions">
			<button type="button" class="landing__btn landing__btn--pc" onclick={launchDemoPc}>
				<span class="landing__btn-icon">🖥️</span>
				<span class="landing__btn-label">Lancer la démo version PC</span>
			</button>
			<button type="button" class="landing__btn landing__btn--mobile" onclick={launchDemoMobile}>
				<span class="landing__btn-icon">📱</span>
				<span class="landing__btn-label">Lancer la démo version Mobile</span>
			</button>
		</div>
	</main>
</div>

<style>
	.landing {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #0a0a0f;
		overflow: hidden;
	}

	.landing__bg {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 80% 50% at 50% 20%, rgba(123, 47, 190, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0, 245, 255, 0.08) 0%, transparent 50%),
			radial-gradient(ellipse 50% 30% at 20% 60%, rgba(255, 0, 110, 0.06) 0%, transparent 50%);
		pointer-events: none;
	}

	.landing__main {
		position: relative;
		text-align: center;
		padding: 2rem;
		max-width: 28rem;
	}

	.landing__title {
		margin: 0 0 0.5rem;
		font-family: 'Helvetica', 'Helvetica Neue', Arial, sans-serif;
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 900;
		color: #00f5ff;
		text-shadow: 0 0 20px rgba(0, 245, 255, 0.6), 0 0 40px rgba(0, 245, 255, 0.3);
		letter-spacing: 0.02em;
	}

	.landing__subtitle {
		margin: 0 0 2.5rem;
		font-size: 1rem;
		color: rgba(192, 192, 192, 0.9);
		font-weight: 500;
	}

	.landing__actions {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		align-items: center;
	}

	.landing__btn {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.75rem;
		min-width: 16rem;
		font-family: inherit;
		font-size: 1rem;
		font-weight: 700;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
	}

	.landing__btn:hover {
		transform: translateY(-2px);
		filter: brightness(1.1);
	}

	.landing__btn:active {
		transform: translateY(0);
	}

	.landing__btn--pc {
		background: linear-gradient(135deg, #7b2fbe 0%, #5a1d8f 100%);
		color: #fff;
		box-shadow: 0 0 24px rgba(123, 47, 190, 0.5);
	}

	.landing__btn--pc:hover {
		box-shadow: 0 0 32px rgba(123, 47, 190, 0.6);
	}

	.landing__btn--mobile {
		background: linear-gradient(135deg, #00f5ff 0%, #0099a3 100%);
		color: #0a0a0f;
		box-shadow: 0 0 24px rgba(0, 245, 255, 0.4);
	}

	.landing__btn--mobile:hover {
		box-shadow: 0 0 32px rgba(0, 245, 255, 0.55);
	}

	.landing__btn-icon {
		font-size: 1.25rem;
	}

	.landing__btn-label {
		text-align: center;
	}
</style>
