// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/index.tsx
import { execAsync, idle } from 'astal';
import { App, Gtk, Astal } from 'astal/gtk4';
import { CLIP_SCRIPT, ClipItem } from './clipitem';
import centerCursor from '../../services/centerCursor';

// TODO remove 'any' type checks

let item_list: { id: number; content: string; entry: string; }[]

const unique_props = ['id'];

const list = new Gtk.ListBox({
    selectionMode: Gtk.SelectionMode.SINGLE,
});

list.connect('row-activated', (_, row) => {
    const id = row.cssClasses[1];

    execAsync(`${CLIP_SCRIPT} --copy-by-id ${id}`);
    App.get_window('clipboard')?.set_visible(false);
});

list.set_sort_func((a, b) => {
    return sortfunc(a, b);
});

const sortfunc = (a: Gtk.ListBoxRow, b: Gtk.ListBoxRow) => {
    const row1id = Number(a.cssClasses[1]);
    const row2id = Number(b.cssClasses[1]);
    a.set_visible(true);
    b.set_visible(true);

    return row2id - row1id;
};

const create_row = (item: any) => ClipItem(item.id, item.content);

let item_map = new Map<[], Gtk.Widget>();
const refreshItems = () => idle(async() => {
    // Delete items that don't exist anymore
    const output = await execAsync(`${CLIP_SCRIPT} --get`)
        .then((str) => str)
        .catch((err) => {
            print(err);

            return '';
        });
    
    const new_list = output
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((entry) => {
            const [id, ...content] = entry.split('\t');

            return { id: parseInt(id.trim()), content: content.join(' ').trim(), entry };
        });

    [...item_map].forEach(([item, widget]) => {
        if (![new_list].some((new_item: any) =>
            unique_props?.every((prop: any) => item[prop] === new_item[prop]) ??
            item === new_item)) {
            widget.get_parent()?.run_dispose();
            item_map.delete(item);
        }
    });

    // Add missing items
    new_list.forEach((item: any) => {
        /*try {
            if (!item_list.some((old_item: any) =>
                unique_props?.every((prop) => old_item[prop] === item[prop]) ?? old_item === item)) {
                    const itemWidget = create_row(item);

                    list.insert(itemWidget, 1);
                    item_map.set(item, itemWidget);
            }
        } catch {((e: any) => console.log(e))};*/

        //TODO Get this working
        const itemWidget = create_row(item);

        list.insert(itemWidget, 1);
    });

    item_list = new_list;

    list.show();
});

export default () => <window
    name="clipboard"
    keymode={Astal.Keymode.ON_DEMAND}
    onShow={() => {
        refreshItems();
        centerCursor();
        //entry.grab_focus();
    }}
    onKeyPressed={(_, key) =>
        (key == 65307) // Gdk.KEY_Escape
           && App.toggle_window("clipboard")
    }
    application={App}
    visible={false}
>
    <box
        vertical
        cssClasses={['clipboard']}
    >
        <Gtk.ScrolledWindow
            cssClasses={["list"]}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        >
            {list}
        </Gtk.ScrolledWindow>
    </box>
</window>