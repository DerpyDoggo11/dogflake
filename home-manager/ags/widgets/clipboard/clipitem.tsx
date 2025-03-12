// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/clip-item.tsx

import { execAsync, GLib, exec } from 'astal';
import { App, Gtk } from 'astal/gtk4';

const SCALE = 150;
const BINARY_DATA = /\[\[ binary data (\d+) (KiB|MiB) (\w+) (\d+)x(\d+) \]\]/;

export const ClipItem = (id: number, content: string): Gtk.Widget => {
    function show_image(file: string, width: number, height: number) {
        const maxWidth = 400;
        const widthPx = (width / height) * SCALE;

        let css = `._${id} { background-image: url("file://${file}");`;

        if (widthPx > maxWidth) {
            const newHeightPx = (SCALE / widthPx) * maxWidth;

            css += `min-height: ${newHeightPx}px; min-width: ${maxWidth}px;`;
        } else {
            css += `min-height: 150px; min-width: ${widthPx}px;`;
        };
        App.apply_css(css + '}');
        return <box cssClasses={[`_${id}`]} valign={Gtk.Align.CENTER}/>
    };

    const matches = content.match(BINARY_DATA);

    if (matches) {
        const format = matches[3];
        const width = matches[4];
        const height = matches[5];

        if (format === 'png') {
            const path = `/tmp/ags/cliphist/${id}.png`;
            if (!GLib.file_test(path, GLib.FileTest.EXISTS)) {
                exec('mkdir -p "/tmp/ags/cliphist/"')
                exec(`cliphist decode ${id} > "${path}"`);
            }

            return show_image(path, Number(width), Number(height));
        };
    };

    return <label label={content} xalign={0} wrap cssClasses={[`_${id}`]}/>
};
