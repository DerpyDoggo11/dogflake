import Apps from 'gi://AstalApps'
import { App, Astal, Gtk, Gdk } from 'astal/gtk4';
import { bind } from 'astal';
import { playlistName } from '../../services/mediaplayer';

const apps = new Apps.Apps()
let textBox: Gtk.Entry;

const hide = () => App.toggle_window("launcher");

const AppBtn = ({ app }: { app: Apps.Application }) =>
    <button
        onKeyPressed={(_, key) => {
            if (key == Gdk.KEY_Return) {
                app.launch();
                hide();
            }
        }}
        onClicked={() => { app.launch(); hide(); }}
        cssClasses={['button']}
    >
        <box>
            <image iconName={app.iconName}/>
            <box valign={Gtk.Align.CENTER} vertical>
                <label
                    cssClasses={['name']}
                    xalign={0}
                    label={app.name}
                />
                {app.description && <label
                    cssClasses={['description']}
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
        onShow={() => textBox.text = ''}
        onKeyPressed={(_, key) =>
            (key == 65307) // Gdk.KEY_Escape
               && hide()
        }
    >
        <box heightRequest={700}>
            <box widthRequest={500} cssClasses={['launcher']} vertical valign={Gtk.Align.START}>
                <overlay>
                    <box
                        cssClasses={['searchBg']}
                        setup={() =>
                            playlistName.subscribe((w) =>
                                App.apply_css(`.searchBg { background-image: url("file:///home/alec/Projects/flake/wallpapers/${w}.jpg"); }`)
                            )
                        }
                    />
                    <entry
                        type="overlay"
                        primaryIconName="system-search-symbolic"
                        placeholderText="Search"
                        onActivate={() => {
                            apps.fuzzy_query(textBox.text)?.[0].launch();
                            hide();
                        }}
                        setup={self => { // Auto-grab focus when launched
                            textBox = self;
                            App.connect("window-toggled", () =>
                                (App.get_window("launcher")?.visible == true)
                                    && self.grab_focus()
                            );
                        }}
                    />
                </overlay>
                <box spacing={6} vertical>
                    {bind(textBox, 'text').as(text =>
                        apps.fuzzy_query(text).slice(0, 5)
                        .map((app: Apps.Application) => <AppBtn app={app}/>)
                    )}
                </box>
            </box>
        </box>
    </window>
