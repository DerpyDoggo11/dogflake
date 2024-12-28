import { Variable, GLib } from 'astal';

const date = GLib.DateTime.new_now_local().format("%m/%d")!;
const time = Variable<string>("").poll(1000,
  () => GLib.DateTime.new_now_local().format("%H\n%M")!
);

export const Time = () => {
  const onClicked = () => {
    console.log("TODO open calendar");
  };

  return (
    <button onClicked={onClicked} className="time" cursor="pointer">
      <box vertical hexpand>
        <label className="date" label={date}/>
        <label className="time" label={time()} />
      </box>
    </button>
  );
};