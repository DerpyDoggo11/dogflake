import { Astal, App } from 'astal/gtk4';
import { execAsync } from 'astal';
import centerCursor from '../../services/centerCursor';

export const powermenu = () =>
   <window
      name="powermenu"
      application={App}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      onShow={centerCursor}
      
      onKeyPressed={(self, key) => {
         self.hide();
         switch (key) {
            case 115: // S
               execAsync('hyprlock');
               execAsync('systemctl suspend');
               break;
            case 113: // Q
               execAsync('systemctl poweroff')
               break;
            case 108: // L
               execAsync('hyprlock');
               break;
            case 114: // R
               execAsync('systemctl reboot');
               break;
         };
      }}
   >
      <box>
         <image cssClasses={['sleep']} iconName="weather-clear-night-symbolic"/>
         <image cssClasses={['shutdown']} iconName="system-shutdown-symbolic"/>
         <image cssClasses={['lock']} iconName="system-lock-screen-symbolic"/>
         <image cssClasses={['reboot']} iconName="system-reboot-symbolic"/>
      </box>
   </window>
