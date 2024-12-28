import { App, Astal, Gdk } from 'astal/gtk3';
import { Calendar } from '../astalify/calendar';

export const calendar = (gdkmonitor: Gdk.Monitor) =>
  <window
    name="calendar"
    gdkmonitor={gdkmonitor}
    anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
    application={App}
    visible={false} // Not visible by default
  >
    <Calendar/>
  </window>
