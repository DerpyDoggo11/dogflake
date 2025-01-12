import Wp from "gi://AstalWp"
import { bind, Gio, GLib } from "astal";
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

const nameSubstitute = (name: string) => {
	if (!name) return '' // Fix undefined bug?
	
	if (name.includes('Family 17h/19h HD Audio Controller')) {
		return String(name.split(' ').slice(5, 6));
	} else if (name.includes('Rembrandt Radeon High Definition Audio Controller')) {
		return "Monitor Output"; // Laptop connected to monitor w/ speaker
	};
	
	return name;
};

export const SinkSelector = () =>
	bind(audio, 'speakers').as((speakers) => {
		const menu = new Gio.Menu();

		speakers.forEach((speaker) => {
			const radioItem = new Gio.MenuItem();
			radioItem.set_label(nameSubstitute(speaker.description));
			radioItem.set_action_and_target_value('speakers.radio', GLib.Variant.new_string(speaker.description));
			menu.append_item(radioItem);
		})
		
		const actionGroup = new Gio.SimpleActionGroup();
	
		const radioAction = Gio.SimpleAction.new_stateful('radio', new GLib.VariantType("s"), GLib.Variant.new_string("first"))
		radioAction.activate(GLib.Variant.new_string(String(audio.get_default_speaker()?.description)))
		radioAction.connect("notify::state", (action: Gio.Action) => {
			let selSpeaker = action.get_state()?.unpack();
			speakers.forEach((speaker) =>
				(selSpeaker == speaker.description) && speaker.set_is_default(true)
			)
		});

		//bind(speaker, 'description').as((s) => (s) && radioAction.set_state(GLib.Variant.new_string(s)))

		actionGroup.add_action(radioAction)
	
		const button = <menubutton 
			menu_model={menu}
			label="Select Audio Output"
			cursor={Gdk.Cursor.new_from_name('pointer', null)}
		/>
		button.insert_action_group('speakers', actionGroup)
		return button;
	});
