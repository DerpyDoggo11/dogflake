import Wp from "gi://AstalWp"
import { Gtk } from "astal/gtk3";
import { bind } from "astal";
import { ComboBox } from "../astalify/combobox";
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

	const SinkItem = (stream: Wp.Device) => 
		<label name={stream.description} label={stream.description}/>

	return <box>
		{bind(audio, "devices").as((devices) => (
			<ComboBox
				hexpand
			>
				{//devices.map(SinkItem)}
				}
			</ComboBox>
		))}
	</box>
};
