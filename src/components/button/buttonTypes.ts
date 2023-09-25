	/** A readonly list of all possible button styles */
	export const buttonStyles = ['primary', 'secondary'] as const;

	/** A type representing all possible button styles*/
	export type ButtonStyle = (typeof buttonStyles)[number];

	/** A readonly list of all possible button sizes*/
	export const buttonSizes = ['small', 'medium', 'large'] as const;

	/** A type representing all possible button sizes*/
	export type ButtonSize = (typeof buttonSizes)[number];