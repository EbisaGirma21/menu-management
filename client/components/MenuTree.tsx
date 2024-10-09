import { TreeItem } from "./TreeItem";

interface MenuItem {
  id: string | number;
  name: string;
  depth?: number;
  children?: MenuItem[];
  parentData?: string;
}
interface MenuTreeProps {
  items: MenuItem[];
  setId: (id: string | number) => void;
  setDepth: (depth: number) => void;
  setParentData: (parent: string) => void;
  setName: (name: string) => void;
  setIsOnUpdate: (isOnUpdate: boolean) => void;
}

export const MenuTree: React.FC<MenuTreeProps> = ({
  items,
  setId,
  setDepth,
  setParentData,
  setName,
  setIsOnUpdate,
}) => {
  return (
    <ul className="text-sm">
      {items.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          setId={setId}
          setDepth={setDepth}
          setParentData={setParentData}
          setName={setName}
          setIsOnUpdate={setIsOnUpdate}
        />
      ))}
    </ul>
  );
};
