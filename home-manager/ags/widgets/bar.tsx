import { App, Astal, Gdk } from 'astal/gtk3';
import { Time } from './modules/time';
import { Workspaces } from './modules/workspaces'
import { Status } from './modules/statusmenu'
import { Media } from './modules/media'

export default function bar(gdkmonitor: Gdk.Monitor) {
    return (
    <window
      className="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
      application={App}
    >
      <box vertical hexpand>
        <box className="container">
          <Workspaces/>
        </box>


        <box vertical vexpand hexpand/>

        <box className="Container">
          {/* @ts-ignore - TODO fix this lsp warning */}
          <Media/>
        </box>

        <box vertical vexpand hexpand/>

        <box className="Container">
          <Time/>
        </box>

        <box className="Container">
          <Status/>
        </box>
      </box>
    </window>
  );
}
