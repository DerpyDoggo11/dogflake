import Wp from "gi://AstalWp"
import { bind, Variable } from "astal";
const speaker = Wp.get_default()?.audio.defaultSpeaker!;
const audio = Wp.get_default()?.audio!;

export const VolumeSlider = () =>
    <box>
        <image iconName={bind(speaker, "volumeIcon")}/>
        <slider
            hexpand
            onDragged={({ value }) => {
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
		onClick={() => stream.isDefault = true}
		visible={bind(stream, "isDefault").as((def) => (!def))}
	>
		<label label={nameSubstitute(stream.description)}/>
	</button>

export const SinkSelector = () =>
	<box cssClasses={["sinkSelector"]} vertical>
		<button
			cssClasses={["mainSink"]}
			onClick={() => sinkVisible.set(!sinkVisible.get())}
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
