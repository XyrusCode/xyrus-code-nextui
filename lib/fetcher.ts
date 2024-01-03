import axios from 'axios';

export default async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);
	return res.json();
}
  

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
}

async function getCurrentlyPlayingSong(accessToken: string): Promise<SpotifyTrack | null> {
	try {
		const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status === 200 && response.data.item) {
			const { name, artists, album } = response.data.item;
			const artistNames = artists.map((artist: { name: string }) => artist.name);
			const track: SpotifyTrack = {
				name,
				artist: artistNames.join(', '),
				album: album.name,
			};
			return track;
		}

		return null;
	} catch (error) {
		// console.error('Error retrieving currently playing song:', error);
		return null;
	}
}


