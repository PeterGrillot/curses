export type NavigationType = {
	href: string;
	icon: string;
	text: string;
};

export const NAVIGATION = [
	{
		href: '//instagram.com/curse_words',
		icon: 'fab fa-instagram',
		text: 'Instagram'
	},
	{
		href: '//twitter.com/CurseWordsBand',
		icon: 'far fa-trash-alt',
		text: 'Twitter'
	},
	{
		href: '//www.facebook.com/DontSayCurseWords/',
		icon: 'fab fa-facebook',
		text: 'Facebook'
	},
	{
		href: '//dontsaycursewords.bandcamp.com/',
		icon: 'fab fa-bandcamp',
		text: 'Bandcamp'
	},
	{
		href: '//open.spotify.com/artist/5Yd3VFwLLJaSAPQRKwYXSN',
		icon: 'fab fa-spotify',
		text: 'Spotify'
	},
	{
		// eslint-disable-next-line
		href: "javascript:window.location.href = 'mailto:' + ['dontsaycursewords','gmail.com'].join('@')",
		icon: 'far fa-envelope',
		text: 'Email'
	}
];
