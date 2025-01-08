import { Variable, GLib } from 'astal';
import { App, Gdk } from 'astal/gtk4';
const curr = GLib.DateTime.new_now_local();
const date = curr.format('%m/%d')!;
const day = curr.format('%a')!;
const time = Variable<string>('').poll(1000,
  () => GLib.DateTime.new_now_local().format('%H\n%M')!
);

export const Time = () => 
  <button 
    onButtonPressed={() => {
      App.get_window("quickSettings")?.hide();
      App.toggle_window("calendar");
    }} 
    cssClasses={["time", "timeBtn"]}
    //cursor={Gdk.Cursor.new_from_name('pointer')}     cursor={Gdk.Cursor.new_from_name('pointer')}
  >
    <box vertical hexpand>
      <label cssClasses={["date"]} label={date}/>
      <label cssClasses={["time"]} label={time()}/>
      <label cssClasses={["day"]} label={day}/>
    </box>
  </button>
