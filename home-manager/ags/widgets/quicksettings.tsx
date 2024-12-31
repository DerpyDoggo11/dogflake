import { BrightnessSlider } from "../services/brightness"
import { VolumeSlider, Mixer } from '../services/sound'
import { App, Astal } from 'astal/gtk3';

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

            <Mixer/>
        </box>
    </window>

