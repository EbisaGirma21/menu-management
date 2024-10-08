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
}

export const MenuTree: React.FC<MenuTreeProps> = ({ items }) => {
  return (
    <ul className="text-sm">
      {items.map((item) => (
        <TreeItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
