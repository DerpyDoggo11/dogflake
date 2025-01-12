// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/index.tsx

import { Astal, Gdk, App } from 'astal/gtk4';
import { Corner } from './corners';

export const TopLeft = (monitor = 0) => (
    <window
        name="cornertl"
        monitor={monitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT }
        application={App}
    >
        {Corner('topleft')}
    </window>
);

export const TopRight = (monitor = 0) => (
    <window
        name="cornertr"
        monitor={monitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT }
        application={App}
    >
        {Corner('topright')}
    </window>
);

export const BottomLeft = (monitor = 0) => (
    <window
        name="cornerbl"
        monitor={monitor}
        anchor={ Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT }
        application={App}
    >
        {Corner('bottomleft')}
    </window>
);

export const BottomRight = (monitor = 0) => (
    <window
        name="cornerbr"
        monitor={monitor}
        anchor={ Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT }
        application={App}
    >
        {Corner('bottomright')}
    </window>
);