import { App, Astal } from 'astal/gtk3';
import { FlowBox } from "../astalify/flowbox";

export const emojiPicker = () =>
    <window
      name="emojiPicker"
      className="emojiPicker"
      exclusivity={Astal.Exclusivity.EXCLUSIVE} // TODO check if needs to change to IGNORE
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM}
      keymode={Astal.Keymode.ON_DEMAND} 
      application={App}
    >
      <FlowBox hexpand min_children_per_line={10} max_children_per_line={10}>
      </FlowBox>
    </window>
