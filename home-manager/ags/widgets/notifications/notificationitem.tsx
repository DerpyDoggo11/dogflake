import { GLib } from "astal"
import { Gtk, Astal } from "astal/gtk3"
import Notifd from "gi://AstalNotifd"
const { START, CENTER, END } = Gtk.Align

const isIcon = (icon: string) =>
    !!Astal.Icon.lookup_icon(icon)

const fileExists = (path: string) =>
    GLib.file_test(path, GLib.FileTest.EXISTS)

const time = (time: number) => GLib.DateTime
    .new_from_unix_local(time)
    .format("%H:%M")!

export const NotificationItem = (n: Notifd.Notification) =>
    <box vertical className="notification">
        <box className="header">
            {(n.appIcon || n.desktopEntry) && <icon
                className="app-icon"
                visible={Boolean(n.appIcon || n.desktopEntry)}
                icon={n.appIcon || n.desktopEntry}
            />}
            <label
                className="app-name"
                halign={START}
                truncate
                label={n.appName || "Unknown"}
            />
            <label
                className="time"
                hexpand
                halign={END}
                label={time(n.time)}
            />
        </box>
        <box className="content">
            {n.image && fileExists(n.image) && <box
                valign={START}
                className="image"
                css={`background-image: url('${n.image}')`}
            />}
            {n.image && isIcon(n.image) && <box
                expand={false}
                valign={START}
                className="icon-image">
                <icon icon={n.image} expand halign={CENTER} valign={CENTER} />
            </box>}
            <box vertical>
                <label
                    className="summary"
                    halign={START}
                    xalign={0}
                    label={n.summary}
                    truncate
                />
                {n.body && <label
                    className="body"
                    wrap
                    useMarkup
                    halign={START}
                    xalign={0}
                    justifyFill
                    label={n.body}
                />}
                {n.get_actions().length > 0 && <box className="actions">
                    {n.get_actions().map(({ label, id }) => (
                        <button
                            hexpand
                            onClicked={() => { n.invoke(id); /* TODO delete me here */ }}>
                            <label label={label} halign={CENTER}/>
                        </button>
                    ))}
                </box>}
            </box>
        </box>
    </box>
