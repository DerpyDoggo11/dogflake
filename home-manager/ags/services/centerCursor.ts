import Hyprland from 'gi://AstalHyprland?version=0.1';
const hypr = Hyprland.get_default();

// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/f22254cb1e609d91905b9964815e72678eee1cac/modules/ags/gtk4/lib/hypr.ts#L64

export default () => {
    let x;
    let y;
    const monitor = hypr.get_focused_monitor();

    // TODO fix me
    console.log(monitor, monitor.get_height(), monitor.get_width());

    if (monitor.get_transform() == 1 || monitor.get_transform() == 3) {
        x = monitor.get_x() - (monitor.get_height() / 4);
        y = monitor.get_y() - (monitor.get_width() / 4);
    } else {
        x = monitor.get_x() + (monitor.get_width() / 2);
        y = monitor.get_y() + (monitor.get_height() / 2);
    };

    hypr.dispatch('movecursor', `${x} ${y}`);
}