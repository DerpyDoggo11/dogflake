import { bind } from 'astal';
import MprisService from 'gi://AstalMpris'

const mpris = MprisService.get_default();

export const Mpris = () => 
    <button
        className="mpris"
        onClick={() => mpris.players[0].play_pause()}
        onScroll={(_, e) => (e.delta_y > 0) ? mpris.players[0].next() : mpris.players[0].previous()}
        hexpand 
        visible={bind(mpris, 'players').as((players) => (players.length > 0))}
        cursor='pointer'>
        <icon icon='emblem-music-symbolic'/>
    </button>

