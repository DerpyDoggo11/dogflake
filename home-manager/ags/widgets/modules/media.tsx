import { bind } from 'astal';
import Mpris from 'gi://AstalMpris'

const mpris = Mpris.get_default();

const mediaBtn = () => 
    <button
        onClick={() => mpris.players[0].play_pause()}
        onScroll={(_, e) => (e.delta_y > 0) ? mpris.players[0].next() : mpris.players[0].previous()}
        hexpand cursor="pointer">
        <icon icon="emblem-music-symbolic"/>
    </button>

export const Media = () => {
    bind(mpris, "players").as((players) => {
        console.log(players.length)
        if (players.length < 1)
            return <box/>; // Don't show anything if no player to control
        
        return mediaBtn()
    });

    // Bind doesn't run on start - fallback
    return (mpris.players.length) ? mediaBtn() : <box/>;
};
