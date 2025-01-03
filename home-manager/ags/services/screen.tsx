
import GObject from 'astal/gobject';
import { AstalIO, exec, execAsync, GLib, subprocess, interval, bind } from 'astal';
import { Gtk } from 'astal/gtk3'
import { notifySend } from '../lib/notifySend';
import hypr from 'gi://AstalHyprland?version=0.1';

const Hypr = hypr.get_default();
const captureDir = '/home/alec/Videos/Captures';
const screenshotDir = '/home/alec/Pictures/Screenshots';

const now = () => GLib.DateTime.new_now_local().format('%Y-%m-%d_%H-%M-%S');

export const RecordingIndicator = () =>
	<box
		hexpand
		visible={bind(screenRec, "recording").as(Boolean)}
		halign={Gtk.Align.CENTER}
		className="recIndicator"
	>
		<icon icon="media-record-symbolic"/>
		<label label={bind(screenRec, "timer").as((t) => t + "s")}/>
	</box>


const ScreenRec = GObject.registerClass({
	Properties: {
		timer: GObject.ParamSpec.int64(
			"timer",
			"Timer",
			"Recording timer",
			GObject.ParamFlags.READABLE,
			Number.MIN_SAFE_INTEGER,
			Number.MAX_SAFE_INTEGER,
			0,
		),
		recording: GObject.ParamSpec.boolean(
			"recording",
			"Recording",
			"Is recording state",
			GObject.ParamFlags.READABLE,
			false,
	)}
},
class ScreenRec extends GObject.Object {
	#recorder: AstalIO.Process | null = null;
	#interval: AstalIO.Time | null = null;
	#file = "";
	#timer = 0;

	get recording() { return (this.#recorder != null); }
	get timer() { return this.#timer; }
	toggle = () => (this.recording) ? this.stop() : this.start();
	
	async start() {
		// Disable blue light shader
		exec("hyprctl keyword decoration:screen_shader ''"); 

		this.#file = `${captureDir}/${now()}.mp4`; // Start recording
		const audioOutput = exec("bash -c 'wpctl inspect @DEFAULT_AUDIO_SINK@ | grep node.name'")

		this.#recorder = AstalIO.Process.subprocess(`
			wl-screenrec --audio --audio-device=${audioOutput.split('"')[1]}.monitor -o ${Hypr.focusedMonitor.name} -f ${this.#file}
		`);
		this.notify("recording");

		this.#timer = 0;
		this.#interval = interval(1000, () => {
			this.notify("timer");
			this.#timer++;
		});
	};

	async stop() {
		this.#recorder.signal(15); // Request wl-screenrec to finish gracefully
		this.#recorder = null;
		this.notify("recording");

		if (this.#interval) this.#interval.cancel();
		this.#timer = 0;
		this.notify("timer");

		// Re-enable blue light shader
		exec("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl")
		
		notifySend({
			title: 'Screenrecord',
			iconName: 'emblem-videos-symbolic',
			body: this.#file,
			actions: [
				{
					id: 1,
					label: 'Open Captures folder',
					callback: () => execAsync('nemo ' + captureDir),
				},
				{
					id: 2,
					label: 'View',
					callback: () => execAsync('xdg-open ' + this.#file)
				}
			]
		});
	};
});

export const screenRec = new ScreenRec();

export const screenshot = async (fullscreen: boolean) => {
	const file = `${screenshotDir}/${now()}.png`;

	// Disable blue light shader
	exec("hyprctl keyword decoration:screen_shader ''"); 

	const regionType = (fullscreen) ? 'screen' : 'area';

	subprocess(
		`bash -c 'grimblast --freeze copysave ${regionType} ${file}'`, // Run copy command
		(file) => {
			exec("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl")
			notifySend({
				title: 'Screenshot Saved',
				iconName: 'image-x-generic-symbolic',
				actions: [
					{
						id: 1,
						label: 'Open Captures folder',
						callback: () => execAsync('nemo ' + screenshotDir)
					},
					{
						id: 2,
						label: 'Edit',
						callback: () => execAsync('swappy -f ' + file)
					}
				]
			});
		},
		() => { 
			console.log("Selection was cancelled") 
			exec("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl")
		}
	);
};
