<script lang="ts">
	import PlayingCard from '../../components/PlayingCard.svelte';
	import Button from '../../components/button/Button.svelte';
	import { shuffle2DArray } from '../../utilities/array';

	type Card = {
		id: string;
		grouping: string;
		disabled: boolean;
		flipped: boolean;
	};

	let gameBoard: Card[][] = [
		[
			{ id: '1', grouping: 'a', disabled: false, flipped: false },
			{ id: '2', grouping: 'a', disabled: false, flipped: false },
			{ id: '3', grouping: 'b', disabled: false, flipped: false },
			{ id: '4', grouping: 'b', disabled: false, flipped: false },
			{ id: '5', grouping: 'c', disabled: false, flipped: false },
			{ id: '6', grouping: 'c', disabled: false, flipped: false }
		],
		[
			{ id: '7', grouping: 'd', disabled: false, flipped: false },
			{ id: '8', grouping: 'd', disabled: false, flipped: false },
			{ id: '9', grouping: 'e', disabled: false, flipped: false },
			{ id: '10', grouping: 'e', disabled: false, flipped: false },
			{ id: '11', grouping: 'f', disabled: false, flipped: false },
			{ id: '12', grouping: 'f', disabled: false, flipped: false }
		],
		[
			{ id: '13', grouping: 'g', disabled: false, flipped: false },
			{ id: '14', grouping: 'g', disabled: false, flipped: false },
			{ id: '15', grouping: 'h', disabled: false, flipped: false },
			{ id: '16', grouping: 'h', disabled: false, flipped: false },
			{ id: '17', grouping: 'i', disabled: false, flipped: false },
			{ id: '18', grouping: 'i', disabled: false, flipped: false }
		]
	];

	let shuffledGameboard = shuffle2DArray(gameBoard);

	let matches = 0;
	let tries = 0;
	$: won = matches === 9;

	type CardAction = Card & {
		rowIndex: number;
		columnIndex: number;
	};

	let action1: CardAction | undefined = undefined;
	let action2: CardAction | undefined = undefined;

	// track action1 and action 2. See if we need to disable cards or flip cards back over if the player couldn't create a match
	$: if (!!action1 && !!action2) {
		tries += 1;
		if (action1.grouping === action2.grouping) {
			shuffledGameboard[action1.rowIndex][action1.columnIndex].disabled = true;
			shuffledGameboard[action2.rowIndex][action2.columnIndex].disabled = true;
			action1 = undefined;
			action2 = undefined;
			matches += 1;
		} else {
			setTimeout(() => {
				shuffledGameboard[(action1 as CardAction).rowIndex][
					(action1 as CardAction).columnIndex
				].flipped = false;
				shuffledGameboard[(action2 as CardAction).rowIndex][
					(action2 as CardAction).columnIndex
				].flipped = false;
				action1 = undefined;
				action2 = undefined;
			}, 1500);
		}
	}

	const handleReset = () => {
		matches = 0;
		tries = 0;

		shuffledGameboard = shuffle2DArray(gameBoard);
		for (let i = 0; i < shuffledGameboard.length; i++) {
			const row = shuffledGameboard[i];
			for (let j = 0; j < row.length; j++) {
				const card = shuffledGameboard[i][j];
				card.disabled = false;
				card.flipped = false;
			}
		}
	};
</script>

<h1>Let's play a memory game!</h1>
{#if won}
	<h2>You win!</h2>
	<Button content="Reset" on:click={handleReset} />
{/if}

<p>{`Tries: ${tries}. Matches: ${matches}`}</p>
{#each shuffledGameboard as row, rowIndex}
	<div class="row">
		{#each row as card, columnIndex}
			<div class="card-container">
				<PlayingCard
					imgSrc={card.grouping.toUpperCase()}
					flipped={card.flipped}
					disabled={false}
					on:flip={() => {
						if (!action1) {
							card.flipped = !card.flipped;
							action1 = {
								...card,
								rowIndex,
								columnIndex
							};
						} else if (!action2) {
							card.flipped = !card.flipped;
							action2 = {
								...card,
								rowIndex,
								columnIndex
							};
						}
					}}
				/>
			</div>
		{/each}
	</div>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-container {
		margin: 0.5rem;
	}
</style>
