import { App } from 'astal/gtk3';
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

App.start({
    instanceName: "desktop-widgets",
    css: style,
    main() {
        App.get_monitors().map(bar)
        App.get_monitors().map(corners);
        App.get_monitors().map(calendar);
        App.get_monitors().map(notifications);
        //App.get_monitors().map(emojiPicker);
        App.get_monitors().map(launcher);
        reminders();

        // Reconnect/disconnect widgets automatically
        App.connect('monitor-added', (_, monitor) => bar(monitor))
        App.connect('monitor-removed', (_, monitor) => bar(monitor))
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
