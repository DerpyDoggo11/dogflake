// Stolen from https://github.com/matt1432/nixos-configs/blob/84ceb51af6bed538aa9bb249a7194a24c3c9a4ad/modules/ags/gtk4/widgets/lockscreen/index.ts

import { Variable, GLib } from 'astal';
import { App, Astal, Gdk, Gtk } from 'astal/gtk4';
import AstalAuth from 'gi://AstalAuth';
import Gtk4SessionLock from 'gi://Gtk4SessionLock';

export default () => {
    const windows = new Map<Gdk.Monitor, Gtk.Widget>();

    const lock = Gtk4SessionLock.Instance.new();

    const unlock = () => {
        lock.unlock();
        Gdk.Display.get_default()?.sync();
        App.quit();
    };

    const Clock = () => {
        const time = Variable<string>('').poll(1000, () => GLib.DateTime.new_now_local().format('%H\n%M')!);

        return <label cssClasses={['clock']} label={time()}/>
    };

    const label = new Gtk.Label({ label: 'Enter password:' });

    const PasswordPrompt = (monitor: Gdk.Monitor) =>
        <window
            name={`bg`}
            namespace={`bg`}
            gdkmonitor={monitor}
            layer={Astal.Layer.OVERLAY}
            visible={true}

            anchor={Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.LEFT |
                Astal.WindowAnchor.RIGHT |
                Astal.WindowAnchor.BOTTOM}

            exclusivity={Astal.Exclusivity.IGNORE}
        >
            <box
                vertical={true}
                halign={Gtk.Align.CENTER}
                valign={Gtk.Align.CENTER}
            >
                <Clock/>
                <box 
                    cssClasses={['entry-box']}
                    vertical={true}
                >
                    {label}

                    <entry
                        halign={Gtk.Align.CENTER}
                        xalign={0.5}
                        visibility={false}
                        placeholder_text={'password'}

                        onRealize={(self) => self.grab_focus()}

                        onActivate={(self) => {
                            self.set_sensitive(false);
                            AstalAuth.Pam.authenticate(self.get_text() ?? '', (_, task) => {
                                try {
                                    AstalAuth.Pam.authenticate_finish(task);
                                    unlock();
                                } catch (e) {
                                    self.set_text('');
                                    label.set_label((e as Error).message);
                                    self.set_sensitive(true);
                                };
                            });
                        }}
                    />
                </box>
            </box>
        </window>

    const lock_screen = () => {
        const display = Gdk.Display.get_default();

        for (let m = 0; m < (display?.get_monitors().get_n_items() ?? 0); m++) {
            const monitor = display?.get_monitors().get_item(m) as Gdk.Monitor;

            if (monitor)
                windows.set(monitor, PasswordPrompt(monitor));
        }

        display?.get_monitors()?.connect('items-changed', () => {
            for (let m = 0; m < (display?.get_monitors().get_n_items() ?? 0); m++) {
                const monitor = display?.get_monitors().get_item(m) as Gdk.Monitor;

                if (monitor && !windows.has(monitor))
                    windows.set(monitor, PasswordPrompt(monitor));
            }
        });

        lock.lock();

        windows.forEach((win, monitor) => {
            lock.assign_window_to_monitor(win, monitor);
            win.show();
        });
    };

    lock_screen();
};