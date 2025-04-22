import { App, Astal } from 'astal/gtk4';
import Notifd from 'gi://AstalNotifd';
import { notificationItem } from './notificationitem';
import { Variable, bind } from 'astal';
const { TOP, RIGHT } = Astal.WindowAnchor;
export const DND = Variable(false);

const map: Map<number, Notifd.Notification> = new Map();
const notificationlist: Variable<Array<Notifd.Notification>> = new Variable([]);

const notifiy = () =>
	notificationlist.set([...map.values()].reverse());

const setKey = (key: number, value: Notifd.Notification) => {
	if (!DND.get()) {
		map.set(key, value);
		notifiy();
	}
};

const deleteKey = (key: number) => {
	map.delete(key);
	notifiy();
};

export const notifications = () =>
	<window
		name="notifications"
		anchor={TOP | RIGHT}
		application={App}

		// This prop gives broken accounting warning but fixes allocation size
		visible={bind(notificationlist).as(n => (n.length != 0) ? true : false)}
		setup={() => {
			const notifd = Notifd.get_default();
			notifd.connect("notified", (_, id) => {
				const notif = notifd.get_notification(id);
				(!notif.body.startsWith('Failed to connect to server')) // Hide annoying thunderbird message
				&& setKey(id, notif)
			});
			notifd.connect("resolved", (_, id) =>
				deleteKey(id)
			);
		}}
	>
		<box vertical>
			{bind(notificationlist).as((n) => n.map(notificationItem))}
		</box>
	</window>

export const clearOldestNotification = () =>
	deleteKey([...map][0][0]);
