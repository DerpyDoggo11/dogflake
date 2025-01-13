import { Gtk } from 'astal/gtk4';
import Cairo from 'cairo';
const radius = 10;

export const Corner = (place: string) => {
    const drawingArea = new Gtk.DrawingArea();
    drawingArea.set_size_request(radius, radius);
    drawingArea.set_draw_func((_, cr) => {
        const cairoContext = cr as Cairo.Context;
        
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
    })
    return drawingArea;
};
