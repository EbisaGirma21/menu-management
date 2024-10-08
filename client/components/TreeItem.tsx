import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDeleteMenuItem } from "@/hooks/use-menu-query";

interface MenuItem {
  id: string | number;
  name: string;
  depth?: number;
  children?: MenuItem[];
  parentData?: string;
}
// TreeItem Component Type Definition
interface TreeItemProps {
  item: MenuItem;
  setId: (id: string | number) => void;
  setDepth: (depth: number) => void;
  setParentData: (parent: string) => void;
  setName: (name: string) => void;
  setIsOnUpdate: (isOnUpdate: boolean) => void;
}

export const TreeItem: React.FC<TreeItemProps> = ({
  item,
  setId,
  setDepth,
  setParentData,
  setName,
  setIsOnUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const deleteMenuItemMutation = useDeleteMenuItem();

  const handleDelete = async (id: string | number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmed) {
      await deleteMenuItemMutation.mutateAsync(id);
    }
  };
  const handleUpdate = async (child: MenuItem) => {
    setIsOnUpdate(true);
    setId(child.id);
    setDepth(child.depth ?? 0);
    setParentData(item.name);
    setName(child.name);
  };

  return (
    <li className="mt-1">
      <div className="flex items-center p-2">
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 mr-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        <span
          className={
            item.name === "System Code" ? "text-blue-600 font-semibold" : ""
          }
        >
          {item.name}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <ul className="ml-4 mt-1 border-l border-gray-300 pl-2">
          {item.children?.map((child) => (
            <ContextMenu key={child.id}>
              <ContextMenuTrigger>
                <TreeItem
                  item={child}
                  setId={setId}
                  setDepth={setDepth}
                  setParentData={setParentData}
                  setName={setName}
                  setIsOnUpdate={setIsOnUpdate}
                />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => handleDelete(child?.id, child?.name)}
                >
                  Delete
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleUpdate(child)}>
                  Edit
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </ul>
      )}
    </li>
  );
};
