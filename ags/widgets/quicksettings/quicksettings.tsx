import { BrightnessSlider } from '../../services/brightness';
import { VolumeSlider, SinkSelector } from './sound';
import { App, Astal, Gdk } from 'astal/gtk4';
import { bind } from 'astal';
import { DND } from '../notifications/notifications';
const { BOTTOM, LEFT } = Astal.WindowAnchor;

const DNDToggle = () =>
    <button
        widthRequest={60}
        onButtonPressed={() => DND.set(!DND.get())}
        cssClasses={bind(DND).as((dnd) => (dnd) ? ['dnd', 'active'] : ['dnd'])}
        cursor={Gdk.Cursor.new_from_name('pointer', null)}
    >
        <image iconName="notifications-disabled-symbolic"/>
    </button>

export const quickSettings = () =>
    <window
        name="quickSettings"
        anchor={BOTTOM | LEFT}
        application={App}
        visible={false}
    >
        <box widthRequest={400} cssClasses={['quickSettings']} vertical>
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

