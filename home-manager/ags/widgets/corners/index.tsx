// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/index.tsx

import { Astal, App } from 'astal/gtk4';
import { Corner } from './corners';
const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

export const topLeft = (monitor: number) => (
    <window
        name="cornertl"
        monitor={monitor}
        anchor={TOP | LEFT}
        application={App}
        visible
    >
        {Corner('topleft')}
    </window>
);

export const topRight = (monitor: number) => (
    <window
        name="cornertr"
        monitor={monitor}
        anchor={TOP | RIGHT}
        application={App}
        visible
    >
        {Corner('topright')}
    </window>
);

export const bottomLeft = (monitor: number) => (
    <window
        name="cornerbl"
        monitor={monitor}
        anchor={BOTTOM | LEFT}
        application={App}
        visible
    >
        {Corner('bottomleft')}
    </window>
);

export const bottomRight = (monitor: number) => (
    <window
        name="cornerbr"
        monitor={monitor}
        anchor={BOTTOM | RIGHT}
        application={App}
        visible
    >
        {Corner('bottomright')}
    </window>
);