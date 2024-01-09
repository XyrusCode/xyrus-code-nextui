export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  id: string;
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type NowPlayingResponse = {
  currently_playing_type: string;
  timestamp: string;
  item: {
    album: {
      name: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
    };
    artists: {
      name: string;
    }[];
      id: string;
    name: string;
    external_urls: {
      spotify: string;
    };
  };
  is_playing: boolean;
};