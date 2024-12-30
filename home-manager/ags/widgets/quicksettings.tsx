import { BrightnessSlider } from "../services/brightness"
import { App, Astal } from 'astal/gtk3';

export const quickSettings = () =>
    <window
        name="quickSettings"
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        application={App}
        visible={false} // Not visible by default
    >
        <BrightnessSlider/>
    </window>

