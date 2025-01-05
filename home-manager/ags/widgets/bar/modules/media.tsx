import { bind, execAsync } from 'astal';
import { isPlaying, playlistName, playPause } from '../../../services/mediaplayer';

export const Media = () =>
    <button
        className="media"
        hexpand
        onClick={() => playPause()}
        onScroll={(_, e) => execAsync('mpc volume ' + ((e.delta_y < 0) ? '+5' : '-5'))}
        cursor="pointer"
        css={bind(playlistName).as((w) => `background-image: url('./services/playlists/${w}.png');`)}
    >
        <icon icon={bind(isPlaying).as(
            (v) => (v) ? 'media-playback-pause-symbolic' : 'media-playback-start-symbolic')
        }/>
    </button>
