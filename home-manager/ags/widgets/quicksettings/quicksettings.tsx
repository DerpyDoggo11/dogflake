import { BrightnessSlider } from "../../services/brightness"
import { VolumeSlider, SinkSelector } from './sound'
import { App, Astal } from 'astal/gtk3';
import { bind } from 'astal';
import { DND } from '../notifications/notifications';

const DNDToggle = () => 
    <button
        widthRequest={60}
        onClick={() => DND.set(!DND.get())}
        className={bind(DND).as((dnd) => (dnd) ? 'dnd active' : 'dnd')}
    >
        <icon icon="notifications-disabled-symbolic"/>
    </button>

export const quickSettings = () =>
    <window
        name="quickSettings"
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        application={App}
        visible={false}
    >
        <box widthRequest={400} className="quickSettings" vertical>
            <box marginBottom={5}>
                <box vertical>
                    <VolumeSlider/>
                    <BrightnessSlider/>
                </box>
                <DNDToggle/>
            </box>
            <SinkSelector/>
        </box>
    </window>

