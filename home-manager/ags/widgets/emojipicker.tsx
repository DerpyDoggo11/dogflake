import { App, Astal } from 'astal/gtk3';
import { FlowBox } from "../astalify/flowbox";

export const emojiPicker = () =>
  <window
    name="emojiPicker"
    keymode={Astal.Keymode.ON_DEMAND} 
    application={App}
    visible={false}
  >
    <FlowBox hexpand min_children_per_line={10} max_children_per_line={10}>
    </FlowBox>
  </window>
// TODO finish me