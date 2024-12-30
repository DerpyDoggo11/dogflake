import { App, Gdk } from 'astal/gtk3';
import { execAsync } from 'astal';
import style from './style.css';
import bar from './widgets/bar';
import corners from './widgets/corners';
import { calendar } from './widgets/calendar';
import { emojiPicker } from './widgets/emojipicker';
import { notifications, clearNewestNotification } from './widgets/notifications/notifications';
import { launcher } from './widgets/launcher';
import { notifySend } from './lib/notifySend';
import { screenshot, record } from './services/screen';
import { quickSettings } from './widgets/quicksettings';

export const widgets = (monitor: Gdk.Monitor) => {
    bar(monitor);
    corners(monitor);
    notifications(monitor);
}


App.start({
    css: style,
    main() {
        App.get_monitors().map(widgets);

        reminders();
        calendar();
        //emojiPicker();
        launcher();
        quickSettings();

        // Reconnect widgets when new monitor added
        App.connect('monitor-added', (_, monitor) => widgets(monitor))
    },
    requestHandler(req, res) {
        const reqArgs = req.split(" ");
        switch(reqArgs[0]) {

            case "hideNotif":
                clearNewestNotification();
                break;
            case "screenshot":
                (reqArgs[1] == "true")
                ? screenshot(true)
                : screenshot(false)
            case "record":
                (reqArgs[1] == "true")
                ? record(true)
                : record(false)
        };
        res("Success");
    }
});

const reminders = () => { // todo finish me
    //let bodyText = "Clean up some unused files to keep the system clean";
    let bodyText = "The Downloads folder is large! Clean up some unused files.";
    notifySend({
        title: 'Clear Downloads folder',
        body: bodyText,
        actions: [
            {
                id: '1',
                label: 'View folder',
                callback: () => execAsync('nemo /home/alec/Downloads')
            }
        ]
    });
/*
if it's a monday and there's more than five files in Downloads folder
    Utils.notify({summary: "Clear Downloads folder", body: "Clean up some unused files to keep the system clean", actions: { "View folder": () => Utils.execAsync("nemo Downloads/")
else if its a Friday
    Utils.notify({summary: "Sync Spotify playlists", body: "Sync all Spotify playlists to have the latest music", actions: { "Open Terminal": () => Utils.execAsync("foot -e fish -c spotify-sync")
else if download directory is over 1gb
    Utils.notify({summary: "Clear Downloads folder", body: "The Downloads folder is large! Clean up some unused files.", actions: { "View folder": () => Utils.execAsync("nemo Downloads/")
*/
};
