import { Variable, GLib } from 'astal';
import { App } from 'astal/gtk3';
const curr = GLib.DateTime.new_now_local();
const date = curr.format('%m/%d')!;
const day = curr.format('%a')!;
const time = Variable<string>("").poll(1000,
  () => GLib.DateTime.new_now_local().format('%H\n%M')!
);

export const Time = () => 
  <button 
    onClicked={() => {
      App.get_window("quickSettings").hide();
      App.toggle_window("calendar");
    }} 
    className="time" 
    cursor="pointer"
  >
    <box vertical hexpand>
      <label className="date" label={date}/>
      <label className="time" label={time()}/>
      <label className="day" label={day}/>
    </box>
  </button>
