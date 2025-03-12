// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/index.tsx

import { execAsync, monitorFile, Gio } from 'astal';
import { App, Gtk, Astal } from 'astal/gtk4';
import { ClipItem } from './clipitem';
import centerCursor from '../../services/centerCursor';

const list = new Gtk.ListBox({ selectionMode: Gtk.SelectionMode.SINGLE });

list.connect('row-activated', async (_, row) => {
    const id = row.child.cssClasses[0].slice(1);

    App.get_window('clipboard')?.set_visible(false);
    await execAsync(`bash -c 'cliphist decode "${id}" | wl-copy'`);
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
    // Delete items that don't exist anymore
    const new_list = await execAsync('cliphist list')
    .then((str) => str.split('\n')
        .map((entry) => {
            const [id, ...content] = entry.split('\t');
            return { id: parseInt(id.trim()), content: content.join(' ').trim(), entry };
        })
    ).catch(() => { return [] });

    // Wipe the list
    list.remove_all();

    // Add all the items
    new_list.forEach((item) => {
        const itemWidget = ClipItem(item.id, item.content);
        list.insert(itemWidget, -1);
    });
};

export default () => <window
    name="clipboard"
    keymode={Astal.Keymode.ON_DEMAND}
    setup={() => refreshItems()}
    onShow={() => {
        centerCursor()
        list.get_first_child()?.grab_focus();
    }}
    onKeyPressed={(self, key) => {
        switch (key) {
            // todo finish me
            case 114: // R - normalize most recent text
                break;
            case 99: // C - copy 2nd recent entry
                list.get_row_at_index(1)?.activate()
                break;
            case 114: // E - open image in Swappy
                break;
            default:
                self.hide()
        }
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