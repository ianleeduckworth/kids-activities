<script lang="ts">
	// import Canvas from './Canvas.svelte';
	import Canvas from '../../components/Canvas.svelte';
	import { trapFocus } from '../../actions/trapFocus';
	import Button from '../../components/button/Button.svelte';

	const colors = [
		'red',
		'orange',
		'yellow',
		'green',
		'blue',
		'indigo',
		'violet',
		'white',
		'brown',
		'black'
	];
	let selected = colors[0];
	let size = 10;

	let showMenu = true;
	let canvas: any; // todo fix this
</script>

<div class="container">
	<Canvas color={selected} {size} bind:this={canvas} />

	{#if showMenu}
		<div
			role="button"
			tabindex={0}
			class="modal-background"
			on:click|self={() => (showMenu = false)}
			on:keydown={(e) => {
				if (e.key === 'Escape') showMenu = false;
			}}
		>
			<div class="menu" use:trapFocus>
				<div class="colors">
					{#each colors as color}
						<button
							class="color"
							aria-label={color}
							aria-current={selected === color}
							style="--color: {color}"
							on:click={() => {
								selected = color;
								showMenu = false;
							}}
						/>
					{/each}
				</div>

				<label>
					small
					<input type="range" bind:value={size} min="1" max="50" />
					large
				</label>
			</div>
		</div>
	{/if}

	<div class="controls">
		<Button content={showMenu ? 'Close' : 'Menu'} on:click={() => (showMenu = !showMenu)} />
		<Button style="margin-left: 0.5rem" content="Clear" on:click={() => canvas.clear()} />
		<div class="swatch" style="background-color: {selected}; width:{size}px; height: {size}px;" />
	</div>
</div>

<style>
	.container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.controls {
		position: absolute;
		left: 0;
		top: 0;
		padding: 1em;
		display: flex;
		align-items: center;
	}

	.swatch {
		border-radius: 1000px;
		margin-left: 1rem;
	}

	/* .show-menu {
		width: 5em;
	} */

	.modal-background {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(20px);
	}

	.menu {
		position: relative;
		background: var(--bg-2);
		width: calc(100% - 2em);
		max-width: 30em;
		padding: 1em 1em 0.5em 1em;
		border-radius: 1em;
		box-sizing: border-box;
		user-select: none;
	}

	.colors {
		display: grid;
		align-items: center;
		grid-template-columns: repeat(10, 1fr);
		grid-gap: 0.5em;
	}

	.color {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: none;
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition: all 0.1s;
	}

	.color[aria-current='true'] {
		transform: translate(1px, 1px);
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
	}

	.menu label {
		display: flex;
		width: 100%;
		margin: 1em 0 0 0;
	}

	.menu input {
		flex: 1;
	}
</style>
