// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/lib/notify.ts

import { subprocess } from 'astal';

interface NotifyAction {
    id: string // TODO retype id as integer
    label: string
    callback: () => void
}

interface NotifySendProps {
    actions?: NotifyAction[]
    appName?: string
    body?: string
    category?: string
    iconName?: string
    title: string
}

const escapeShellArg = (arg: string): string => `'${arg?.replace(/'/g, '\'\\\'\'')}'`;

export const notifySend = ({
    actions = [],
    appName,
    body,
    category,
    iconName,
    title,
}: NotifySendProps) => new Promise<number>((resolve) => {
    let printedId = false;

    const cmd = [
        'notify-send',
        '--print-id',
        escapeShellArg(title),
        escapeShellArg(body ?? ''),
        
        // Optional params
        appName ? `--app-name=${escapeShellArg(appName)}` : '',
        category ? `--category=${escapeShellArg(category)}` : '',
        iconName ? `--icon=${escapeShellArg(iconName)}` : ''
    ].concat(
        actions.map(({ id, label }) => `--action=${escapeShellArg(id)}=${escapeShellArg(label)}`),
    ).join(' ');

    console.log(cmd);
    subprocess(
        cmd,
        (out) => {
            if (!printedId) {
                resolve(parseInt(out));
                printedId = true;
            }
            else {
                actions.find((action) => action.id === out)?.callback();
            }
        },
        (err) => console.log('[Notify] ' + err)
    );
});