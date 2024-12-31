import { BrightnessSlider } from "../services/brightness"
import { SoundSlider } from '../services/sound'
import { App, Astal } from 'astal/gtk3';

export const quickSettings = () =>
    <window
        name="quickSettings"
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        application={App}
        visible={false} // Not visible by default
    >
        <BrightnessSlider/>
        <SoundSlider/>
    </window>

