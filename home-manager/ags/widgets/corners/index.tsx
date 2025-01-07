// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/index.tsx

import { Astal, Gdk, App } from 'astal/gtk3';
import { Corner } from './corners';

export const TopLeft = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornertl"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT }
        application={App}
    >
        {Corner('topleft')}
    </window>
);

export const TopRight = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornertr"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT }
        application={App}
    >
        {Corner('topright')}
    </window>
);

export const BottomLeft = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornerbl"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT }
        application={App}
    >
        {Corner('bottomleft')}
    </window>
);

export const BottomRight = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornerbr"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT }
        application={App}
    >
        {Corner('bottomright')}
    </window>
);