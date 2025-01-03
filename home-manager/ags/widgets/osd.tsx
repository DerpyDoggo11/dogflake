import { bind } from 'astal';
import { App, Astal, Gdk } from 'astal/gtk3';
import Wp from 'gi://AstalWp'

const speaker = Wp.get_default()?.audio.defaultSpeaker!;

export const OSD = (gdkmonitor: Gdk.Monitor) => 
    <window
        className="bar"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.BOTTOM }
        application={App}
        visible={false} // TODO finish me
    >
    
        <box vertical>
            <icon icon=""/>
            <levelbar value={bind(speaker, "volume")} widthRequest={500}>
            </levelbar>    
        </box>
    </window>