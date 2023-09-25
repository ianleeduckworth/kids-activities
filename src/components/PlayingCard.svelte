<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/** Whether or not the card is flipped over. If true, the value of the card is shown. If not a generic background is shown (just like a real playing card)*/
	export let flipped: boolean;

	/** The content to be rendered inside the card itself; acts as a "face" to the card */
	export let imgSrc: string;

	/** Whether or not the card is disabled; if it is disabled, it cannot be flipped anymore and will remain face up */
	export let disabled: boolean;

	$: {
		if (disabled) flipped = true;
	}

	let dispatch = createEventDispatcher<Record<'flip', undefined>>();
</script>

<!-- @component
The card component represents a playing card that can be flipped over.

NOTE: this component does not maintain its own state regarding being flipped. The parent component is expected to maintain state.
 -->
<button class="card" disabled={disabled} class:disabled={disabled} class:flipped={!flipped} on:click={() => dispatch('flip')}>
	<div class="front">
		<!-- <img class="card-image" src={imgSrc} alt="card content" /> -->
		<p style="font-size: 3rem">{imgSrc}</p>
	</div>
	<div class="back">
		<div class="pattern" />
	</div>
</button>

<style>
	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		font-size: 0.1625rem;
		height: 68em;
		background: var(--bg-1);
		border-radius: 2em;
		transform: rotateY(0deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
	}

	.card.flipped {
		transform: rotateY(180deg);
	}

	.front,
	.back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		box-sizing: border-box;
		padding: 2em;
	}

	.back {
		transform: rotateY(180deg);
	}

	.card-image {
		max-width: 100px;
		max-height: 100px;
	}

	.pattern {
		width: 100%;
		height: 100%;
		background-color: hsl(206, 20%, 90%);
		background-image: radial-gradient(hsl(206, 20%, 80%) 0.9em, transparent 1em),
			repeating-radial-gradient(
				hsl(206, 20%, 80%) 0,
				hsl(206, 20%, 80%) 0.4em,
				transparent 0.5em,
				transparent 2em,
				hsl(206, 20%, 80%) 2.1em,
				hsl(206, 20%, 80%) 2.5em,
				transparent 2.6em,
				transparent 5em
			);
		background-size: 3em 3em, 9em 9em;
		background-position: 0 0;
		border-radius: 1em;
	}

	.disabled {
		opacity: 50%;
		cursor: auto;
	}
</style>
