import { Astal, App } from 'astal/gtk4';
import { execAsync } from 'astal';

export const powermenu = () =>
   <window
      name="powermenu"
      application={App}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND} 
      
      onKeyPressed={(self, key) => {
         self.hide();
         switch (key) {
            case 113: // Q
               execAsync('systemctl poweroff')
               break;
            case 114: // R
               execAsync('systemctl reboot');
               break;
            case 115: // S
               execAsync('hyprlock && systemctl suspend');
               break;
         };
      }}
   >
      <box>
         <image cssClasses={['sleep']} iconName="weather-clear-night-symbolic"/>
         <image cssClasses={['shutdown']} iconName="system-shutdown-symbolic"/>
         <image cssClasses={['reboot']} iconName="system-reboot-symbolic"/>
      </box>
   </window>
