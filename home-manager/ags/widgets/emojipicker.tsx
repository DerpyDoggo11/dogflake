import { App, Astal, Gdk } from 'astal/gtk3';

export default function emojiPicker(gdkmonitor: Gdk.Monitor) {
    return (
    <window
      name="emojiPicker"
      className="emojiPicker"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM}
      application={App}
    >
        Emoji picker goes here
    </window>
  );
}
