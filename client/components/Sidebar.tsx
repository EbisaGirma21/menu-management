import { X, Layers, Code, FileText, Grid, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-[#1c2536] text-white w-64 flex-shrink-0 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative z-10 h-full`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">CLOIT</h1>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="mt-8">
        <NavItem icon={<Layers className="h-5 w-5" />} label="Systems" />
        <NavItem icon={<Code className="h-5 w-5" />} label="System Code" />
        <NavItem icon={<FileText className="h-5 w-5" />} label="Properties" />
        <NavItem icon={<Grid className="h-5 w-5" />} label="Menus" active />
        <NavItem icon={<FileText className="h-5 w-5" />} label="API List" />
        <NavItem icon={<Users className="h-5 w-5" />} label="Users & Group" />
        <NavItem icon={<Layers className="h-5 w-5" />} label="Composition" />
      </nav>
    </aside>
  );
};

export default Sidebar;
