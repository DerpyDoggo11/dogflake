import { monitorFile, readFileAsync } from 'astal/file';
import { exec, execAsync } from 'astal/process';
import { bind, Variable } from 'astal';

const get = (args: string) => Number(exec(`brightnessctl ${args}`));
const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`);

const screenMax = get("max");
export const brightness: Variable<number> = new Variable(get("get") / (screenMax || 1));

export const setBrightness = (percent: number) => {
    if (percent < 0)
        percent = 0;

    if (percent > 1)
        percent = 1;

    execAsync(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => 
        brightness.set(percent)
    );
};

export const monitorBrightness = () => {
    const screenPath = `/sys/class/backlight/${screen}/brightness`;

    monitorFile(screenPath, async () => {
        const v = await readFileAsync(screenPath);
        brightness.set(Number(v) / screenMax);
    });
};

export const BrightnessSlider = () => 
    <box>
        <icon icon="display-brightness-symbolic"/>
        <slider
            hexpand
            value={bind(brightness)}
            onDragged={({ value }) => setBrightness(value)}
        />
    </box>
