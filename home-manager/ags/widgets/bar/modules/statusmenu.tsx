import { App } from 'astal/gtk3';
import { bind } from 'astal';
import Bluetooth from 'gi://AstalBluetooth';
import Wp from 'gi://AstalWp'
import Battery from 'gi://AstalBattery';
import { DND } from '../../notifications/notifications';

const bluetooth = Bluetooth.get_default()
const speaker = Wp.get_default()?.audio.defaultSpeaker!;
const battery = Battery.get_default();

const BluetoothIcon = () => 
  <icon
    className={bind(bluetooth, 'isConnected').as((isConn) => (isConn) ? 'btConnected' : '')}
    icon='bluetooth-active-symbolic'
    visible={bind(bluetooth, 'isPowered')}
  />
  
const BatteryWidget = () =>
  <icon
    tooltipText={bind(battery, 'percentage').as((p) => (p * 100) + '%')}
    icon={bind(battery, 'batteryIconName')}
  />

const NetworkIcon = () =>
  <icon/>
  //<icon icon={bind(network, 'iconName')}/>

const VolumeIcon = () => 
  <icon icon={bind(speaker, 'volumeIcon')}/>

const DNDIcon = () => 
  <icon visible={bind(DND)} icon='notifications-disabled-symbolic'/>

export const Status = () =>
  <button 
    onClicked={() => {
      App.get_window('calendar').hide();
      App.toggle_window('quickSettings');
    }}
    className='time'
    cursor='pointer'
    onScroll={(_, e) => speaker.volume = (e.delta_y < 0) ? speaker.volume + 0.05 : speaker.volume - 0.05 }
  >
    <box vertical spacing={5}>
      <NetworkIcon/>
      <VolumeIcon/>
      <BatteryWidget/>
      <BluetoothIcon/>
      <DNDIcon/>
    </box>
  </button>
