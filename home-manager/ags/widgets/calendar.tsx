import { App, Astal, Gtk } from 'astal/gtk4';

export const calendar = () =>
  <window
    name="calendar"
    anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
    application={App}
    visible={false}
  >
    <Gtk.Calendar/>
  </window>
