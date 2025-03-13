// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/clip-item.tsx

import { GLib, exec } from 'astal';
import { App, Gtk } from 'astal/gtk4';

export const ClipboardItem = (id: number, content: string): Gtk.Widget => {
    function show_image(file: string, width: number, height: number) {
        const maxWidth = (width < 400) ? width : 400;
        const maxHeight = (height < 300) ? height : 300;
        
        App.apply_css(`._${id} {
            background-image: url("file://${file}");
            min-height: ${maxHeight}px;
            min-width: ${maxWidth}px;
        }`);
        return <box cssClasses={[`_${id}`]} name={'image'} valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}/>
    };

    const matches = content.match(/\[\[ binary data (\d+) (KiB|MiB) (\w+) (\d+)x(\d+) \]\]/);
    if (matches) {
        const extension = matches[3];
        const width = matches[4];
        const height = matches[5];

        const path = `/tmp/ags/cliphist/${id}.${extension}`;
        if (!GLib.file_test(path, GLib.FileTest.EXISTS)) {
            exec('mkdir -p "/tmp/ags/cliphist/"');
            exec(`bash -c 'cliphist decode ${id} > "${path}"'`);
        };
        return show_image(path, Number(width), Number(height));
    };

    return <label label={content} xalign={0} wrap cssClasses={[`_${id}`]}/>
};
