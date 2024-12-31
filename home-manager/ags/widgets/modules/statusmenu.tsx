import { App } from 'astal/gtk3';
import { bind } from 'astal';
import Bluetooth from 'gi://AstalBluetooth';
import Network from 'gi://AstalNetwork'
import Wp from 'gi://AstalWp'
import { FlowBox } from "../../astalify/flowbox";

const bluetooth = Bluetooth.get_default()
const network = Network.get_default()?.wifi!; // TODO: fix This[#emitter] is null error encountered when using ethernet - check object props
const speaker = Wp.get_default()?.audio.defaultSpeaker!;

const bluetoothIcon = () => {
  if (!bluetooth.isPowered)
    return;
  
  <icon
    className={bind(bluetooth, "isConnected").as((isConn) => isConn ? "btConnected" : "")}
    icon={bind(bluetooth, "isPowered").as((isPow) => isPow ? "bluetooth-active-symbolic" : "")}
  />;
};

const networkIcon = () =>
  <icon icon={bind(network, "iconName")}/>

const volumeIcon = () => 
  <icon icon={bind(speaker, "volumeIcon")}/>

const DNDIcon = () => 
  <icon icon="notifications-disabled-symbolic"/>

const battery = () => 
  <box/>

export const Status = () =>
  <button 
    onClicked={() => App.toggle_window("quickSettings")} 
    className="time" 
    cursor="pointer"
    //todo onScroll={(_, e) => (e.delta_y > 0) ? volumeup : voldown }
  >
    {/* todo center meee */}
    <FlowBox hexpand min_children_per_line={2} max_children_per_line={2}>
      {bluetoothIcon()}
      {networkIcon()}
      {volumeIcon()}
      {DNDIcon()}
    </FlowBox>
  </button>
