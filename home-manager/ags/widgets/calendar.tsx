import { App, Astal, Gtk } from 'astal/gtk4';
const { BOTTOM, LEFT } = Astal.WindowAnchor;

export const calendar = () =>
  <window
    name="calendar"
    anchor={BOTTOM | LEFT}
    application={App}
    visible={false}
  >
    <Gtk.Calendar/>
  </window>
