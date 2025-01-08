import Apps from 'gi://AstalApps'
import { App, Astal, Gtk } from 'astal/gtk4'
import { bind } from 'astal'
import { playlistName } from '../../services/mediaplayer';

const apps = new Apps.Apps()
let text: Gtk.Entry;

// Band-aid warning suppresion about missing icon - TODO find permanent solution
const iconSubstitute = (icon: string) =>
    (icon == 'system-file-manager')
        ? 'system-file-manager-symbolic'
        : icon;

const hide = () => App.toggle_window("launcher");

const AppBtn = ({ app }: { app: Apps.Application }) =>
    <button
        cssClasses={["AppBtn"]}
        onButtonPressed={() => { app.launch(); hide(); }}
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
        onShow={() => text.text = ''}
        onKeyPressed={(self, key) =>
            (key == 65307) // Gdk.KEY_Escape
               && self.hide()
        }
    >
        <box widthRequest={500} cssClasses={["launcher"]} vertical>
            <box 
                cssClasses={["searchHeader"]} // todo fix css below
                setup={() =>
                    playlistName.subscribe((w) => {
                        App.apply_css(`.searchHeader { background-image: url('/home/alec/Projects/flake/wallpapers/${w}.jpg');`, false)
                    })
                }
            >
                <image iconName="system-search-symbolic"/>
                <entry
                    placeholderText="Search"
                    hexpand
                    onActivate={() => {
                        apps.fuzzy_query(text.text)?.[0].launch();
                        hide();
                    }}
                    setup={self => { // Auto-grab focus when launched
                        text = self;
                        App.connect("window-toggled", () => {
                            const win = App.get_window("launcher");
                            if (win?.visible == true)
                                self.grab_focus()
                        });
                    }}
                />
            </box>
            <box spacing={6} vertical>
                {bind(text, 'text').as(text =>
                    apps.fuzzy_query(text).slice(0, 5)
                    .map((app: Apps.Application) => <AppBtn app={app}/>)
                )}
            </box>
        </box>
    </window>
