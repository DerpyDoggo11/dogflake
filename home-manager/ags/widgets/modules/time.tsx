import { Variable, GLib } from 'astal';
import { App } from 'astal/gtk3';
const date = GLib.DateTime.new_now_local().format("%m/%d")!;
const time = Variable<string>("").poll(1000,
  () => GLib.DateTime.new_now_local().format("%H\n%M")!
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
      <label className="time" label={time()} />
    </box>
  </button>
