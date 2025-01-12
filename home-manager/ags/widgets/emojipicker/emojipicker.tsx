import { App, Astal, astalify, Gtk } from 'astal/gtk4';
import { execAsync } from 'astal';

let textbox: Gtk.Entry;
const hide = () => App.get_window("emojiPicker")?.hide();

export const emojiPicker = () =>
  <window
    name="emojiPicker"
    keymode={Astal.Keymode.ON_DEMAND} 
    application={App}
    visible={false}
  >
    <entry
      text=' '
      enableEmojiCompletion={true}
      setup={(self) => {
        textbox = self;
        self.connect('activate', async () => {
          hide();
          await execAsync('wl-copy ' + self.text);
        });

        App.connect("window-toggled", () => {
          if (App.get_window("emojiPicker")?.visible == true) {
            self.grab_focus();
            textbox.text = '';
          };
        });
      }}
      onKeyPressed={(_, key) =>
        (key == 65307) // Gdk.KEY_Escape
           && hide()
      }
    />
  </window>