import { Astal, App, Gdk } from 'astal/gtk4';
import { execAsync } from 'astal';

export const powermenu = () =>
   <window
      name="powermenu"
      application={App}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND} 
      
      onKeyPressEvent={(self, event) => {
         self.hide();
         switch (event.get_keyval()[1]) {
            case 113: // Q
               execAsync('systemctl poweroff')
               break;
            case 114: // R
               execAsync('systemctl reboot');
               break;
            case 115: // S
               execAsync('systemctl suspend');
               break;
         };
      }}
   >
      <box>
         <button>
            <image iconName="weather-clear-night-symbolic"/>
         </button>
         <button>
            <image iconName="system-shutdown-symbolic"/>
         </button>
         <button>
            <image iconName="system-reboot-symbolic"/>
         </button>
      </box>
   </window>
