import { App, Astal } from 'astal/gtk4';
import { Time } from './modules/time';
import { Workspaces } from './modules/workspaces';
import { Status } from './modules/statusmenu';
import { Mpris } from './modules/mpris';
import { Media } from '../../services/mediaplayer';
import { RecordingIndicator } from '../../services/screenrec';
const { TOP, BOTTOM, LEFT } = Astal.WindowAnchor;

export const Bar = (monitor: number) =>
  <window
    name="bar"
    monitor={monitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={TOP | BOTTOM | LEFT}
    application={App}
    visible
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
