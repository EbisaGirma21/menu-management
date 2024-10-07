import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  children?: MenuItem[];
}

interface TreeItemProps {
  item: MenuItem;
}

const TreeItem: React.FC<TreeItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="mt-1">
      <div className="flex items-center">
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
          {item.children.map((child) => (
            <TreeItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeItem;
