import { bind } from 'astal';
import Mpris from 'gi://AstalMpris'

const mpris = Mpris.get_default();

const mediaBtn = () => 
    <button
        onClick={() => mpris.players[0].play_pause()}
        onScroll={(_, e) => (e.delta_y > 0) ? mpris.players[0].next() : mpris.players[0].previous()}
        hexpand 
        cursor='pointer'>
        <icon icon='emblem-music-symbolic'/>
    </button>

export const Media = () => {
    bind(mpris, 'players').as((players) => {
        return (players.length) ? mediaBtn() : <></>
    });

    // Bind doesn't run on start - fallback
    return (mpris.players.length) ? mediaBtn() : <></>;
};
