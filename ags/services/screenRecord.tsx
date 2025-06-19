
import { AstalIO, exec, execAsync, GLib, interval, bind, Variable } from 'astal';
import { Gtk } from 'astal/gtk4';
import { notifySend } from './notifySend';
import Hyprland from 'gi://AstalHyprland?version=0.1';

const hypr = Hyprland.get_default();
const captureDir = '/home/alec/Videos/Captures';

const now = () => GLib.DateTime.new_now_local().format('%Y-%m-%d_%H-%M-%S');

export const isRec: Variable<boolean> = new Variable(false);
const recTimer: Variable<number> = new Variable(0);

export const recMic: Variable<boolean> = new Variable(false);
export const recQuality: Variable<string> = new Variable('ultra')

let rec: AstalIO.Process | null = null;
let iterable: AstalIO.Time | null = null;
let file: string;

export const RecordingIndicator = () =>
	<box
		hexpand
		visible={bind(isRec).as(Boolean)}
		halign={Gtk.Align.CENTER}
		cssClasses={['recIndicator']}
	>
		<image iconName="media-record-symbolic"/>
		<label label={bind(recTimer).as((t) => t + "s")}/>
	</box>

export const startRec = () => {
	execAsync("killall -SIGINT gpu-screen-recorder").catch(() => { return; }) // Stops screen clipping, otherwise exits

	exec("hyprctl keyword decoration:screen_shader ''"); // Disable blue light shader

	file = `${captureDir}/${now()}.mp4`;
	const monitor = hypr.get_focused_monitor().name;
	const audio = (recMic.get() == true) ? "default_output|default_input" : "default_output";

	rec = AstalIO.Process.subprocess(`gpu-screen-recorder -a ${audio} -q ${recQuality.get()} -w ${monitor} -o ${file}`);

	recTimer.set(0);
	isRec.set(true);
	iterable = interval(1000, () => recTimer.set(recTimer.get() + 1));
};

export const stopRec = () => {
	rec?.signal(2); // Send SIGINT to stop recording
	rec = null;
	iterable?.cancel();
	isRec.set(false);

	notifySend({
		appName: 'Screen Recording',
		title: 'Screen recording saved',
		iconName: 'emblem-videos-symbolic',
		actions: [
			{
				id: 1,
				label: 'Open Captures',
				command: 'nemo ' + captureDir,
			},
			{
				id: 2,
				label: 'View',
				command: 'xdg-open ' + file
			}
		]
	});

	// Copy video to clipboard
	execAsync(`bash -c "echo -n file:/${file} | wl-copy -t text/uri-list"`);

	// Re-enable blue light shader
	exec('hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl');

	// Restart screen clipping
	const monitor = hypr.get_focused_monitor().name;
	execAsync(`gpu-screen-recorder -w ${monitor} -f 30 -r 30 -c mp4 -o /home/alec/Videos/Clips/`)
};
