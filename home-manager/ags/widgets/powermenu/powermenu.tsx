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
            case Gdk.KEY_Q:
               execAsync('systemctl suspend')
               break;
            case Gdk.KEY_S:
               execAsync('shutdown now');
               break;
            case Gdk.KEY_R:
               execAsync('reboot');
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
