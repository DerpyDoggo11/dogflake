import { App } from 'astal/gtk4';
import { bind, execAsync } from 'astal';
import { isPlaying, playlistName, playPause } from '../../../services/mediaplayer';

export const Media = () =>
    <button
        cssClasses={["media"]}
        hexpand
        onButtonPressed={() => playPause()}
        onScroll={(_, __, y) => execAsync('mpc volume ' + ((y < 0) ? '+5' : '-5'))}
        setup={() =>
            playlistName.subscribe((w) =>
                App.apply_css(`#bar .media { background-image: url("file:///home/alec/Projects/flake/home-manager/ags/services/playlists/${w}.png"); }`)
            )
        }
    >
        <image iconName={bind(isPlaying).as(
            (v) => (v) ? 'media-playback-pause-symbolic' : 'media-playback-start-symbolic')
        }/>
    </button>
