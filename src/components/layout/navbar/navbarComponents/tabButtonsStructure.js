import { Icon, Position, Tooltip, Intent } from '@blueprintjs/core';

module.exports = [
	{
		elementType: 'tab',
		content: 'Home',
		link: '/home',
		icon: 'home',
		color: 'none'
	},
	{
		elementType: 'divider'
	},
	{
		elementType: 'tab',
		content: 'Tasks',
		link: '/taskman',
		icon: 'tick-circle',
		color: '#0F9960'
	},
	{
		elementType: 'tab',
		content: 'Notes',
		link: '/notes',
		icon: 'control',
		color: '#2B95D6'
	},
	{
		elementType: 'tab',
		content: 'Money',
		link: '/monies',
		icon: 'bank-account',
		color: '#FF6E4A'
	},
	{
		elementType: 'divider'
	},
	{
		elementType: 'tab',
		content: 'Calender',
		link: '/calender',
		icon: 'calendar',
		color: '#AD99FF'
	},
	{
		elementType: 'tab',
		content: 'Tags',
		link: '/tagsGallery',
		icon: 'tag',
		color: '#D1F26D'
	},
	{
		elementType: 'tab',
		content: 'Archives',
		link: '/archives',
		icon: 'cube',
		color: '#008075'
	},
	{
		elementType: 'tab',
		content: 'Counter',
		link: '/counter',
		icon: 'double-caret-vertical',
		color: '#96622D'
	}
];
