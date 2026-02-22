import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
import { stateBet } from 'state-shared';
import type { Bet } from './typesBookEvent';
import type { RawSymbol } from './types';
import type { Position } from './types';

const DEMO_SYMBOLS: RawSymbol['name'][] = [
	'SEVEN',
	'KATANA',
	'CHERRY',
	'KOI',
	'DRAGON',
	'ONI',
	'S',
	'WILD',
	'SCATTER',
];

const MIN_SCATTERS_FOR_FS = 3;
const DEMO_FREE_SPINS_COUNT = 10;
const VISIBLE_ROWS = 6;

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

function isScatter(symbol: RawSymbol): boolean {
	return symbol.name === 'SCATTER' || symbol.name === 'S';
}

/** Positions des scatters dans la zone visible (6 colonnes × 6 lignes). */
function getScatterPositions(board: RawSymbol[][]): Position[] {
	const positions: Position[] = [];
	for (let reel = 0; reel < board.length; reel++) {
		const col = board[reel];
		for (let row = 0; row < VISIBLE_ROWS && row < col.length; row++) {
			if (isScatter(col[row])) positions.push({ reel, row });
		}
	}
	return positions;
}

/** Retourne un bet mock pour la démo (reveal + freeSpinTrigger si 3+ scatters + setTotalWin + finalWin). */
export async function getDemoRequestBet(): Promise<{
	round: Bet;
	balance: { amount: number };
}> {
	const board = buildDemoBoard();
	const scatterPositions = getScatterPositions(board);
	const hasFreeSpinTrigger = scatterPositions.length >= MIN_SCATTERS_FOR_FS;

	const state: Bet['state'] = [
		{
			index: 0,
			type: 'reveal',
			board,
			paddingPositions: [0, 0, 0, 0, 0, 0],
			gameType: 'basegame',
			anticipation: [0, 0, 0, 0, 0, 0],
		},
	];

	if (hasFreeSpinTrigger) {
		state.push({
			index: state.length,
			type: 'freeSpinTrigger',
			totalFs: DEMO_FREE_SPINS_COUNT,
			positions: scatterPositions,
		});
	}

	state.push(
		{ index: state.length, type: 'setTotalWin', amount: 0 },
		{ index: state.length + 1, type: 'finalWin', amount: 0 },
	);

	const round: Bet = {
		active: hasFreeSpinTrigger,
		payoutMultiplier: 0,
		state,
	} as Bet;

	// Solde après coup : mise déduite, gain ajouté (ce round = 0)
	const balanceAfter = Math.max(0, (stateBet.balanceAmount || 10) - stateBet.betAmount);
	const amount = balanceAfter * API_AMOUNT_MULTIPLIER;
	return {
		round,
		balance: { amount },
	};
}
