// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/index.tsx

import { execAsync, idle, monitorFile, Gio } from 'astal';
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

monitorFile(`/home/alec/.cache/cliphist/db`, (_, event) => {
    if (event == Gio.FileMonitorEvent.CHANGES_DONE_HINT) refreshItems();
});  

const refreshItems = () => idle(async() => {
    // Delete items that don't exist anymore
    const new_list = await execAsync('cliphist list')
    .then((str) => str.split('\n')
        .filter((line) => line.trim() !== '')
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
});

export default () => <window
    name="clipboard"
    keymode={Astal.Keymode.ON_DEMAND}
    setup={() => refreshItems()}
    onShow={() => centerCursor()}
    onKeyPressed={(_, key) =>
        (key == 65307) // Gdk.KEY_Escape
           && App.toggle_window("clipboard")
    }
    application={App}
    visible={false}
    >
        <Gtk.ScrolledWindow
            cssClasses={["list"]}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            heightRequest={700}
            widthRequest={500}
        >
            {list}
        </Gtk.ScrolledWindow>
    </window>