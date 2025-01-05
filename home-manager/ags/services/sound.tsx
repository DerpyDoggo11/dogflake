import Wp from "gi://AstalWp"
import { bind, Variable, exec } from "astal";
const speaker = Wp.get_default()?.audio.defaultSpeaker!;
const audio = Wp.get_default()?.audio!;

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

const sinkVisible = new Variable(false);

const SinkItem = (stream: Wp.Endpoint) => 
	<button
		onClick={() => exec(`wpctl set-default ${stream.id}`)}
	>
		<label label={stream.description}/>
	</button>

export const SinkSelector = () => 
	<box vertical>
		<button onClick={() => sinkVisible.set(!sinkVisible.get())}>
			<label label={bind(speaker, "description")}/> 
		</button>
		<revealer
			revealChild={bind(sinkVisible)}
		>
			<box vertical>
				{bind(audio, "speakers").as((devices) => devices.map(SinkItem))}
			</box>
		</revealer>
	</box>
