import { bind } from 'astal';
import { isPlaying, playlist, playlistName, updTrack, chngPlaylist } from '../../../services/mediaplayer';

export const Media = () =>
    <box className="media">
        <button 
        onClick={() => isPlaying.set(!isPlaying.get())}>
            <icon icon={bind(isPlaying).as(
                (v) => (v) ? 'media-playback-start-symbolic' : 'media-playback-pause-symbolic')
            }/>
        </button>
    </box>