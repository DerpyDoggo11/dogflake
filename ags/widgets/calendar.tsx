import { App, Astal, Gtk } from 'astal/gtk4';
const { BOTTOM, LEFT } = Astal.WindowAnchor;

export default () =>
  <window
    name="calendar"
    anchor={BOTTOM | LEFT}
    application={App}
    visible={false}
  >
    <Gtk.Calendar/>
  </window>
