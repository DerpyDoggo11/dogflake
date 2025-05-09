// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/index.tsx

import { Astal, App } from 'astal/gtk4';
import { Corner } from './corners';
const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

export const cornerTop = (monitor: number): Astal.Window => (
    <window
        name="cornertop"
        monitor={monitor}
        anchor={TOP | LEFT}
        application={App}
        visible
    >
        {Corner('top')}
    </window>
);

export const cornerBottom = (monitor: number): Astal.Window => (
    <window
        name="cornerbottom"
        monitor={monitor}
        anchor={BOTTOM | LEFT}
        application={App}
        visible
    >
        {Corner('bottom')}
    </window>
);
