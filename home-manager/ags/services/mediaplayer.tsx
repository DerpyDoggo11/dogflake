import { App, Gdk } from 'astal/gtk4';
import { exec, execAsync, Variable, bind } from 'astal';

export type musicAction = 'next' | 'prev';
export const isPlaying: Variable<boolean> = new Variable(false);
export const playlist: Variable<number> = new Variable(1);
export const playlistName: Variable<string> = new Variable('');

// These playlists match with the folder names in ~/Music/
const playlists =      ['Study',  'Focus',  'Synthwave', 'SynthAmbient', 'Ambient'];
const playlistColors = ['E2891B', '47A2EC', 'BF4CE0',    '8169E5',       '4870EB']

export const updTrack = (direction: musicAction) => {
    exec('mpc pause'); // Pause to prevent bugs
    exec('mpc ' + direction); // Update track
    
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

    // Update the playlist and playlist names
    playlistName.set(playlists[Number(playlist.get()) - 1]);

    // Change the wallpaper
    execAsync(`swww img /home/alec/wallpapers/${playlistName.get()}.jpg --transition-type grow --transition-fps 90`);

    // Clear the current cache and add the new playlist
    exec('mpc clear');
    exec(`mpc add ${playlistName.get()}/`);
    exec('mpc shuffle'); // Shuffle current playlist
    playPause(); // Start playing song again
};

export const initMedia = () => {
    playlistName.set('Study'); // Default playlist
    execAsync('mpc crossfade 2'); // Set crossfade value
    execAsync(`swww img /home/alec/wallpapers/${playlistName.get()}.jpg --transition-type grow --transition-fps 90`);

    // On first start, clear and load new playlist
    exec('mpc clear');
    exec(`mpc add ${playlistName.get()}/`);
    execAsync('mpc shuffle');
}


export const Media = () =>
    <button
        cssClasses={['media']}
        hexpand
        onButtonPressed={() => playPause()}
        onScroll={(_, __, y) => execAsync('mpc volume ' + ((y < 0) ? '+5' : '-5'))}
        setup={() =>
            playlistName.subscribe((w) =>
                App.apply_css(`#bar .media { background-color: #${playlistColors[playlists.indexOf(w)]}; }`) // TODO add blur to make this look good like the launcher
            )
        }
        cursor={Gdk.Cursor.new_from_name('pointer', null)}
    >
        <image iconName={bind(isPlaying).as(
            (v) => (v) ? 'media-playback-pause-symbolic' : 'media-playback-start-symbolic')
        }/>
    </button>
