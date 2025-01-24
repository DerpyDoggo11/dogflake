import { bind, timeout, Variable } from 'astal';
import { App, Astal, Gtk } from 'astal/gtk4';
import Wp from 'gi://AstalWp';
import { brightness } from '../../services/brightness';

const speaker = Wp.get_default()?.audio.defaultSpeaker!;
let dontShow = true;
let count = 0;
const icon: Variable<string> = new Variable('');
const val: Variable<number> = new Variable(0);

timeout(3000, () => dontShow = false);

export const osd = () =>
    <window
        name="osd"
        anchor={Astal.WindowAnchor.BOTTOM}
        application={App}
        visible={false}
        setup={(self) => {
            brightness.subscribe((value) =>
                osdChange('brightness', value, self)
            );
        
            Variable.derive([bind(speaker, 'volume'), bind(speaker, 'mute')], (v) => {
                osdChange('vol', v, self);
            });
        }}
    >
        <box cssClasses={['osd']}>
            <image iconName={bind(icon)}/>
            <levelbar value={bind(val).as(Number)} widthRequest={400}/>
        </box>
    </window>

const osdChange = (type: string, value: number, osd: Gtk.Window) => {
    if (dontShow)
        return;

    icon.set((type == 'vol') ? speaker.volume_icon : 'display-brightness-symbolic');
    val.set(value);
    osd.visible = true;

    count++;
    timeout(2000, () => { // 2 second hide time
        count--;

        if (count === 0)
            osd.visible = false;
    });
};
