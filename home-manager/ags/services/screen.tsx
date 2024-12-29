
import { exec, execAsync, GLib, Variable } from 'astal';
import { notifySend } from '../lib/notifySend';
import { interval } from 'astal';
const RecordingIndicator = () => <box/>; // todo do stuff here


const isRecording: Variable<Boolean> = new Variable(false);
const timer: Variable<number> = new Variable(0);

const file: Variable<String> = new Variable('');

const captureDir = "/home/alec/Videos/Captures";
const screenshotDir = "/home/alec/Pictures/Screenshots";

const now = () => GLib.DateTime.new_now_local().format('%Y-%m-%d_%H-%M-%S');

// TODO get default output of pactl -f json list short sources
// parse it as json and get the name with state RUNNING
//exec("pactl list short sources | grep 'RUNNING'").split("")[1]

export const record = async (fullscreen: boolean) => {
	if (isRecording.get() == false) {
		// Stop the recording
		exec('pkill wl-screenrec');
		isRecording.set(false);
		
		// Re-enable blue light shader
		exec("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl")

		notifySend({
			title: 'Screenrecord',
			iconName: 'emblem-videos-symbolic',
			body: String(file.get()),
			actions: [
				{
					id: '1',
					label: 'Open Captures folder',
					callback: () => exec('nemo ' + captureDir),
				},
				{
					id: '2',
					label: 'View',
					callback: () => exec('xdg-open ' + file)
				}
			]
		});
		return;
	};

	file.set(`captureDir/${now()}.mp4`); // Start recording

	// Disable blue light shader
	exec("hyprctl keyword decoration:screen_shader '' ''"); 

	// Select screen size
	let size = '';
	if (fullscreen) {
		size = await exec('slurp');
		if (!size) return;
	}

	// todo add audio support & mic support (optional)
	// todo show a screen to choose audio input and monitor selection
	(fullscreen)
	? exec(`wl-screenrec --audio --audio-device=alsa -o HDMI-A-1 -g "${size}" -f ${file.get()}`) // Custom size
	: exec(`wl-screenrec --audio --audio-device=alsa -o HDMI-A-1 -f ${file.get()}`) // Custom size
	
	isRecording.set(true);

	timer.set(0);
	interval(1000, () => {
		timer.set(timer.get() + 1);
	});
}


export const screenshot = async (fullscreen: boolean) => {
	const file = `${screenshotDir}/${now()}.png`;

	// Disable blue light shader
	exec("hyprctl keyword decoration:screen_shader '' ''"); 

	const regionType = (fullscreen) ? 'screen' : 'area'
	await execAsync(`grimblast --freeze copysave ${regionType} ${file}`)
		.then((msg) => {
			// Re-enable blue light shader
			execAsync("hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl")
			
			// msg is the absolute file path now - otherwise says "selection cancelled" if failed
			// If cancelled, do not continue
			if (msg.includes("selection cancelled")) {
				console.error("E")
				return;
			}
			console.log("Passed file test?");

			notifySend({
				title: 'Screenshot Saved',
				iconName: 'image-x-generic-symbolic',
				actions: [
					{
						id: '1',
						label: 'Open Captures folder',
						callback: () => exec('nemo ' + screenshotDir), // todo try msg
					},
					{
						id: '2',
						label: 'Edit',
						callback: () => exec('swappy -f ' + msg)
					}
				]
			});
		})
		.catch((e) => console.log(e)); // Suppress gjs warnings
	console.log('wait')
};
