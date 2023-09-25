<script lang="ts">
	import { onMount } from 'svelte';

	export let color: string;
	export let size: number;

	type Coordinates = {
		x: number;
		y: number;
	};

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null;
	let previous: Coordinates | null;

	function getCoordinates(e: { clientX: number; clientY: number }) {
		const { clientX, clientY } = e;
		const { left, top } = canvas.getBoundingClientRect();
		const x = clientX - left;
		const y = clientY - top;
		return { x, y };
	}

	onMount(() => {
		context = canvas.getContext('2d');

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});

	export function clear() {
        if (!context) return;
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
</script>

<canvas
	bind:this={canvas}
	on:pointerdown={(e) => {
		if (!context) return;

		const coordinates = getCoordinates(e);
		context.fillStyle = color;
		context.beginPath();
		context.arc(coordinates.x, coordinates.y, size / 2, 0, 2 * Math.PI);
		context.fill();

		previous = coordinates;
	}}
	on:pointerleave={() => {
		previous = null;
	}}
	on:pointermove={(e) => {
		if (!context || !previous) return;
		const coords = getCoordinates(e);

		if (e.buttons === 1) {
			e.preventDefault();

			context.strokeStyle = color;
			context.lineWidth = size;
			context.lineCap = 'round';
			context.beginPath();
			context.moveTo(previous.x, previous.y);
			context.lineTo(coords.x, coords.y);
			context.stroke();
		}

		previous = coords;
	}}
/>

{#if previous}
	<div
		class="preview"
		style="--color: {color}; --size: {size}px; --x: {previous.x}px; --y: {previous.y}px"
	/>
{/if}

<style>
	canvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.preview {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		transform: translate(-50%, -50%);
		background: var(--color);
		border-radius: 50%;
		opacity: 0.5;
		pointer-events: none;
	}
</style>
