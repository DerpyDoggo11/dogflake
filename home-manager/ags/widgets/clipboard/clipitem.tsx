// Mostly stolen from https://github.com/matt1432/nixos-configs/blob/2f5cb5b4a01a91b8564c72cf10403fca47825572/modules/ags/config/widgets/clipboard/clip-item.tsx

import { execAsync } from 'astal';
import { Gtk } from 'astal/gtk4';

export interface EntryObject {
    id: number
    content: string
    entry: string
}

const SCALE = 150;
const BINARY_DATA = /\[\[ binary data (\d+) (KiB|MiB) (\w+) (\d+)x(\d+) \]\]/;

export const CLIP_SCRIPT = `/home/alec/Projects/flake/home-manager/ags/services/cliphist.sh`;

export const ClipItem = (id: number, content: string) =>
    <box vertical cssClasses={['notification', id.toString()]}
        setup={(self) => {
            function show_image(file: string, width: string | number, height: string | number) {
                self.children[2].run_dispose();

                const initCss = () => {
                    const _widthPx = Number(width);
                    const heightPx = Number(height);
                    const maxWidth = 400;
                    const widthPx = (_widthPx / heightPx) * SCALE;

                    let css = `background-image: url("${file}");`;

                    if (widthPx > maxWidth) {
                        const newHeightPx = (SCALE / widthPx) * maxWidth;

                        css += `min-height: ${newHeightPx}px; min-width: ${maxWidth}px;`;
                    }
                    else {
                        css += `min-height: 150px; min-width: ${widthPx}px;`;
                    }

                    return css;
                };


                self.children = [...self.children];
            };

            //self.id = self.id;
            //this.content = self.content;

            const matches = content.match(BINARY_DATA);

            if (matches) {
                // const size = matches[1];
                const format = matches[3];
                const width = matches[4];
                const height = matches[5];

                if (format === 'png') {
                    execAsync(`${CLIP_SCRIPT} --save-by-id ${id}`)
                        .then((file) => {
                            show_image(file, width, height);
                        })
                        .catch(print);
                }
            };
        }}>
            <label
                label="・"
                xalign={0}
                valign={Gtk.Align.CENTER}
            />
            <label
                label={content}
                xalign={0}
                valign={Gtk.Align.CENTER}
            //truncate
            />
    </box>