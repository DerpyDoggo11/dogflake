import { App, Gdk } from 'astal/gtk3';
import { GLib, execAsync, exec } from 'astal';
import style from './style.css';
import { Bar } from './widgets/bar';
import { Corners } from './widgets/corners';
import { calendar } from './widgets/calendar';
import { emojiPicker } from './widgets/emojipicker';
import { Notifications, NotifiationMap } from './widgets/notifications/notifications';
import { launcher } from './widgets/launcher';
import { notifySend } from './lib/notifySend';
import { screenshot, screenRec } from './services/screen';
import { quickSettings } from './widgets/quicksettings';
import { OSD } from './widgets/osd';

const allNotifications = new NotifiationMap();

export const widgets = (monitor: Gdk.Monitor) => {
    Bar(monitor);
    Corners(monitor);
    Notifications(monitor, allNotifications);
    OSD(monitor);
    console.log("New monitor connected") // todo debug me?
};

App.start({
    css: style,
    main() {
        App.get_monitors().map(widgets);
        calendar();
        emojiPicker();
        launcher();
        quickSettings();
        reminders();

        // Reconnect widgets when new monitor added
        App.connect('monitor-added', (_, monitor) => widgets(monitor))
    },
    requestHandler(req, res) {
        const reqArgs = req.split(" ");
        switch(reqArgs[0]) {
            case "hideNotif":
                allNotifications.clearNewestNotification();
                break;
            case "screenshot":
                (reqArgs[1] == "true")
                ? screenshot(true)
                : screenshot(false)
                break;
            case "screenrec":
                screenRec.toggle();
                break;
        };
        res("Request handled successfully");
    }
});

const reminders = () => {
    const day = GLib.DateTime.new_now_local().format("%a")!;
    const folderSize = Number(exec(`bash -c "(du -sb /home/alec/Downloads | awk '{print $1}')"`));
    let bodyText: string;

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
                callback: () => execAsync('foot -e fish -c spotify-sync')
            }]
        });
    } else if (folderSize > 100000000) { // Greater than 100MB
        bodyText = "The Downloads folder is large! Clean up some unused files.";
    };

    (bodyText) &&
    notifySend({
        title: 'Clear Downloads folder',
        iconName: 'system-file-manager-symbolic',
        body: bodyText,
        actions: [
            {
                id: 1,
                label: 'View folder',
                callback: () => execAsync('nemo /home/alec/Downloads')
            }
        ]
    });
};
