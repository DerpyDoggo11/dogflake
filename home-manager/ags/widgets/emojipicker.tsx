import { App, Astal, Gtk } from 'astal/gtk4';

export const emojiPicker = () =>
  <window
    name="emojiPicker"
    keymode={Astal.Keymode.ON_DEMAND} 
    application={App}
    visible={false}
  >
    <Gtk.FlowBox hexpand min_children_per_line={10} max_children_per_line={10}>
    </Gtk.FlowBox>
  </window>
// TODO finish me