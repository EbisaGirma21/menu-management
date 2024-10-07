import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MenuTree from "./MenuTree";

interface MenuItem {
  id: string;
  name: string;
  children?: MenuItem[];
}

interface MainContentProps {
  menuItems: MenuItem[];
  selectedMenu: string;
  setSelectedMenu: (value: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  menuItems,
  selectedMenu,
  setSelectedMenu,
}) => {
  return (
    <div className="flex-grow p-8 overflow-auto">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">Menus</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <Label htmlFor="menu">Menu</Label>
            <select
              id="menu"
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
            >
              <option value="system:management">system:management</option>
            </select>
          </div>
          <div className="flex justify-between mb-4">
            <Button variant="outline">Expand All</Button>
            <Button variant="outline">Collapse All</Button>
          </div>
          <div className="border rounded-lg p-4">
            <MenuTree items={menuItems} />
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="menuId">Menu ID</Label>
              <Input
                id="menuId"
                value="563704e9-6af6-11ed-a7ba-f220afe54a9"
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="depth">Depth</Label>
              <Input id="depth" value="3" readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label htmlFor="parentData">Parent Data</Label>
              <Input
                id="parentData"
                value="Systems"
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="System Code" />
            </div>
          </div>
          <Button className="mt-6 w-full">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
