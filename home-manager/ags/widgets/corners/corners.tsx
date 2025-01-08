// Stolen from https://github.com/matt1432/nixos-configs/blob/master/modules/ags/config/widgets/corners/screen-corners.tsx

import Cairo from 'cairo';
const radius = 10;

// todo find an alternative since we cant use drawingarea from Cairo anymore

export const Corner = (place: string) =>
    <drawingarea
        setup={(widget) => {
            widget.connect('draw', (_, cairoContext: Cairo.Context) => {
                widget.set_size_request(radius, radius);

                switch (place) {
                    case 'topleft':
                        cairoContext.arc(radius, radius, radius, Math.PI, 3 * Math.PI / 2);
                        cairoContext.lineTo(0, 0);
                        break;

                    case 'topright':
                        cairoContext.arc(0, radius, radius, 3 * Math.PI / 2, 2 * Math.PI);
                        cairoContext.lineTo(radius, 0);
                        break;

                    case 'bottomleft':
                        cairoContext.arc(radius, 0, radius, Math.PI / 2, Math.PI);
                        cairoContext.lineTo(0, radius);
                        break;

                    case 'bottomright':
                        cairoContext.arc(0, 0, radius, 0, Math.PI / 2);
                        cairoContext.lineTo(radius, radius);
                        break;
                };
                cairoContext.setSourceRGB(0.19215686274509805, 0.21568627450980393, 0.26666666666666666); // #2E3440
                cairoContext.fill();
            });
        }}
    />