// Stolen from https://github.com/rice-cracker-dev/nixos-config/blob/main/modules/extends/candy/home/desktop/shell/ags/config/widgets/HyprlandWidget/index.tsx
import { bind, Variable } from 'astal';
import AstalHyprland from 'gi://AstalHyprland';

const hyprland = AstalHyprland.get_default();

export const Workspaces = () =>
  <box 
    hexpand
    vertical
    cssClasses={["workspaceList"]}
    onScroll={(_, __, y) => hyprland.dispatch('workspace', (y > 0) ? '+1' : '-1')}
  >
    {[...Array(8).keys()].map((i) =>
      <WorkspaceBtn id={i + 1}/>
    )}
  </box>
  
const WorkspaceBtn = ({ id }: { id: number }) => {
  const className = bind(hyprland, 'focusedWorkspace').as((focused) => {
    const workspace = hyprland.workspaces.find((w) => w.id === id);

    // Empty workspace or monitor was reconnected
    if (!workspace || !focused)
      return ['workspaceBtn'];

    const isOccupied = workspace.get_clients().length > 0;
    const active = focused.id == id;
    
    return (active) 
        ? ['workspaceBtn', 'active']
        : isOccupied ? ['workspaceBtn', 'occupied']
        : ['workspaceBtn']
  })

  return <box hexpand vexpand cssClasses={className}/>
};