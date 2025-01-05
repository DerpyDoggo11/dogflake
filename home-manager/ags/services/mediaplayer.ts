import { exec, execAsync } from 'astal';
import { Variable } from "astal";

export type musicAction = 'next' | 'prev';
export const isPlaying: Variable<Boolean> = new Variable(false);
export const playlist: Variable<Number> = new Variable(1);
export const playlistName: Variable<String> = new Variable('Study');

// These playlists match with the folder names in ~/Music/
const playlists = ['Study', 'Focus', 'Synthwave', 'SynthAmbient', 'Ambient'];

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
        ? (playlist.set(1)) 
        : (playlist.set(Number(playlist.get()) + 1));
    } else if (direction == 'prev') {
        (playlist.get() == 1) 
        ? (playlist.set(playlists.length)) // Go to last  
        : (playlist.set(Number(playlist.get()) - 1));
    }

    // Stop playing music
    exec('mpc pause'); // Not really needed, but kept to prevent potential issues
    isPlaying.set(false);
    
    // Update the playlist and playlist names
    playlistName.set(playlists[Number(playlist.get()) - 1]);

    // Change the wallpaper
    execAsync(`swww img /home/alec/wallpapers/${playlistName.get()}.jpg --transition-type grow`);

    // Clear the current cache and add the new playlist
    exec('mpc clear');
    exec(`mpc add ${playlistName.get()}/`);
    exec('mpc shuffle'); // Shuffle current playlist
    playPause(); // Start playing song again
};

export const initMedia = () => {
    execAsync('mpc crossfade 2'); // Set crossfade value
    execAsync(`swww img /home/alec//wallpapers/${playlistName.get()}.jpg --transition-type grow`);

    // On first start, clear and load new playlist
    exec('mpc clear');
    exec(`mpc add ${playlistName.get()}/`);
    execAsync('mpc shuffle');
}