import { App, Astal } from "astal/gtk3";
import { Time } from "./modules/time";
import { Workspaces } from "./modules/workspaces"
import { Status } from "./modules/statusmenu"

export default function bar(gdkmonitor: Gdk.Monitor) {
    return (
    <window
      className="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM
      }
      application={App}
    >
      <box vertical hexpand>
        {<box className="container">
          <Workspaces/>
        </box>}


        <box vertical vexpand hexpand />


        {/* <box className="Container">
          <Media />
        </box> */}

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
