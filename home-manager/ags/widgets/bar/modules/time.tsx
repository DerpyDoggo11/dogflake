import { Variable, GLib } from 'astal';
import { App } from 'astal/gtk4';
const curr = GLib.DateTime.new_now_local();
const date = curr.format('%m/%d')!;
const day = curr.format('%a')!;
const time = Variable<string>("").poll(1000,
  () => GLib.DateTime.new_now_local().format('%H\n%M')!
);

export const Time = () => 
  <button 
    onClicked={() => {
      App.get_window("quickSettings")?.hide();
      App.toggle_window("calendar");
    }} 
    cssClasses={["time"]}
    //cursor="pointer" todo add me back
  >
    <box vertical hexpand>
      <label cssClasses={["date"]} label={date}/>
      <label cssClasses={["time"]} label={time()}/>
      <label cssClasses={["day"]} label={day}/>
    </box>
  </button>
