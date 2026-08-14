import { execAsync } from 'ags/process';
import { Gtk } from 'ags/gtk4';
import app from 'ags/gtk4/app'
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import { ClipboardItem, entryPath, cacheDir, videoExts } from './clipboardItem';
import BackgroundSection from '../../lib/backgroundSection';
import inputControl from '../../lib/inputControl';
import { streamingMode } from '../notifications/notifications';

const list = new Gtk.ListBox();

const mimeTypes = new Map<string, string>(); // for faster pasting
const paths = new Map<string, string>(); // file each entry points at

list.connect('row-activated', async (_, row) => {
    app.get_window('clipboard')?.set_visible(false);

    const id = row.child.name;
    const type = mimeTypes.get(id) ?? 'text/plain';
    await execAsync(`bash -c 'cliphist decode ${id} | wl-copy -t ${type}'`);
});

list.set_sort_func((a, b) => {
    const row1id = Number(a.child.name);
    const row2id = Number(b.child.name);

    return row2id - row1id;
});

const rows = new Map<string, Gtk.Widget>();

streamingMode.subscribe(() => {
    list.remove_all(); // Items render differently in streaming mode, so rebuild them all
    rows.clear();
    refreshItems();
});

const refreshItems = async () => {
    const entries = await execAsync('cliphist list')
    .then((str) => str.split('\n')
        .map((entry) => {
            const [id, content] = entry.split('\t');
            return { id: id, content: content };
        })
        .filter((entry) => entry.id && entry.content)
    ).catch(() => []);

    entries.forEach((entry) => {
        if (rows.has(entry.id)) return;

        const image = entry.content.match(/\[\[ binary data \d+ (?:B|KiB|MiB|GiB) (\w+)/);
        mimeTypes.set(entry.id, image ? `image/${image[1]}` : 'text/plain');

        const path = entryPath(entry.id, entry.content);
        if (path) paths.set(entry.id, path);

        const child = ClipboardItem(entry.id, entry.content, path) as Gtk.Widget;
        list.append(child);
        rows.set(entry.id, child);
    });

    const current = new Set(entries.map((entry) => entry.id));
    rows.forEach((child, id) => {
        if (current.has(id)) return;

        list.remove(child.get_parent() as Gtk.Widget); // ListBoxRow parent
        rows.delete(id);
        mimeTypes.delete(id);
        paths.delete(id);
    });
};
refreshItems();

// File of the selected entry
const selectedFile = () => {
    const id = (list.get_selected_row() ?? list.get_row_at_index(0))?.child.name;
    const file = paths.get(id ?? '');

    return (file && GLib.file_test(file, GLib.FileTest.EXISTS)) ? file : null;
};

const handleKeys = (_ctrl: any, key: number) => {
    switch (key) {
    case 65293: // Enter
        (list.get_selected_row() ?? list.get_row_at_index(0))?.activate();
        break;
    case 99: // C - copy 2nd recent entry
        list.get_row_at_index(1)?.activate()
        break;
    case 101: // E - edit image with swappy
        const image = selectedFile();
        if (!image || videoExts.test(image)) break;

        app.get_window('clipboard')?.hide()
        execAsync(['swappy', '-f', image]);
        break;
    case 115: // S - show in nemo
        const file = selectedFile();
        if (!file) break;

        app.get_window('clipboard')?.hide()
        Gio.DBus.session.call(
            'org.freedesktop.FileManager1',
            '/org/freedesktop/FileManager1',
            'org.freedesktop.FileManager1',
            'ShowItems',
            new GLib.Variant('(ass)', [[GLib.filename_to_uri(file, null)], '']),
            null, Gio.DBusCallFlags.NONE, -1, null, null);
        break;
    case 119: // W - wipe clipboard history
        execAsync(`bash -c 'cliphist wipe && rm -rf ${cacheDir}'`);
        app.get_window('clipboard')?.hide()
        break;
    };
};

export default () => inputControl('clipboard', () =>
    <BackgroundSection
        width={500}
        header={<label $type="overlay" label="Clipboard"/>}
        content={
        <Gtk.ScrolledWindow
            cssClasses={['clipboardScroll']}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            overlayScrolling
            maxContentHeight={500}
            propagateNaturalHeight
        >
            {list}
        </Gtk.ScrolledWindow>}
    />,
    async () => {
        await refreshItems();
        list.get_first_child()?.grab_focus();
    },
    undefined,
    handleKeys);
