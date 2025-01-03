import { App, Astal, Gtk, astalify } from 'astal/gtk3';

const Calendar = astalify(Gtk.Calendar)

export const calendar = () =>
  <window
    name="calendar"
    anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
    application={App}
    visible={false} // Not visible by default
  >
    <Calendar/>
  </window>
