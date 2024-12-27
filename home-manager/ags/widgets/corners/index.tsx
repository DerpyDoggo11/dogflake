// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/index.tsx

import { Astal, Gdk } from 'astal/gtk3';

import RoundedCorner from './corners';

const TopLeft = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornertl"
        layer={Astal.Layer.OVERLAY}
        exclusivity={Astal.Exclusivity.IGNORE}
        gdkmonitor={gdkmonitor}
        anchor={
            Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT
        }
        clickThrough={true}
    >
        {RoundedCorner('topleft')}
    </window>
);

const TopRight = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornertr"
        layer={Astal.Layer.OVERLAY}
        exclusivity={Astal.Exclusivity.IGNORE}
        gdkmonitor={gdkmonitor}
        anchor={
            Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT
        }
        clickThrough={true}
    >
        {RoundedCorner('topright')}
    </window>
);

const BottomLeft = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornerbl"
        layer={Astal.Layer.OVERLAY}
        exclusivity={Astal.Exclusivity.IGNORE}
        gdkmonitor={gdkmonitor}
        anchor={
            Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT
        }
        clickThrough={true}
    >
        {RoundedCorner('bottomleft')}
    </window>
);

const BottomRight = (gdkmonitor: Gdk.Monitor) => (
    <window
        name="cornerbr"
        layer={Astal.Layer.OVERLAY}
        exclusivity={Astal.Exclusivity.IGNORE}
        gdkmonitor={gdkmonitor}
        anchor={
            Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT
        }
        clickThrough={true}
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