import { App } from 'astal/gtk3';
import { bind } from 'astal';
import Bluetooth from 'gi://AstalBluetooth';
import Network from 'gi://AstalNetwork'
import Wp from 'gi://AstalWp'
import { FlowBox } from "../../astalify/flowbox";
import { DND } from '../notifications/notifications';

const bluetooth = Bluetooth.get_default()
const network = Network.get_default()?.wifi!; // TODO: fix This[#emitter] is null error encountered when using ethernet - check object props
const speaker = Wp.get_default()?.audio.defaultSpeaker!;

const BluetoothIcon = () => 
  <icon
    className={bind(bluetooth, "isConnected").as((isConn) => (isConn) ? "btConnected" : "")}
    icon="bluetooth-active-symbolic"
  />

const NetworkIcon = () =>
  <icon icon={bind(network, "iconName")}/>

const VolumeIcon = () => 
  <icon icon={bind(speaker, "volumeIcon")}/>

const DNDIcon = () => 
  <icon visible={bind(DND)} icon="notifications-disabled-symbolic"/>

export const Status = () =>
  <button 
    onClicked={() => {
      App.get_window("calendar").hide();
      App.toggle_window("quickSettings");
    }}
    className="time" 
    cursor="pointer"
    onScroll={(_, e) => (e.delta_y > 0) ? speaker.volume + 5 : speaker.volume - 5 }
  >
    {/* todo center meee */}
    <FlowBox hexpand min_children_per_line={2} max_children_per_line={2}>
      <NetworkIcon/>
      <VolumeIcon/>
      <DNDIcon/>
      <box>{bind(bluetooth, "isPowered").as((pow) => {
        // TODO fix me breaking other icons in same box
        if (pow)
          return <BluetoothIcon/>
        return <></>
      })}</box>
    </FlowBox>
  </button>
