import { App } from 'astal/gtk3';

export const Powermenu = () => 
   <window
      name="powermenu"
      application={App}
      visible={false}
   >
      <box>
         {/* keybinds:
            Q = shutdown
            S = sleep
            R = reboot
         */}
      </box>
   </window>
