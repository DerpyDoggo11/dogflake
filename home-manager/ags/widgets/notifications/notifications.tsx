import { App, Astal, Gdk } from 'astal/gtk4';
import Notifd from 'gi://AstalNotifd';
import { notificationItem } from './notificationitem';
import { type Subscribable } from 'astal/binding';
import { Variable, bind } from 'astal';
const { TOP, RIGHT } = Astal.WindowAnchor;
export const DND = Variable(false);

export class NotifiationMap implements Subscribable {
    private map: Map<number, Notifd.Notification> = new Map();
    private var: Variable<Array<Notifd.Notification>> = new Variable([]);

    private notifiy = () =>
        (!DND.get()) &&
            this.var.set([...this.map.values()].reverse());
    
    constructor() {
        const notifd = Notifd.get_default();

        notifd.connect("notified", (_, id) =>
            this.set(id, notifd.get_notification(id)!)
        );

        notifd.connect("resolved", (_, id) =>
            this.delete(id)
        );
    };

    private set(key: number, value: Notifd.Notification) {
        this.map.set(key, value);
        this.notifiy();
    };

    private delete(key: number) {
        let isDND;
        if (DND.get()) {
            isDND = true
            DND.set(false)
        }

        this.map.delete(key);
        this.notifiy();

        (isDND) &&
            DND.set(true);
    };

    public clearNewestNotification = () =>
        this.delete([...this.map][0][0]);
    
    get = () => this.var.get();
    
    subscribe = (callback: (list: Array<Notifd.Notification>) => void) => 
        this.var.subscribe(callback);
};

export const Notifications = (gdkmonitor: Gdk.Monitor, allNotifications: Subscribable<Array<Notifd.Notification>>) =>
    <window
        name="notifications"
        gdkmonitor={gdkmonitor}
        anchor={TOP | RIGHT}
        application={App}
        visible={true}
    >
        <box vertical>
            {bind(allNotifications).as((n) => n.map(notificationItem))}
        </box>
    </window>
