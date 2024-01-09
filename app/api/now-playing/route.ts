import { getNowPlaying } from '@/lib/spotify';
import type { NowPlayingResponse,NowPlayingSong } from '@/types/spotify';

export const GET = async () => { 
	try {
		const request = await getNowPlaying();
		const response = await request.json();

		const headers = {
			'content-type': 'application/json',
			'cache-control': 'public, s-maxage=60, stale-while-revalidate=30'
		};

		if (response === null) {
			return new Response(JSON.stringify({ isPlaying: false }), {
				status: 200,
				headers: headers
			});
		} else {
			// Check if the response is valid JSON
			if (response && typeof response === 'object') {
				return new Response(JSON.stringify({
					id: response.item.id,
					isPlaying: response.is_playing,
					title: response.item.name,
					artist: response.item.artists.map((_artist: any) => _artist.name).join(', '),
					album: response.item.album.name,
					albumImageUrl: response.item.album.images[0].url,
					songUrl: response.item.external_urls.spotify
				} as NowPlayingSong), {
					status: 200,
					headers: headers
				});
			} else {
				// Handle the case where the response is not valid JSON
				console.error('Invalid JSON response:', response);
				return new Response(JSON.stringify({ error: 'Invalid JSON response' }), {
					status: 500,
					headers: headers
				});
			}
		}
	} catch (error) {
		console.error('Error fetching now playing data:', error);
		return new Response(JSON.stringify({ error: 'Error fetching now playing data' }), {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
};
