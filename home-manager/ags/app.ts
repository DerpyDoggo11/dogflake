import { App } from 'astal/gtk3';
import style from './style.css';
import bar from './widgets/bar';
import corners from './widgets/corners';
import { calendar } from './widgets/calendar';
import EmojiPicker from './widgets/emojipicker';
import { Notifications, clearNewestNotification } from './widgets/notifications/notifications';

App.start({
    instanceName: "desktop-widgets",
    css: style,
    main() {
        App.get_monitors().map(bar)
        reminders();
        App.get_monitors().map(corners);
        App.get_monitors().map(calendar);
        Notifications(App.get_monitors()[1]); // For debugging only - find a permanent all-monitor solution
        //App.get_monitors().map(EmojiPicker);

        // Reconnect/disconnect widgets automatically
        App.connect('monitor-added', (_, monitor) => bar(monitor))
        App.connect('monitor-removed', (_, monitor) => bar(monitor))
    },
    requestHandler(req, res) {
        switch(req) {
            case "hideNotif":
                clearNewestNotification();
                break;
        };
        res("Success");
        // ags toggle <windowname>
    }
});

const reminders = () => {
/*
if it's a monday and there's more than five files in Downloads folder
    Utils.notify({summary: "Clear Downloads folder", body: "Clean up some unused files to keep the system clean", actions: { "View folder": () => Utils.execAsync("nemo Downloads/")
else if its a Friday
    Utils.notify({summary: "Sync Spotify playlists", body: "Sync all Spotify playlists to have the latest music", actions: { "Open Terminal": () => Utils.execAsync("foot -e fish -c spotify-sync")
else if download directory is over 1000MB
    Utils.notify({summary: "Clear Downloads folder", body: "The Downloads folder is large! Clean up some unused files.", actions: { "View folder": () => Utils.execAsync("nemo Downloads/")
*/
};
