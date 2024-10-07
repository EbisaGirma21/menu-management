interface MenuItem {
  id: string;
  name: string;
  children?: MenuItem[];
}

interface MenuTreeProps {
  items: MenuItem[];
}

const MenuTree: React.FC<MenuTreeProps> = ({ items }) => {
  return (
    <ul className="text-sm">
      {items.map((item) => (
        <TreeItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default MenuTree;
