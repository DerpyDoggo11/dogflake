import GObject, { register, property } from 'astal/gobject';
import { monitorFile, readFileAsync } from 'astal/file';
import { exec, execAsync } from 'astal/process';
import { bind } from 'astal';

const get = (args: string) => Number(exec(`brightnessctl ${args}`));
const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`);
// Refactor to remove screen property and just use Variable bindings instead of this complicated class

@register({ GTypeName: "Brightness" })
export default class Brightness extends GObject.Object {
    #screenMax = get("max");
    #screen = get("get") / (get("max") || 1);

    @property(Number)
    get screen() { return this.#screen; }

    set screen(percent) {
        if (percent < 0)
            percent = 0;

        if (percent > 1)
            percent = 1;

        execAsync(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
            this.#screen = percent;
            this.notify("screen");
        });
    };

    constructor() {
        super();

        const screenPath = `/sys/class/backlight/${screen}/brightness`;

        monitorFile(screenPath, async f => {
            const v = await readFileAsync(f);
            this.#screen = Number(v) / this.#screenMax;
            this.notify("screen");
        });
    };
};

const brightness = new Brightness();
export const BrightnessSlider = () => 
    <box>
        <icon icon="display-brightness-symbolic"/>
        <slider
            hexpand
            value={bind(brightness, "screen")}
            onDragged={({ value }) => brightness.screen = value}
        />
    </box>
