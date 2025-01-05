import { Astal, App, Gdk } from 'astal/gtk3';
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
               execAsync('systemctl suspend')
               break;
            case 114: // R
               execAsync('systemctl reboot');
               break;
            case 115: // S
               execAsync('systemctl poweroff');
               break;
         };
      }}
   >
      <box>
         <button>
            <icon icon="weather-clear-night-symbolic"/>
         </button>
         <button>
            <icon icon="system-shutdown-symbolic"/>
         </button>
         <button>
            <icon icon="system-reboot-symbolic"/>
         </button>
      </box>
   </window>
