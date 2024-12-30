import { App, Astal } from 'astal/gtk3';
import { Calendar } from '../astalify/calendar';

export const calendar = () =>
  <window
    name="calendar"
    anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
    application={App}
    visible={false} // Not visible by default
  >
    <Calendar/>
  </window>
