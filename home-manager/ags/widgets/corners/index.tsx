// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/index.tsx

import { Astal, App } from 'astal/gtk4';
import { Corner } from './corners';

export const TopLeft = (monitor: number) => (
    <window
        name="cornertl"
        monitor={monitor}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
        application={App}
        visible
    >
        {Corner('topleft')}
    </window>
);

export const TopRight = (monitor: number) => (
    <window
        name="cornertr"
        monitor={monitor}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        application={App}
        visible
    >
        {Corner('topright')}
    </window>
);

export const BottomLeft = (monitor: number) => (
    <window
        name="cornerbl"
        monitor={monitor}
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        application={App}
        visible
    >
        {Corner('bottomleft')}
    </window>
);

export const BottomRight = (monitor: number) => (
    <window
        name="cornerbr"
        monitor={monitor}
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT}
        application={App}
        visible
    >
        {Corner('bottomright')}
    </window>
);