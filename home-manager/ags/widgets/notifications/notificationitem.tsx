import { GLib } from 'astal';
import { Gtk } from 'astal/gtk4';
import Notifd from 'gi://AstalNotifd';
import Pango from 'gi://Pango';
const { START, CENTER, END } = Gtk.Align

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS);
const time = (time: number) => GLib.DateTime.new_from_unix_local(time).format("%H:%M")!;

export const notificationItem = (n: Notifd.Notification) =>
    <box vertical vexpand cssClasses={["notification"]}>
        <box cssClasses={["header"]}>
            {(n.appIcon || n.desktopEntry) && <image
                cssClasses={["app-icon"]}
                visible={Boolean(n.appIcon || n.desktopEntry)}
                iconName={n.appIcon || n.desktopEntry}
            />}
            <label
                cssClasses={["app-name"]}
                halign={START}
                ellipsize={Pango.EllipsizeMode.END}
                label={n.appName || "Unknown"}
            />
            <label
                cssClasses={["time"]}
                hexpand
                halign={END}
                label={time(n.time)}
            />
        </box>
        <box cssClasses={["content"]}>
            {n.image && fileExists(n.image) && <box
                valign={START}
                cssClasses={["image"]}
            ><image iconName={n.image}/></box>}
            {/* todo test if we can add images to this */}
            {n.image && <box
                hexpand={false}
                vexpand={false}
                valign={START}
                cssClasses={["icon-image"]}>
                <image iconName={n.image} hexpand vexpand halign={CENTER} valign={CENTER} />
            </box>}
            <box vertical>
                <label
                    cssClasses={["summary"]}
                    halign={START}
                    xalign={0}
                    label={n.summary}
                    //truncate todo add me
                />
                {n.body && <label
                    cssClasses={["body"]}
                    wrap
                    useMarkup
                    xalign={0}
                    label={n.body}
                />}
                {n.get_actions().length > 0 && <box cssClasses={["actions"]} spacing={5}>
                    {n.get_actions().map(({ label, id }) =>
                        <button
                            hexpand
                            onButtonPressed={() => { n.invoke(id); n.dismiss(); }}
                        >
                            <label label={label} halign={CENTER}/>
                        </button>
                    )}
                </box>}
            </box>
        </box>
    </box>
