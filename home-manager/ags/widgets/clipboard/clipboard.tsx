// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/index.tsx

import { execAsync, monitorFile, Gio, GLib } from 'astal';
import { App, Gtk, Astal } from 'astal/gtk4';
import { ClipboardItem } from './clipboarditem';
import centerCursor from '../../services/centerCursor';

const list = new Gtk.ListBox;

list.connect('row-activated', async (_, row) => {
    const id = row.child.cssClasses[0].slice(1);

    App.get_window('clipboard')?.set_visible(false);

    const xargs = (row.child.name == 'image') ? '' : '| xargs';
    await execAsync(`bash -c 'cliphist decode "${id}" ${xargs} | wl-copy'`);
});

list.set_sort_func((a, b) => {
    const row1id = Number(a.cssClasses[0]);
    const row2id = Number(b.cssClasses[0]);
    a.set_visible(true);
    b.set_visible(true);

    return row2id - row1id;
});

monitorFile(`/home/alec/.cache/cliphist/db`, (_, event) =>
    (event == Gio.FileMonitorEvent.CHANGES_DONE_HINT) && refreshItems()
);

// Use astal idle util if laggy
const refreshItems = async () => {
    const entries = await execAsync('cliphist list')
    .then((str) => str.split('\n')
        .map((entry) => {
            const [id, ...content] = entry.split('\t');
            return { id: parseInt(id.trim()), content: content.join(' ').trim(), entry };
        })
    ).catch((e) => { console.error(e); return [] });

    list.remove_all();
    entries.forEach((entry) =>
        list.insert(ClipboardItem(entry.id, entry.content), -1)
    );
};

export default () => <window
    name="clipboard"
    keymode={Astal.Keymode.ON_DEMAND}
    setup={() => refreshItems()}
    onShow={() => {
        centerCursor();
        list.get_first_child()?.grab_focus();
    }}
    onKeyPressed={async (self, key) => {
        switch (key) {
            case 114: // R - reset/normalize most recent text
                list.get_row_at_index(0)?.activate()
                break;
            case 99: // C - copy 2nd recent entry
                list.get_row_at_index(1)?.activate()
                break;
            case 101: // E - edit image with Swappy
                const id = list.get_selected_row()?.child.cssClasses[0].slice(1);

                // Only screenshots are modified commonly so we can assume a png extension
                const path = `/tmp/ags/cliphist/${id}.png`;
                if (!GLib.file_test(path, GLib.FileTest.EXISTS)) break;

                self.hide();
                await execAsync('swappy -f ' + path);
                break;
            default: // Hide if enter key not pressed
                (key != 65293) && self.hide()
        };
    }}
    application={App}
    visible={false}
    >
        <Gtk.ScrolledWindow
            cssClasses={["list"]}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            heightRequest={500}
            widthRequest={400}
        >
            {list}
        </Gtk.ScrolledWindow>
    </window>