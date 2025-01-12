import { App, Astal, astalify, Gtk } from 'astal/gtk4';
import { execAsync } from 'astal';

let textbox: Gtk.Entry;
const hide = () => { 
  textbox.text = '';
  App.get_window("emojiPicker")?.hide(); 
}


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
        textbox = self
        self.connect('activate', async () => 
          await execAsync('wl-copy ' + textbox.text) && hide())
        self.connect('icon-release', (self) => console.log(self))

        App.connect("window-toggled", () =>
          (App.get_window("emojiPicker")?.visible == true)
              && self.grab_focus() && self.emit('icon-release', 'e')
        );
      }}
      onKeyPressed={(_, key) =>
        (key == 65307) // Gdk.KEY_Escape
           && hide()
      }
    />
  </window>