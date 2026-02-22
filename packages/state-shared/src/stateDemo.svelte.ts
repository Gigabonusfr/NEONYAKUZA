export type MockRequestBet = () => Promise<{
	round: { state: unknown[]; [key: string]: unknown };
	balance?: { amount: number };
}>;

export const stateDemo = $state({
	isDemo: false,
	mockRequestBet: null as MockRequestBet | null,
});
