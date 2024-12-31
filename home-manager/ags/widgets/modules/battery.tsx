import Battery from 'gi://AstalBattery';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

export const BatteryWidget = () => {
    const bat = Battery.get_default()
    return (
        <box halign={Gtk.Align.CENTER}
            >
            <label label={bind(bat, "percentage").as((p) => (p * 100) + "%")}/>
            { bind(bat, "percentage").as(p => {
                const barCount = Math.round(p * 10);
                let barContent = ""; 
                for (let i = 0; i < 10; i++) { // 10 bars
                    barContent += (i < barCount)
                    ? "|" // Full bar notch
                    : "." // Empty bar notch
                };
                return ""; // NOT FINISHED
                return barContent; // todo test and finish me
            }) }
    </box>)
}