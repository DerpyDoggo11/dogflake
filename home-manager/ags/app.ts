import style from './style.css';
import lancherStyle from './widgets/launcher/launcher.css';
import clipboardStyle from './widgets/clipboard/clipboard.css';
import barStyle from './widgets/bar/bar.css';
import notificationStyle from './widgets/notifications/notifications.css';
import osdStyle from './widgets/osd/osd.css';
import quicksettingsStyle from './widgets/quicksettings/quicksettings.css';
import powermenuStyle from './widgets/powermenu/powermenu.css';

import { App, Gtk } from 'astal/gtk4';
import { exec } from 'astal';
import { Bar } from './widgets/bar/bar';
import { cornerTop, cornerBottom } from './widgets/corners';
import { calendar } from './widgets/calendar';
import clipboard from './widgets/clipboard/clipboard';
import { emojiPicker } from './widgets/emojipicker';
import { notifications, clearOldestNotification } from './widgets/notifications/notifications';
import { launcher } from './widgets/launcher/launcher';
import { notifySend } from './services/notifySend';
import { toggleRec } from './services/screenrec';
import { quickSettings } from './widgets/quicksettings/quicksettings';
import { osd } from './widgets/osd/osd';
import { powermenu } from './widgets/powermenu/powermenu';
import Hyprland from 'gi://AstalHyprland?version=0.1';
const hypr = Hyprland.get_default();

import { monitorBrightness } from './services/brightness';
import { initMedia, updTrack, playPause, chngPlaylist } from './services/mediaplayer';

const widgetMap: Map<number, Gtk.Widget[]> = new Map();

// Per-monitor widgets
const widgets = (monitor: number) => [
    Bar(monitor),
    cornerTop(monitor),
    cornerBottom(monitor)
];

App.start({
    css: style + lancherStyle + clipboardStyle + barStyle + notificationStyle + osdStyle + quicksettingsStyle + powermenuStyle,
    main() {
        hypr.get_monitors().map((monitor) => widgetMap.set(monitor.id, widgets(monitor.id)));

        setTimeout(() => {
            notifications();
            launcher();
            calendar();
            clipboard();
            quickSettings();
            osd();
            powermenu();
            emojiPicker();
            reminders();
            initMedia();
        }, 500); // Delay to fix widgets on slow devices

        monitorBrightness(); // Start brightness monitor for OSD subscribbable

        // Monitor reactivity
        hypr.connect('monitor-added', (_, monitor) =>
            widgetMap.set(monitor.id, widgets(monitor.id))
        );
        hypr.connect('monitor-removed', (_, monitorID) => {
            widgetMap.get(monitorID)?.forEach((w) => w.disconnect);
            widgetMap.delete(monitorID);
        });
    },
    requestHandler(req, res) {
        const reqArgs = req.split(" ");
        switch(reqArgs[0]) {
            case "hideNotif":
                clearOldestNotification();
                break;
            case "record":
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
    const day = String(exec(`fish -c "echo (date '+%A')"`));
    const folderSize = Number(exec(`fish -c "du -sb /home/alec/Downloads | awk '{print \$1}'"`));
    
    if (day == 'Friday') { // Send sync message
        notifySend({
            appName: 'Sync',
            title: 'Sync system files',
            iconName: 'emblem-synchronizing-symbolic',
            actions: [{
                id: 1,
                label: 'Update & Sync',
                command: 'foot -e fish -c sys-sync'
            }]
        });
    } else if (folderSize > 100000000) { // Greater than 100MB
        notifySend({
            appName: 'System Cleanup',
            title: 'Clean Downloads folder',
            iconName: 'system-file-manager-symbolic',
            actions: [{
                id: 1,
                label: 'View folder',
                command: 'nemo /home/alec/Downloads'
            }]
        });
    };
};
