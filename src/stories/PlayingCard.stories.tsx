import PlayingCard from '../components/PlayingCard.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';
import sampleImg from './assets/sample_img.png';

const meta = {
	title: 'Components/Atoms/PlayingCard',
	component: PlayingCard,
	tags: ['autodocs'],
	argTypes: {
		flipped: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	}
} satisfies Meta<PlayingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayingCardStory: Story = {
	args: {
		flipped: false,
		imgSrc: sampleImg,
		disabled: false
	}
};
