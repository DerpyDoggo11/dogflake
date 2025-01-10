import Apps from 'gi://AstalApps'
import { App, Astal, Gtk, Gdk } from 'astal/gtk4';
import { bind } from 'astal';
import { playlistName } from '../../services/mediaplayer';

const apps = new Apps.Apps()
let text: Gtk.Entry;

const hide = () => App.toggle_window("launcher");

const AppBtn = ({ app }: { app: Apps.Application }) =>
    <button
        cssClasses={["AppBtn"]}
        onKeyPressed={(_, key) => {
            if (key == Gdk.KEY_Return) {
                app.launch(); 
                hide();
            }
        }}
    >
        <box>
            <image iconName={app.iconName}/>
            <box valign={Gtk.Align.CENTER} vertical>
                <label
                    cssClasses={["name"]}
                    xalign={0}
                    label={app.name}
                />
                {app.description && <label
                    cssClasses={["description"]}
                    wrap
                    maxWidthChars={1} // Literally any value forces wrap for some reason
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
        onKeyPressed={(_, key) =>
            (key == 65307) // Gdk.KEY_Escape
               && hide()
        }
    >
        <box heightRequest={700}> {/* Allocate enough height to prevent resizing bug */}
            <box widthRequest={500} cssClasses={["launcher"]} vertical valign={Gtk.Align.START}>
                <overlay>
                    <box
                        cssClasses={["searchBg"]}
                        setup={() =>
                            playlistName.subscribe((w) =>
                                App.apply_css(`.searchBg { background-image: url("file:///home/alec/Projects/flake/home-manager/wallpapers/${w}.jpg"); }`)
                            )
                        }
                    />
                    <entry
                        type="overlay"
                        primaryIconName="system-search-symbolic"
                        placeholderText="Search"
                        onActivate={() => {
                            apps.fuzzy_query(text.text)?.[0].launch();
                            hide();
                        }}
                        setup={self => { // Auto-grab focus when launched
                            text = self;
                            App.connect("window-toggled", () =>
                                (App.get_window("launcher")?.visible == true)
                                    && self.grab_focus()
                            );
                        }}
                    />
                </overlay>
                <box spacing={6} vertical>
                    {bind(text, 'text').as(text =>
                        apps.fuzzy_query(text).slice(0, 5)
                        .map((app: Apps.Application) => <AppBtn app={app}/>)
                    )}
                </box>
            </box>
        </box>
    </window>
