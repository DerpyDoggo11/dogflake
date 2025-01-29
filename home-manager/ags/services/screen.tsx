
import { AstalIO, exec, execAsync, GLib, subprocess, interval, bind, Variable } from 'astal';
import { Gtk } from 'astal/gtk4';
import { notifySend } from '../lib/notifySend';
import Hyprland from 'gi://AstalHyprland?version=0.1';

const hypr = Hyprland.get_default();
const captureDir = '/home/alec/Videos/Captures';
const screenshotDir = '/home/alec/Pictures/Screenshots';

const now = () => GLib.DateTime.new_now_local().format('%Y-%m-%d_%H-%M-%S');

const isRec: Variable<boolean> = new Variable(false);
const recTimer: Variable<number> = new Variable(0);

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


export const toggleRec = () => (isRec.get()) ? stopRec() : startRec();

const startRec = () => {
	// Disable blue light shader
	exec("hyprctl keyword decoration:screen_shader ''"); 

	file = `${captureDir}/${now()}.mp4`; // Start recording
	const audioOutput = exec("bash -c 'wpctl inspect @DEFAULT_AUDIO_SINK@ | grep node.name'")

	rec = AstalIO.Process.subprocess(`
		wl-screenrec --audio --audio-device=${audioOutput.split('"')[1]}.monitor -o ${hypr.focusedMonitor.name} -f ${file}
	`);

	recTimer.set(0);
	isRec.set(true);
	iterable = interval(1000, () => recTimer.set(recTimer.get() + 1));
};

const stopRec = () => {
	rec?.signal(15); // Request wl-screenrec to finish gracefully
	rec = null;
	if (iterable) iterable.cancel();
	isRec.set(false);

	notifySend({
		appName: 'Screenrec',
		title: 'Screen Recording Saved',
		iconName: 'emblem-videos-symbolic',
		actions: [
			{
				id: 1,
				label: 'Open Captures folder',
				command: 'nemo ' + captureDir,
			},
			{
				id: 2,
				label: 'View',
				command: 'xdg-open ' + file
			}
		]
	});

	// Re-enable blue light shader
	exec("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl");
};

export const screenshot = (fullscreen: boolean) => {
	const file = `${screenshotDir}/${now()}.png`;

	// Disable blue light shader
	exec("hyprctl keyword decoration:screen_shader ''"); 

	const regionType = (fullscreen) ? 'screen' : 'area';

	subprocess(
		`bash -c 'grimblast --freeze copysave ${regionType} ${file}'`, // Run copy command
		(file) => {
			execAsync("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl");
			notifySend({
				appName: 'Screenshot',
				title: 'Screenshot Saved',
				iconName: 'image-x-generic-symbolic',
				image: file,
				actions: [
					{
						id: 1,
						label: 'Open Screenshots folder',
						command: 'nemo ' + screenshotDir
					},
					{
						id: 2,
						label: 'Edit',
						command: 'swappy -f ' + file
					}
				]
			});
		},
		// Selection was cancelled
		() => execAsync("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl")
	);
};
