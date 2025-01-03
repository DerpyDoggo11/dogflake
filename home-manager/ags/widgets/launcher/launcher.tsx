import Apps from 'gi://AstalApps'
import { App, Astal, Gdk, Gtk } from 'astal/gtk3'
import { Variable } from 'astal'

const apps = new Apps.Apps()
const text = Variable('')
const list = text(text => apps.fuzzy_query(text).slice(0, 5)) // 5 max items

// Band-aid warning suppresion about missing icon - TODO find permanent solution
const iconSubstitute = (icon: string) =>
    (icon == 'system-file-manager')
        ? 'system-file-manager-symbolic'
        : icon;

const hide = () => App.toggle_window("launcher");

const AppBtn = ({ app }: { app: Apps.Application }) =>
    <button
        className="AppBtn"
        onClicked={() => { app.launch(); hide(); }}
    >
        <box>
            <icon icon={iconSubstitute(app.iconName)}/>
            <box valign={Gtk.Align.CENTER} vertical>
                <label
                    className="name"
                    truncate
                    xalign={0}
                    label={app.name}
                />
                {app.description && <label
                    className="description"
                    wrap
                    xalign={0}
                    label={app.description}
                />}
            </box>
        </box>
    </button>


export const launcher = () =>
    <window
        name="launcher"
        anchor={Astal.WindowAnchor.TOP}
        keymode={Astal.Keymode.ON_DEMAND}
        application={App}
        visible={false}
        onShow={() => text.set("")}
        onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
               self.hide()
        }}
    >
        <box widthRequest={500} className="launcher" vertical>
            <box className="searchHeader">
                <icon icon="system-search-symbolic"/>
                <entry
                    placeholderText="Search"
                    text={text()}
                    hexpand
                    onChanged={self => text.set(self.text)}
                    onActivate={() => {
                        apps.fuzzy_query(text.get())?.[0].launch();
                        hide();
                    }}
                    setup={self => { // Auto-grab focus when launched
                        App.connect("window-toggled", () => {
                            const win = App.get_window("launcher");
                            if (win.visible == true)
                                self.grab_focus()
                        })
                    }}
                />
            </box>
            <box spacing={6} vertical>
                {list.as(list => list.map(app => <AppBtn app={app}/>))}
            </box>
        </box>
    </window>
