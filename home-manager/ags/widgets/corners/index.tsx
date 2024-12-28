// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/index.tsx

import { Astal, Gdk, App } from 'astal/gtk3';

import RoundedCorner from './corners';

const TopLeft = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornertl"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT }
        application={App}
    >
        {RoundedCorner('topleft')}
    </window>
);

const TopRight = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornertr"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT }
        application={App}
    >
        {RoundedCorner('topright')}
    </window>
);

const BottomLeft = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornerbl"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT }
        application={App}
    >
        {RoundedCorner('bottomleft')}
    </window>
);

const BottomRight = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornerbr"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT }
        application={App}
    >
        {RoundedCorner('bottomright')}
    </window>
);


export default (gdkmonitor: Gdk.Monitor) => [
    TopLeft(gdkmonitor),
    TopRight(gdkmonitor),
    BottomLeft(gdkmonitor),
    BottomRight(gdkmonitor),
];