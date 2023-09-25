import Button from '../components/button/Button.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';
import { buttonSizes, buttonStyles } from '../components/button/buttonTypes';

const meta = {
	title: 'Components/Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		buttonStyle: {
			control: 'radio',
			options: buttonStyles
		},
		buttonSize: {
			control: 'radio',
			options: buttonSizes
		},
		disabled: {
			control: 'boolean'
		}
	}
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
	args: {
		buttonSize: 'large',
		buttonStyle: 'primary',
		content: 'Click Me!',
		disabled: false
	}
};
