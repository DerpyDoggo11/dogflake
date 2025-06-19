import { App, Astal } from 'astal/gtk4';
import { Time } from './modules/time';
import { Workspaces } from './modules/workspaces';
import { Status } from './modules/statusMenu';
import { Mpris } from './modules/mpris';
import { Media } from '../../services/mediaPlayer';
import { RecordingIndicator } from '../../services/screenRecord';
const { TOP, BOTTOM, LEFT } = Astal.WindowAnchor;

export default (monitor: number): Astal.Window =>
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
