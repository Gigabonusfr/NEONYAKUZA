import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
import { stateBet } from 'state-shared';
import type { Bet } from './typesBookEvent';
import type { RawSymbol } from './types';

const DEMO_SYMBOLS: RawSymbol['name'][] = [
	'SEVEN',
	'KATANA',
	'CHERRY',
	'KOI',
	'DRAGON',
	'ONI',
	'S',
	'WILD',
];

/** Génère un plateau 6 colonnes × 8 lignes (6 visibles + 2 padding) pour la démo. */
function buildDemoBoard(): RawSymbol[][] {
	const cols = 6;
	const rows = 8;
	const board: RawSymbol[][] = [];
	for (let c = 0; c < cols; c++) {
		const col: RawSymbol[] = [];
		for (let r = 0; r < rows; r++) {
			col.push({ name: DEMO_SYMBOLS[Math.floor(Math.random() * DEMO_SYMBOLS.length)] });
		}
		board.push(col);
	}
	return board;
}

/** Retourne un bet mock pour la démo (un seul reveal + setTotalWin + finalWin). */
export async function getDemoRequestBet(): Promise<{
	round: Bet;
	balance: { amount: number };
}> {
	const board = buildDemoBoard();
	const round: Bet = {
		active: false,
		payoutMultiplier: 0,
		state: [
			{
				index: 0,
				type: 'reveal',
				board,
				paddingPositions: [0, 0, 0, 0, 0, 0],
				gameType: 'basegame',
				anticipation: [0, 0, 0, 0, 0, 0],
			},
			{ index: 1, type: 'setTotalWin', amount: 0 },
			{ index: 2, type: 'finalWin', amount: 0 },
		],
	} as Bet;

	// Solde après coup : mise déduite, gain ajouté (ce round = 0)
	const balanceAfter = Math.max(0, (stateBet.balanceAmount || 10) - stateBet.betAmount);
	const amount = balanceAfter * API_AMOUNT_MULTIPLIER;
	return {
		round,
		balance: { amount },
	};
}
