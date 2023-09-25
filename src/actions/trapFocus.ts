import type { Action } from "svelte/action";

type FocusableElement = Element & {
    focus: () => void;
}

export const trapFocus: Action<HTMLElement, undefined> = (node) => {
	const previous = document.activeElement;

	function focusable() {
		return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab') return;

		const current = document.activeElement;

		const elements = focusable();
		const first = elements.at(0);
		const last = elements.at(-1);



		if (event.shiftKey && current === first) {
			if (last) (last as FocusableElement).focus();
			event.preventDefault();
		}

		if (!event.shiftKey && current === last) {
			if (first) (first as FocusableElement).focus();
			event.preventDefault();
		}
	}

	(focusable()[0] as FocusableElement | undefined)?.focus();

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
			(previous as FocusableElement | undefined)?.focus();
		}
	};
}
