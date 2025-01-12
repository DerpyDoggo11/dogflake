import { App, Astal, astalify, Gtk } from 'astal/gtk4';
import { execAsync } from 'astal';

let textbox: Gtk.Text;
const hide = () => { 
  textbox.text = '';
  App.get_window("emojiPicker")?.hide(); 
}

const Text = astalify<Gtk.Text, Gtk.Text.ConstructorProps>(Gtk.Text)

export const emojiPicker = () =>
  <window
    name="emojiPicker"
    keymode={Astal.Keymode.ON_DEMAND} 
    application={App}
    visible={false}
  >
    <Text
      enableEmojiCompletion={true}
      text=' '
      setup={(self) => {
        textbox = self
        self.connect('activate', async () => 
          await execAsync('wl-copy ' + textbox.text) && hide())
        self.connect('delete-from-cursor', (self) => console.log(self))

        App.connect("window-toggled", () =>
          (App.get_window("emojiPicker")?.visible == true)
              && self.grab_focus() && self.emit('insert-at-cursor', ':')
        );
      }}
      onKeyPressed={(_, key) =>
        (key == 65307) // Gdk.KEY_Escape
           && hide()
      }
    />
  </window>