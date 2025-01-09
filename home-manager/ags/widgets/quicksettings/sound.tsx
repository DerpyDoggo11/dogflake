import Wp from "gi://AstalWp"
import { bind, Variable } from "astal";
import { Gdk } from 'astal/gtk4'; 
const speaker = Wp.get_default()?.audio.defaultSpeaker!;
const audio = Wp.get_default()?.audio!;

export const VolumeSlider = () =>
    <box>
        <image iconName={bind(speaker, "volumeIcon")}/>
        <slider
            hexpand
            onChangeValue={({ value }) => {
                speaker.volume = value;
                speaker.mute = false;
            }}
            value={bind(speaker, "volume")}
        />
    </box>

const sinkVisible = new Variable(false);

const nameSubstitute = (name: string) => {
	switch (name) {
		case "Family 17h/19h HD Audio Controller Analog Stereo":
			return "Default Output";
		case "Rembrandt Radeon High Definition Audio Controller Digital Stereo (HDMI)":
			return "Monitor Output";
		default:
			return name;
	};
};

const SinkItem = (stream: Wp.Endpoint) =>
	<button
		onButtonPressed={() => stream.isDefault = true}
		visible={bind(stream, "isDefault").as((def) => (!def))}
		cursor={Gdk.Cursor.new_from_name('pointer', null)}
	>
		<label label={nameSubstitute(stream.description)}/>
	</button>

export const SinkSelector = () =>
	<box cssClasses={["sinkSelector"]} vertical>
		<button
			cssClasses={["mainSink"]}
			onButtonPressed={() => sinkVisible.set(!sinkVisible.get())}
			cursor={Gdk.Cursor.new_from_name('pointer', null)}
		>
			<label label={bind(speaker, "description").as(d => nameSubstitute(d) || '')}/>
		</button>
		<revealer
			revealChild={bind(sinkVisible)}
		>
			<box vertical>
				{bind(audio, 'speakers').as((s) => s.map(SinkItem))}
			</box>
		</revealer>
	</box>
