import { App, Gdk } from 'astal/gtk4';
import { exec, execAsync, Variable, bind } from 'astal';

export type musicAction = 'next' | 'prev';
export const isPlaying: Variable<boolean> = new Variable(false);
export const playlist: Variable<number> = new Variable(1);
export const playlistName: Variable<string> = new Variable('');

// These playlists match with the folder names in ~/Music
const playlists =      ['Study',  'Focus',  'Synthwave', 'SynthAmbient', 'Ambient'];
const playlistColors = ['CC7F1F', '649FEC', 'C363C7',    '8169E5',       '1A47D0']

export const updTrack = (direction: musicAction) => {
    exec('mpc pause');
    exec('mpc ' + direction);

    // Start playing again
    execAsync('mpc play');
    isPlaying.set(true);
};

export const playPause = () => {
    execAsync('mpc toggle');
    isPlaying.set(!isPlaying.get());
};

export const chngPlaylist = (direction: musicAction) => {
    if (direction == 'next') {
        (playlist.get() == playlists.length)
        ? (playlist.set(1)) // Go to first
        : (playlist.set(Number(playlist.get()) + 1));
    } else if (direction == 'prev') {
        (playlist.get() == 1)
        ? (playlist.set(playlists.length)) // Go to last
        : (playlist.set(Number(playlist.get()) - 1));
    }

    // Stop playing music
    exec('mpc pause');
    isPlaying.set(false);

    playlistName.set(playlists[Number(playlist.get()) - 1]);
    execAsync(`swww img /home/dog/dogflake/wallpapers/${playlistName.get()}.jpg --transition-type grow --transition-fps 90`);

    // Clear the current cache and add the new playlist
    exec('mpc clear');
    exec(`mpc add ${playlistName.get()}/`);
    exec('mpc shuffle');
    playPause(); // Start playing
};

export const initMedia = () => {
    playlistName.set('Study'); // Must set to invoke binds

    execAsync('mpc crossfade 2');
    execAsync('swww img /home/dog/dogflake/wallpapers/Study.jpg --transition-type grow --transition-fps 90');

    exec('mpc clear');
    exec(`mpc add ${playlistName.get()}/`);
    execAsync('mpc shuffle');
};


export const Media = () =>
            <button
                cssClasses={['media']}
                type="overlay"
                onButtonPressed={() => playPause()}
                onScroll={(_, __, y) => execAsync('mpc volume ' + ((y < 0) ? '+5' : '-5'))}
                cursor={Gdk.Cursor.new_from_name('pointer', null)}
            >
                <image iconName={bind(isPlaying).as(
                    (v) => (v) ? 'media-playback-pause-symbolic' : 'media-playback-start-symbolic')
                }/>
            </button>
