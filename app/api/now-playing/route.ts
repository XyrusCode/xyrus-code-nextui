import { getNowPlaying } from '@/lib/spotify';
import type { NowPlayingResponse,NowPlayingSong } from '@/types/spotify';

export const GET = async () => { 
	const request = await getNowPlaying();
	const response: NowPlayingResponse = await request.json();;

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

		return Response.json(
			{
				id: response.item.id,
				isPlaying: response.is_playing,
				title: response.item.name,
				artist: response.item.artists.map((_artist: any) => _artist.name).join(', '),
				album: response.item.album.name,
				albumImageUrl: response.item.album.images[0].url,
				songUrl: response.item.external_urls.spotify
				
			} as NowPlayingSong,
			{
				status: 200,
				headers: headers
			}
		);
	}
};