import { bind } from 'astal';
import Bluetooth from 'gi://AstalBluetooth';
import Network from 'gi://AstalNetwork'
import Wp from 'gi://AstalWp'

const bluetooth = Bluetooth.get_default()
const network = Network.get_default()?.wifi!; // TODO: fix This[#emitter] is null error encountered when using ethernet - check object properties
const speaker = Wp.get_default()?.audio.defaultSpeaker!;

const bluetoothIcon = () =>
  <icon
    className={bind(bluetooth, "isConnected").as((isConn) => isConn ? "btConnected" : "")}
    icon={bind(bluetooth, "isPowered").as((isPow) => isPow ? "bluetooth-active-symbolic" : "")}
  />;

const networkIcon = () =>
  <icon icon={bind(network, "iconName")}/>

const volumeIcon = () => 
  <icon icon={bind(speaker, "volumeIcon")}/>

const DNDIcon = () => 
  <icon/>

const battery = () => 
  <box/>

export const Status = () => {
  const onClicked = () => {
    console.log("TODO open quicksettings");
  };

  return (
    <button onClicked={onClicked} className="time" cursor="pointer">
      <box vertical hexpand>
        {bluetoothIcon()}
        {networkIcon()}
        {volumeIcon()}
        {DNDIcon()}
        {battery()}
      </box>
    </button>
  );
};