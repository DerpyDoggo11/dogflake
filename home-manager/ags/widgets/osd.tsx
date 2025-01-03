import { bind, timeout, Variable } from 'astal';
import { App, Astal, Widget } from 'astal/gtk3';
import Wp from 'gi://AstalWp'
import Brightness from '../services/brightness';
const brightness = new Brightness();

let dontShow = true;
let count = 0;
const icon: Variable<string> = new Variable('');
const val: Variable<Number> = new Variable(0);

timeout(1000, () => {
    dontShow = false;
});

const speaker = Wp.get_default()?.audio.defaultSpeaker!;

// TODO for better performance, handle brightness service at root and pass its object thru here
export const OSD = () => 
    <window
        name="osd"
        anchor={Astal.WindowAnchor.BOTTOM}
        application={App}
        visible={false}
        setup={(self) => {
            self.hook(brightness, 'notify::screen', () => {
                OSDChange('brightness', brightness.screen, self);
            });
        
            Variable.derive([bind(speaker, 'volume'), bind(speaker, 'mute')], (v) => {
                OSDChange('vol', v, self);
            });
        }}
    >
        <box vertical>
            <icon icon={bind(icon)}/>
            <levelbar value={bind(val).as(Number)} widthRequest={500}>
            </levelbar>    
        </box>
    </window>

const OSDChange = (type: string, value: Number, osd: Widget.Window) => {
    if (dontShow)
        return;

    icon.set((type == 'vol') ? speaker.volume_icon : 'display-brightness-symbolic');
    val.set(value);
    osd.visible = true;

    count++;
    timeout(3000, () => { // 3 second hide time
        count--;

        if (count === 0)
            osd.visible = false;
    });
};
