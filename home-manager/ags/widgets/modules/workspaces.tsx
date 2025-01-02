// Stolen from https://github.com/rice-cracker-dev/nixos-config/blob/main/modules/extends/candy/home/desktop/shell/ags/config/widgets/HyprlandWidget/index.tsx
import { Gtk, Widget } from 'astal/gtk3';
import { bind, Variable } from 'astal';
import AstalHyprland from 'gi://AstalHyprland';

const hyprland = AstalHyprland.get_default();

export const Workspaces = (props: Omit<Widget.EventBoxProps, 'child' | 'on_scroll' | 'onScroll'>) =>
  <eventbox
    {...props}
    hexpand
    onScroll={ (_, e) => hyprland.dispatch('workspace', (e.delta_y > 0) ? '+1' : '-1') }
  >
    <box
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
    >
      {[...Array(7).keys()].map((i) => (
        <WorkspaceBtn id={i + 1} />
      ))}
    </box>
  </eventbox>

const WorkspaceBtn = ({ id }: { id: number }) => {
  const className = Variable.derive(
    [bind(hyprland, 'workspaces'), bind(hyprland, 'focusedWorkspace')],
    (workspaces, focused) => {
      const workspace = workspaces.find((w) => w.id === id);

      if (!workspace) /* Empty workspace */
        return 'workspaceBtn';

      const occupied = workspace.get_clients().length > 0;
      const active = focused.id === id;

      return `workspaceBtn ${
        (active)
          ? 'active'
          : occupied && 'occupied'
      }`;
    }
  );

  return (
    <button
      className={className()}
      onClick={() => hyprland.dispatch('workspace', `${id}`)}
    >
      {id}
    </button>
  );
};