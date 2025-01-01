import Wp from "gi://AstalWp"
import { Gtk, Widget } from "astal/gtk3";
import { bind } from "astal";
const speaker = Wp.get_default()?.audio.defaultSpeaker!;

export const VolumeSlider = () =>
    <box>
        <icon icon={bind(speaker, "volumeIcon")}/>
        <slider
            hexpand
            onDragged={({ value }) => {
                speaker.volume = value;
                speaker.mute = false;
            }}
            value={bind(speaker, "volume")}
        />
    </box>

export const SinkSelector = () => {
	const audio = Wp.get_default()?.audio!;

	const SinkItem = (stream: Wp.Endpoint) => {
		return new Widget.Box({
			hexpand: true,
			className: "popup-menu__item mixer__item",
			spacing: 16,
			children: [
				new Widget.Icon({
					className: "mixer__tooltip",
					tooltipText: bind(stream, "name").as((name) => name || ""),
					pixelSize: 32,
					icon: bind(stream, "icon").as(
						(icon) => icon || "TODO ADD SOUND ICON HERE",
					),
				}),
				new Widget.Box({
					vertical: true,
					children: [
						new Widget.Label({
							xalign: 0,
							truncate: true,
							label: bind(stream, "name").as(
								(name) => name || "",
							),
						}),
						new Widget.Slider({
							className: "mixer__slider",
							hexpand: true,
							drawValue: false,
							value: bind(stream, "volume"),
							onDragged: ({ value }) => (stream.volume = value),
						}),
					],
				}),
				new Widget.Label({
					className: "mixer__value",
					// xalign: 0.5,
					label: bind(stream, "volume").as(
						(v) => `${Math.floor(v * 100)}%`,
					),
					// label: stream
					// 	.bind("volume")
					// 	.transform((v) => `${Math.floor(v * 100)}%`),
				}),
			],
		});
	};

	const Placeholder = () => (
		<box
			name="placeholder"
			className="mixer-placeholder"
			spacing={16}
			vexpand
			valign={Gtk.Align.CENTER}
			halign={Gtk.Align.CENTER}
		>
			<label label="No audio streams available" />
		</box>
	);

	return (
		<box>
			{bind(audio, "streams").as((streams) => (
				<stack
					transitionType={Gtk.StackTransitionType.CROSSFADE}
					transitionDuration={500}
					shown={streams.length > 0 ? "streams" : "placeholder"}
				>
					<box vertical name={"streams"}>
						{streams.map(SinkItem)}
					</box>
					<Placeholder />
				</stack>
			))}
		</box>
	);
};
// TODO add osd here