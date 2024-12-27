import { bind } from 'astal';
import Mpris from 'gi://AstalMpris'

const mpris = Mpris.get_default();

export const Media = () => {
    return bind(mpris, "players").as((players) => {
        if (players.length < 1)
            return ""; // Don't show anything if no player to control
        
        return (
            <button
                onClick={() => mpris.players[0].play_pause()}
                onScroll={(_, e) => (e.delta_y > 0) ? mpris.players[0].next() : mpris.players[0].previous()}
                hexpand cursor="pointer">
                <icon icon="emblem-music-symbolic"/>
            </button>
        );
    });
};
