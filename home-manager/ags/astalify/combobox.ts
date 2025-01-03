import { Gtk, astalify, type ConstructProps } from "astal/gtk3";
import { GObject } from "astal";

export class ComboBox extends astalify(Gtk.ComboBoxText) {
    static {
        GObject.registerClass(this);
    };

    constructor(props: ConstructProps<ComboBox, Gtk.ComboBoxText.ConstructorProps>) {
        super(props as any);
    };
};