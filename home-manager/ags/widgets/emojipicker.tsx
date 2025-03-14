import { App, Astal, Gtk } from 'astal/gtk4';
import { execAsync } from 'astal';

const hide = () => App.get_window('emojiPicker')?.hide();

export const emojiPicker = () =>
  <window
    name="emojiPicker"
    keymode={Astal.Keymode.ON_DEMAND}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
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