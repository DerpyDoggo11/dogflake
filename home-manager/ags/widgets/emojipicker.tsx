import { App, Astal, Gdk } from 'astal/gtk3';
import { FlowBox } from "../astalify/flowbox";

export const emojiPicker = (gdkmonitor: Gdk.Monitor) =>
    <window
      name="emojiPicker"
      className="emojiPicker"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM}
      application={App}
    >
      <FlowBox hexpand min_children_per_line={10} max_children_per_line={10}>
      </FlowBox>
    </window>
