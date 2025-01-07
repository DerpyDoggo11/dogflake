import { bind, execAsync } from 'astal';
import { isPlaying, playlistName, playPause } from '../../../services/mediaplayer';

export const Media = () =>
    <button
        cssClasses={["media"]}
        hexpand
        onClick={() => playPause()}
        onScroll={(_, __, y) => execAsync('mpc volume ' + ((y < 0) ? '+5' : '-5'))}
        // todo make css global
        //css={bind(playlistName).as((w) => `background-image: url('./services/playlists/${w}.png');`)}
    >
        <image iconName={bind(isPlaying).as(
            (v) => (v) ? 'media-playback-pause-symbolic' : 'media-playback-start-symbolic')
        }/>
    </button>
