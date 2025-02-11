import style from './style.css';
import lancherStyle from './widgets/launcher/launcher.css';
import barStyle from './widgets/bar/bar.css';
import notificationStyle from './widgets/notifications/notifications.css';
import osdStyle from './widgets/osd/osd.css';
import quicksettingsStyle from './widgets/quicksettings/quicksettings.css';
import powermenuStyle from './widgets/powermenu/powermenu.css';

import { App, Gtk } from 'astal/gtk4';
import { GLib, exec } from 'astal';
import { Bar } from './widgets/bar/bar';
import { topLeft, topRight, bottomLeft, bottomRight } from './widgets/corners';
import { calendar } from './widgets/calendar';
import { emojiPicker } from './widgets/emojipicker';
import { notifications, clearOldestNotification } from './widgets/notifications/notifications';
import { launcher } from './widgets/launcher/launcher';
import { notifySend } from './services/notifySend';
import { screenshot, toggleRec } from './services/screen';
import { quickSettings } from './widgets/quicksettings/quicksettings';
import { osd } from './widgets/osd/osd';
import { powermenu } from './widgets/powermenu/powermenu';
import Hyprland from 'gi://AstalHyprland?version=0.1';
const hypr = Hyprland.get_default();

import { monitorBrightness } from './services/brightness';
import { initMedia, updTrack, playPause, chngPlaylist } from './services/mediaplayer';

const widgetMap: Map<number, Gtk.Widget[]> = new Map();

GLib.setenv("LD_PRELOAD", "", true)

// Per-monitor widgets
const widgets = (monitor: number) => [
    Bar(monitor),
    topLeft(monitor),
    topRight(monitor),
    bottomLeft(monitor),
    bottomRight(monitor)
];

App.start({
    css: style + lancherStyle + barStyle + notificationStyle + osdStyle + quicksettingsStyle + powermenuStyle,
    main() {
        hypr.get_monitors().map((monitor) => widgetMap.set(monitor.id, widgets(monitor.id)));

        setTimeout(() => {
            notifications();
            launcher();
            calendar();
            quickSettings();
            osd();
            powermenu();
            emojiPicker();
            reminders();
            initMedia(); // Mpd player
        }, 500); // Delay to fix widgets on slow devices

        monitorBrightness(); // Start brightness monitor for OSD subscribbable

        // Monitor reactivity
        hypr.connect('monitor-added', (_, monitor) =>
            widgetMap.set(monitor.id, widgets(monitor.id))
        );
        hypr.connect('monitor-removed', (_, id) => {
            widgetMap.get(id)?.forEach((w) => w.disconnect);
            widgetMap.delete(id);
        });
    },
    requestHandler(req, res) {
        const reqArgs = req.split(" ");
        switch(reqArgs[0]) {
            case "hideNotif":
                clearOldestNotification();
                break;
            case "screenshot":
                screenshot((reqArgs[1] == 'true'))
                break;
            case "screenrec":
                toggleRec();
                break;
            case "media":
                switch (reqArgs[1]) {
                    case "next":
                        updTrack('next');
                        break;
                    case "prev":
                        updTrack('prev');
                        break;
                    case "toggle":
                        playPause();
                        break;
                    case "nextPlaylist":
                        chngPlaylist('next');
                        break;
                    case "prevPlaylist":
                        chngPlaylist('prev');
                        break;
                };
                break;
        };
        res("Request handled successfully");
    }
});

const reminders = () => {
    const day = GLib.DateTime.new_now_local().format("%a")!;
    const folderSize = Number(exec(`bash -c "(du -sb /home/alec/Downloads | awk '{print $1}')"`));
    let bodyText;

    if (day == 'Mon') {
        (folderSize > 10000000) // Greater than 10MB
        bodyText = "Clean up some unused files to keep the system clean";
    } else if (day == 'Fri') { // Send spotify cleanup message
        notifySend({
            appName: 'Spotify Sync',
            title: 'Sync Spotify playlists',
            iconName: 'spotify-symbolic',
            body: 'Sync all Spotify playlists to have the latest music',
            actions: [{
                id: 1,
                label: 'Sync Music',
                command: 'foot -e fish -c spotify-sync'
            }]
        });
    } else if (folderSize > 100000000) { // Greater than 100MB
        bodyText = "The Downloads folder is large! Clean up some unused files.";
    };

    (bodyText) && notifySend({
        appName: 'System Cleanup',
        title: 'Clean Downloads folder',
        iconName: 'system-file-manager-symbolic',
        body: bodyText,
        actions: [{
            id: 1,
            label: 'View folder',
            command: 'nemo /home/alec/Downloads'
        }]
    });
};
