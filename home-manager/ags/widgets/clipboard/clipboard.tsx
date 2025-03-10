// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/index.tsx
import { execAsync, idle } from 'astal';
import { App, Gtk, Astal } from 'astal/gtk4';
import { AsyncFzf, AsyncFzfOptions, Fzf, FzfResultItem } from 'fzf';
import { CLIP_SCRIPT, ClipItem, EntryObject } from './clipitem';
import centerCursor from '../../services/centerCursor';

// TODO remove 'any' type checks

let item_list: { id: number; content: string; entry: string; }[]

const fzf_options = { selector: (item: any) => item.content };
let fzf_results: any;
const unique_props = ['id'];

const list = new Gtk.ListBox({
    selectionMode: Gtk.SelectionMode.SINGLE,
});

list.connect('row-activated', (_, row) => {
    const id = row.cssClasses[1];

    execAsync(`${CLIP_SCRIPT} --copy-by-id ${id}`);
    App.get_window('clipboard')?.set_visible(false);
});


const on_text_change = (text: string) => {
    (new AsyncFzf(item_list, fzf_options)).find(text)
        .then((out: any) => {
            fzf_results = out;
            list.invalidate_sort();
        })
        .catch(() => { });
};

const entry = (
    <entry
        onKeyReleased={(self) => on_text_change(self.text)}
        hexpand
    />
) as Gtk.Entry;

list.set_sort_func((a, b) => {
    return sortfunc(a, b, entry, fzf_results);
});

const sortfunc = (a: Gtk.ListBoxRow, b: Gtk.ListBoxRow, entry: Gtk.Entry, fzfResults: any) => {
    const row1id = Number(a.cssClasses[1]);
    const row2id = Number(b.cssClasses[1]);

    if (entry.text === '' || entry.text === '-') {
        a.set_visible(true);
        b.set_visible(true);

        return row2id - row1id;
    }
    else {
        const s1 = fzfResults.find((r: any) => r.item.id === row1id)?.score ?? 0;
        const s2 = fzfResults.find((r: any) => r.item.id === row2id)?.score ?? 0;

        a.set_visible(s1 !== 0);
        b.set_visible(s2 !== 0);

        return s2 - s1;
    }
};

const create_row = (item: any) => ClipItem(item.id, item.content);

let item_map = new Map<[], Gtk.Widget>();
const refreshItems = () => idle(async() => {
    // Delete items that don't exist anymore
    const new_list = async () => {
        const output = await execAsync(`${CLIP_SCRIPT} --get`)
            .then((str) => str)
            .catch((err) => {
                print(err);

                return '';
            });
        
        return output
            .split('\n')
            .filter((line) => line.trim() !== '')
            .map((entry) => {
                const [id, ...content] = entry.split('\t');

                return { id: parseInt(id.trim()), content: content.join(' ').trim(), entry };
            });
        };

    [...item_map].forEach(([item, widget]) => {
        if (![new_list].some((new_item: any) =>
            unique_props?.every((prop: any) => item[prop] === new_item[prop]) ??
            item === new_item)) {
            widget.get_parent()?.run_dispose();
            item_map.delete(item);
        }
    });

    // Add missing items
    [new_list].forEach((item: any) => {
        if (!item_list.some((old_item: any) =>
            unique_props?.every((prop) => old_item[prop] === item[prop]) ??
            old_item === item)) {
            const itemWidget = create_row(item);

            list.insert(itemWidget, -1);
            item_map.set(item, itemWidget);
        }
    });

    item_list = await new_list();

    list.show();
    //on_text_change('');
});

export default () => <window
    name="clipboard"
    keymode={Astal.Keymode.ON_DEMAND}
    onShow={() => {
        entry.set_text('');
        refreshItems();
        centerCursor();
        entry.grab_focus();
    }}
    application={App}
    visible={false}
>
    <box
        vertical
        cssClasses={['clipboard', 'sorted-list']}
    >
        <box cssClasses={['widget', 'search']}>
            <image iconName="preferences-system-search-symbolic" />
            {entry}
        </box>

        <box>
            <box
                cssClasses={["widget", "list"]}

                //css="min-height: 600px; min-width: 700px;"
                //hscroll={Gtk.PolicyType.NEVER}
                //vscroll={Gtk.PolicyType.AUTOMATIC}
            >
                <box vertical>
                    {list}
                </box>
            </box>
        </box>
    </box>
</window>