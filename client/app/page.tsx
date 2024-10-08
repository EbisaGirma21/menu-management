"use client";

import { useState } from "react";
import {
  ChevronDown,
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
import { useFetchMenuItems, useAddMenuItem } from "../hooks/use-menu-query";
import { useForm } from "react-hook-form";
import { NavItem } from "@/components/NavItem";
import { MenuTree } from "@/components/MenuTree";

interface MenuItem {
  id: string | number;
  name: string;
  depth?: number;
  children?: MenuItem[];
  parentData?: string;
}

export default function MyMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOnUpdate, setIsOnUpdate] = useState(false);
  const [id, setId] = useState<string | number>("");
  const [depth, setDepth] = useState<number>(0);
  const [parentData, setParentData] = useState<string>("");
  const [name, setName] = useState<string>("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { data: menuItems } = useFetchMenuItems();
  const addMenuItemMutation = useAddMenuItem();

  const { register, handleSubmit, reset } = useForm<MenuItem>({
    defaultValues: {
      name: "",
      depth: 0,
      parentData: "",
    },
  });

  const onSubmit = async (data: MenuItem) => {
    if (isOnUpdate) {
      await addMenuItemMutation.mutateAsync({ id, depth, parentData, name });
    } else {
      await addMenuItemMutation.mutateAsync(data);
    }
    reset();
    setIsOnUpdate(false);
    setId("");
    setDepth(0);
    setName("");
    setParentData("");
  };

  return (
    <div className="flex h-screen bg-white">
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

      <main className="flex-grow p-8 overflow-auto">
        <div className="md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center mb-6  flex-row ">
          <Folder className="ml-4 fill-slate-400 text-slate-400" />
          <h2 className=" font-bold "> / Menu</h2>
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
              <MenuTree
                setId={setId}
                setDepth={setDepth}
                setParentData={setParentData}
                setName={setName}
                setIsOnUpdate={setIsOnUpdate}
                items={menuItems || []}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div>
                <Label htmlFor="menuId">Menu ID</Label>
                <Input
                  id="menuId"
                  {...register("id")}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  readOnly={isOnUpdate ? true : false}
                />
              </div>
              <div>
                <Label htmlFor="depth">Depth</Label>
                <Input
                  id="depth"
                  {...register("depth")}
                  value={depth !== undefined ? depth : ""}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="bg-gray-100 w-full lg:w-[50%]"
                  readOnly={isOnUpdate ? true : false}
                />
              </div>
              <div>
                <Label htmlFor="parentData">Parent Data</Label>
                <Input
                  id="parentData"
                  {...register("parentData")}
                  value={parentData}
                  onChange={(e) => setParentData(e.target.value)}
                  className="bg-gray-100 w-full lg:w-[50%]"
                  readOnly={isOnUpdate ? true : false}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
