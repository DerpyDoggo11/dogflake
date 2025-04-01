import Wp from 'gi://AstalWp';
import { bind, Gio, GLib } from 'astal';
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
	if (!name) return '';
	
	if (name.includes('HD Audio Controller')) {
		return String(name.split(' ').pop()); // Returns 'Speaker' or 'Headphones'
	} else if (name.includes('Rembrandt Radeon High Definition Audio Controller')) {
		return "Monitor Output"; // Monitor has a speaker
	} else if (name == 'K38') {
		return 'Bluetooth Speaker';
	};
	
	return name;
};

export const SinkSelector = () =>
	<box>{bind(audio, 'speakers').as((speakers) => {
		const menu = new Gio.Menu();

		speakers.forEach((speaker) => {
			const radioItem = new Gio.MenuItem();
			radioItem.set_label(nameSubstitute(speaker.description));
			radioItem.set_action_and_target_value('speakers.radio', GLib.Variant.new_string(speaker.description));
			menu.append_item(radioItem);
		})

		const radioAction = Gio.SimpleAction.new_stateful('radio', new GLib.VariantType('s'), GLib.Variant.new_string('speakers'))
		radioAction.activate(GLib.Variant.new_string(String(audio.get_default_speaker()?.description)))
		radioAction.connect("notify::state", (action: Gio.Action) => {
			let selSpeaker = action.get_state()?.unpack();
			speakers.forEach((speaker) =>
				(selSpeaker == speaker.description) && speaker.set_is_default(true)
			)
		});

		speaker.connect('notify', (source) => 
			(source.description) && (source.isDefault) && radioAction.set_state(GLib.Variant.new_string(source.description)
		));
		const actionGroup = new Gio.SimpleActionGroup();
		actionGroup.add_action(radioAction);
	
		const button = <menubutton 
			menuModel={menu}
			label="Select Audio Output"
			cursor={Gdk.Cursor.new_from_name('pointer', null)}
			hexpand
		/>;
		button.insert_action_group('speakers', actionGroup);
		return button;
	})}</box>
