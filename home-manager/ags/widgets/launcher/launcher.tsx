import Apps from 'gi://AstalApps'
import { App, Astal, Gdk, Gtk } from 'astal/gtk4'
import { Variable, bind } from 'astal'
import { playlistName } from '../../services/mediaplayer';

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
        cssClasses={["AppBtn"]}
        onClicked={() => { app.launch(); hide(); }}
    >
        <box>
            <image iconName={iconSubstitute(app.iconName)}/>
            <box valign={Gtk.Align.CENTER} vertical>
                <label
                    cssClasses={["name"]}
                    //truncate todo add me back
                    xalign={0}
                    label={app.name}
                />
                {app.description && <label
                    cssClasses={["description"]}
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
        onKeyPressed={(self, key) =>
            (key === Gdk.KEY_Escape)
               && self.hide()
        }
    >
        <box widthRequest={500} cssClasses={["launcher"]} vertical>
            <box 
                cssClasses={["searchHeader"]} // todo fix css below
                //css={bind(playlistName).as((w) => `background-image: url('../wallpapers/${w}.jpg');`)}
            >
                <image iconName="system-search-symbolic"/>
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
                            if (win?.visible == true)
                                self.grab_focus()
                        });
                    }}
                />
            </box>
            <box spacing={6} vertical>
                {list.as(list => list.map(app => <AppBtn app={app}/>))}
            </box>
        </box>
    </window>
