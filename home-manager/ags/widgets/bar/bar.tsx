import { App, Astal } from 'astal/gtk4';
import { Time } from './modules/time';
import { Workspaces } from './modules/workspaces';
import { Status } from './modules/statusmenu';
import { Mpris } from './modules/mpris';
import { Media } from './modules/media';
import { RecordingIndicator } from '../../services/screen';

export const Bar = (monitor = 0) =>
  <window
    name="bar"
    monitor={monitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.BOTTOM}
    application={App}
    visible={true}
  >
    <box vertical>
      <Workspaces/>

      <box vexpand/>

      <Media/>
      <Mpris/>

      <box vexpand/>

      <RecordingIndicator/>
      <Time/>
      <Status/>
    </box>
  </window>
