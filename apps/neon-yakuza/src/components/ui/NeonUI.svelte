<script lang="ts">
	import type { Snippet } from 'svelte';

	import { stateUi } from 'state-shared';
	import { getContextLayout } from 'utils-layout';
	import { EnableSpaceHold } from 'components-shared';

	import UiFadeContainer from 'components-ui-pixi/src/components/UiFadeContainer.svelte';
	import LayoutNeonDesktop from './LayoutNeonDesktop.svelte';
	import UIReplay from 'components-ui-pixi/src/components/UIReplay.svelte';
	import LayoutDesktop from 'components-ui-pixi/src/components/LayoutDesktop.svelte';
	import LayoutPortrait from 'components-ui-pixi/src/components/LayoutPortrait.svelte';
	import LayoutLandscape from 'components-ui-pixi/src/components/LayoutLandscape.svelte';
	import LayoutTablet from 'components-ui-pixi/src/components/LayoutTablet.svelte';
	import NeonLabelBalance from './NeonLabelBalance.svelte';
	import NeonLabelWin from './NeonLabelWin.svelte';
	import NeonLabelBet from './NeonLabelBet.svelte';
	import NeonButtonDecrease from './NeonButtonDecrease.svelte';
	import NeonButtonBet from './NeonButtonBet.svelte';
	import NeonButtonTurbo from './NeonButtonTurbo.svelte';
	import NeonButtonIncrease from './NeonButtonIncrease.svelte';
	import ButtonPayTable from 'components-ui-pixi/src/components/ButtonPayTable.svelte';
	import ButtonGameRules from 'components-ui-pixi/src/components/ButtonGameRules.svelte';
	import ButtonSettings from 'components-ui-pixi/src/components/ButtonSettings.svelte';
	import NeonButtonMenu from './NeonButtonMenu.svelte';
	import NeonButtonBuyBonus from './NeonButtonBuyBonus.svelte';
	import NeonButtonAutoSpin from './NeonButtonAutoSpin.svelte';
	import ButtonMenuClose from 'components-ui-pixi/src/components/ButtonMenuClose.svelte';
	import ButtonSoundSwitch from 'components-ui-pixi/src/components/ButtonSoundSwitch.svelte';

	type Props = {
		gameName: Snippet;
		logo: Snippet;
	};

	const props: Props = $props();

	const { stateLayoutDerived } = getContextLayout();

	const LAYOUT_COMPONENT_MAP = {
		desktop: LayoutNeonDesktop,
		portrait: LayoutPortrait,
		landscape: LayoutLandscape,
		tablet: LayoutTablet,
	};

	const LayoutComponent = $derived(LAYOUT_COMPONENT_MAP[stateLayoutDerived.layoutType()]);

	const isReplay = $derived(stateUi.config.mode === 'replay');
</script>

<EnableSpaceHold />

{#if isReplay}
	<UIReplay
		gameName={props.gameName}
		logo={props.logo}
	/>
{:else}
<UiFadeContainer>
	<LayoutComponent>
		{#snippet gameName()}
			{@render props.gameName()}
		{/snippet}

		{#snippet logo()}
			{@render props.logo()}
		{/snippet}

		{#snippet amountBalance(labelProps)}
			<NeonLabelBalance {...labelProps} />
		{/snippet}

		{#snippet amountWin(labelProps)}
			<NeonLabelWin {...labelProps} />
		{/snippet}

		{#snippet amountBet(labelProps)}
			<NeonLabelBet {...labelProps} />
		{/snippet}

		{#snippet buttonBuyBonus(buttonProps)}
			<NeonButtonBuyBonus {...buttonProps} />
		{/snippet}

		{#snippet buttonBet(buttonProps)}
			<NeonButtonBet {...buttonProps} />
		{/snippet}

		{#snippet buttonTurbo(buttonProps)}
			<NeonButtonTurbo {...buttonProps} />
		{/snippet}

		{#snippet buttonAutoSpin(buttonProps)}
			<NeonButtonAutoSpin {...buttonProps} />
		{/snippet}

		{#snippet buttonIncrease(buttonProps)}
			<NeonButtonIncrease {...buttonProps} />
		{/snippet}

		{#snippet buttonDecrease(buttonProps)}
			<NeonButtonDecrease {...buttonProps} />
		{/snippet}

		{#snippet buttonMenu(buttonProps)}
			<NeonButtonMenu {...buttonProps} />
		{/snippet}

		{#snippet buttonMenuClose(buttonProps)}
			<ButtonMenuClose {...buttonProps} />
		{/snippet}

		{#snippet buttonPayTable(buttonProps)}
			<ButtonPayTable {...buttonProps} />
		{/snippet}

		{#snippet buttonGameRules(buttonProps)}
			<ButtonGameRules {...buttonProps} />
		{/snippet}

		{#snippet buttonSettings(buttonProps)}
			<ButtonSettings {...buttonProps} />
		{/snippet}

		{#snippet buttonSoundSwitch(buttonProps)}
			<ButtonSoundSwitch {...buttonProps} />
		{/snippet}
	</LayoutComponent>
</UiFadeContainer>
{/if}
