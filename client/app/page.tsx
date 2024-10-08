"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Folder,
  LayoutGrid,
  WrapText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  useFetchMenuItems,
  useAddMenuItem,
  useEditMenuItem,
} from "../hooks/use-menu-query"; // Adjust the import path accordingly
import { useForm } from "react-hook-form";

// Define type for menu items
interface MenuItem {
  id: string | number;
  name: string;
  depth?: number;
  children?: MenuItem[];
}

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // React Query hooks
  const { data: menuItems } = useFetchMenuItems();
  const addMenuItemMutation = useAddMenuItem();
  const editMenuItemMutation = useEditMenuItem();

  // React Hook Form
  const { register, handleSubmit, setValue, reset } = useForm<MenuItem>({
    defaultValues: {
      name: "",
      depth: 0,
      parentData: "",
    },
  });

  const onSubmit = async (data: MenuItem) => {
    if (data.id) {
      await editMenuItemMutation.mutateAsync(data);
    } else {
      await addMenuItemMutation.mutateAsync(data);
    }
    reset(); // Reset form after submission
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`bg-[#101828] text-[#667085] w-64 flex-shrink-0 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative z-10 h-full`}
      >
        <div className="p-4 flex items-center justify-between">
          <Image
            src="./asset/logo.svg"
            alt="CLOIT Logo"
            width={100}
            height={30}
          />
          <WrapText />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="m-4 bg-[#1d2939] rounded-md">
          <NavItem
            icon={
              <Image
                src="./asset/folder.svg"
                alt="CLOIT Logo"
                width={25}
                height={25}
              />
            }
            label="Systems"
          />
          <NavItem icon={<LayoutGrid />} label="System Code" />
          <NavItem
            icon={
              <Image
                src="./asset/othermenu.svg"
                alt="CLOIT Logo"
                width={25}
                height={25}
              />
            }
            label="Properties"
          />
          <NavItem icon={<LayoutGrid />} label="Menus" active />
          <NavItem
            icon={
              <Image
                src="./asset/othermenu.svg"
                alt="CLOIT Logo"
                width={25}
                height={25}
              />
            }
            label="API List"
          />
        </nav>
        <NavItem icon={<Folder className="ml-4" />} label="Users & Group" />
        <div className="mt-[80%]">
          <NavItem icon={<Folder className="ml-4 " />} label="Composition" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-8 overflow-auto">
        <div className="md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center mb-6">
          <Image
            src="./asset/submenu.svg"
            alt="CLOIT Logo"
            width={40}
            height={40}
            className="m-4 bg-blue-600 rounded-full p-2"
          />
          <h2 className="text-2xl font-bold">Menu</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Menu tree */}
          <div className="w-full md:w-1/2  rounded-lg ">
            <div className="mb-4">
              <Label htmlFor="menu">Menu</Label>
              <div className="border-2 p-2 rounded-lg flex flex-row justify-between">
                <div>system:management</div>
                <div>
                  <ChevronDown />
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <Button variant="outline">Expand All</Button>
              <Button variant="outline">Collapse All</Button>
            </div>
            <div className="border rounded-lg p-4">
              <MenuTree items={menuItems || []} />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div>
                <Label htmlFor="menuId">Menu ID</Label>
                <Input id="menuId" {...register("id")} readOnly />
              </div>
              <div>
                <Label htmlFor="depth">Depth</Label>
                <Input
                  id="depth"
                  {...register("depth")}
                  className="bg-gray-100 w-full lg:w-[50%]"
                />
              </div>
              <div>
                <Label htmlFor="parentData">Parent Data</Label>
                <Input
                  id="parentData"
                  {...register("parentData")}
                  className="bg-gray-100 w-full lg:w-[50%]"
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="w-full lg:w-[50%]"
                />
              </div>
              <Button
                className="mt-6 w-[50%] bg-blue-600 rounded-full p-7"
                type="submit"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

// NavItem Component Type Definition
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-4 text-sm ${
        active
          ? "bg-[#9FF443] text-black rounded-md"
          : "text-[#667085] hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  );
};

// MenuTree Component Type Definition
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

// TreeItem Component Type Definition
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
          {item.children?.map((child) => (
            <TreeItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};
