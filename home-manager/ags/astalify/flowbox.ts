import { Gtk, astalify, type ConstructProps } from "astal/gtk3";
import { GObject } from "astal";

@GObject.registerClass
export class FlowBox extends astalify(Gtk.FlowBox) {
    constructor(args: ConstructProps<FlowBox, Gtk.FlowBox.ConstructorProps>) {
        super(args as any);
    };

    protected getChildren(): Array<Gtk.Widget> {
        return this.get_children()
            .filter(ch => ch instanceof Gtk.FlowBoxChild)
            .map(ch => ch.get_child())
            .filter(ch => ch instanceof Gtk.Widget)
    };
};