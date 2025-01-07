import style from './style.css';
import { App, Gdk, Gtk } from 'astal/gtk4';
import { GLib, exec } from 'astal';
import { Bar } from './widgets/bar/bar';
//import { TopLeft, TopRight, BottomLeft, BottomRight } from './widgets/corners';
import { calendar } from './widgets/calendar';
import { emojiPicker } from './widgets/emojipicker';
import { Notifications, NotifiationMap } from './widgets/notifications/notifications';
import { launcher } from './widgets/launcher/launcher';
import { notifySend } from './lib/notifySend';
import { screenshot, screenRec } from './services/screen';
import { quickSettings } from './widgets/quicksettings/quicksettings';
import { OSD } from './widgets/osd/osd';
import { powermenu } from './widgets/powermenu/powermenu';

import { monitorBrightness } from './services/brightness';
import { initMedia, updTrack, playPause, chngPlaylist } from './services/mediaplayer';

const allNotifications = new NotifiationMap();
const widgetMap: Map<Gdk.Monitor, Gtk.Widget[]> = new Map();

// Per-monitor widgets
export const widgets = (monitor: Gdk.Monitor) => [
    //Bar(monitor),
    //TopLeft(monitor),
    //TopRight(monitor),
    //BottomLeft(monitor),
    //BottomRight(monitor),
    //Notifications(monitor, allNotifications)
];

App.start({
    css: style,
    main() {
        App.get_monitors().map((monitor) => widgetMap.set(monitor, widgets(monitor)));

        calendar();
        emojiPicker();
        launcher();
        //quickSettings();
        OSD();
        reminders();
        powermenu();
        monitorBrightness(); // Start brightness monitor for OSD subscribbable
        initMedia(); // Mpd player

        // Automatically disconnect & reconnect widgets on monitor change
        /*App.connect('monitor-added', (_, monitor) => widgetMap.set(monitor, widgets(monitor)));
        App.connect('monitor-removed', (_, monitor) => {
            widgetMap.get(monitor)?.forEach((w) => w.disconnect);
            widgetMap.delete(monitor);
        });*/
    },
    requestHandler(req, res) {
        const reqArgs = req.split(" ");
        switch(reqArgs[0]) {
            case "hideNotif":
                allNotifications.clearNewestNotification();
                break;
            case "screenshot":
                screenshot((reqArgs[1] == 'true'))
                break;
            case "screenrec":
                screenRec.toggle();
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
        title: 'Clear Downloads folder',
        iconName: 'system-file-manager-symbolic',
        body: bodyText,
        actions: [{
            id: 1,
            label: 'View folder',
            command: 'nemo /home/alec/Downloads'
        }]
    });
};
