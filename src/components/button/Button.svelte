<script lang="ts">
	import type { ButtonSize, ButtonStyle } from './buttonTypes';

	/** The style to be applied to the button. If not provided, primary will be used */
	export let buttonStyle: ButtonStyle = 'primary';

	/** The size to be applied to the button. If not provided, large will be used */
	export let buttonSize: ButtonSize = 'large';

	/** Content to be rendered inside the button */
	export let content: string;

	/** Whether or not the button component is disabled. If not provided, false will be used */
	export let disabled = false;

	/** Style to be applied to the button. If not provided, no additional styling will be used */
	export let style: string | undefined = undefined;
</script>

<!-- 
    @component
    A simple button compoent that comes pre-styled.
-->
<button on:click {style} class={`${buttonStyle} ${buttonSize}`} class:disabled>
	{content}
</button>

<style>
	button {
		background: none;
		border: none;
		border-radius: 0.25rem;
		color: white;
		cursor: pointer;

		transition: all 0.2s ease-in-out;

		&:hover {
			filter: brightness(92%);
		}
	}

	.disabled {
		opacity: 50%;
		background-color: darkgray !important;
		cursor: auto;
	}

	.primary {
		background-color: rgb(28, 126, 212);
	}

	.secondary {
		background-color: rgb(249, 103, 67);
	}

	.small {
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
	}

	.medium {
		padding: 0.5rem 0.75rem;
		font-size: 1rem;
	}

	.large {
		padding: 0.75rem 1rem;
		font-size: 1.125rem;
	}
</style>
