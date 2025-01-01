import { BrightnessSlider } from "../services/brightness"
import { VolumeSlider, SinkSelector } from '../services/sound'
import { App, Astal } from 'astal/gtk3';
import { DND } from './notifications/notifications';

const DNDToggle = () => 
    <button 
        hexpand
        onClick={() => DND.set(!DND.get())}
    >
        Toggle DND
    </button>

export const quickSettings = () =>
    <window
        name="quickSettings"
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        application={App}
        visible={false} // Not visible by default
    >
        <box widthRequest={500} className="quickSettings" vertical>
            <VolumeSlider/>
            <BrightnessSlider/>

            <SinkSelector/>
            <DNDToggle/>
        </box>
    </window>

