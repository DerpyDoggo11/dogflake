import { BrightnessSlider } from "../../services/brightness"
import { VolumeSlider, SinkSelector } from './sound'
import { App, Astal } from 'astal/gtk3';
import { bind } from 'astal';
import { DND } from '../notifications/notifications';

const DNDToggle = () => 
    <button
        hexpand
        onClick={() => DND.set(!DND.get())}
        className={bind(DND).as((dnd) => (dnd) ? 'active' : '')}
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
        <box widthRequest={500} className="quickSettings" vertical>
            <box>
                <box vertical>
                    <VolumeSlider/>
                    <BrightnessSlider/>
                </box>
                <DNDToggle/>
            </box>
            <SinkSelector/>
        </box>
    </window>

