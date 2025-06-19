import { App, Astal, Gtk } from 'astal/gtk4';
import { execAsync } from 'astal';
const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;


const hide = () => App.get_window('emojiPicker')?.hide();

export default () =>
  <window
    name="emojiPicker"
    keymode={Astal.Keymode.ON_DEMAND}
    anchor={TOP | BOTTOM | LEFT | RIGHT}
    application={App}
    visible={false}
  >
    <entry
      enableEmojiCompletion
      showEmojiIcon
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      setup={(self) => {
        App.connect('window-toggled', () => {
          if (App.get_window('emojiPicker')?.visible == true) {
            self.grab_focus();
            self.text = '';
          };
        });
      }}

      onNotifyText={async (self) => {
        if (self.text != '' && !self.text.match(/[:a-z]/)) {
          hide();
          await execAsync('wl-copy ' + self.text);
        };
      }}

      // On escape key pressed
      onKeyPressed={(_, key) => (key == 65307) && hide()}
    />
  </window>