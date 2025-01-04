import { bind } from 'astal';
import MprisService from 'gi://AstalMpris'

const mpris = MprisService.get_default();

const mprisBtn = () => 
    <button
        onClick={() => mpris.players[0].play_pause()}
        onScroll={(_, e) => (e.delta_y > 0) ? mpris.players[0].next() : mpris.players[0].previous()}
        hexpand 
        cursor='pointer'>
        <icon icon='emblem-music-symbolic'/>
    </button>

export const Mpris = () => {
    bind(mpris, 'players').as((players) => {
        return (players.length) ? mprisBtn() : <></>
    });

    // Bind doesn't run on start - fallback
    return (mpris.players.length) ? mprisBtn() : <></>;
};
