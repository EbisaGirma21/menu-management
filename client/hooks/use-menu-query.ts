// menuService.ts
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Define type for menu items
interface MenuItem {
  id: string | number;
  name: string;
  depth?: number;
  parentData?: string;
  children?: MenuItem[];
}

// Fetch menu items
export const useFetchMenuItems = () => {
  return useQuery("menuItems", async () => {
    const res = await axios.get("http://localhost:8000/api/menus");
    return res.data;
  });
};

// Add new menu item
export const useAddMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newItem: MenuItem) => {
      return await axios.post("http://localhost:8000/api/menus", newItem);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("menuItems");
      },
    }
  );
};

// Edit menu item
export const useEditMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedItem: MenuItem) => {
      return await axios.put(
        `http://localhost:8000/api/menus/${updatedItem.id}`,
        updatedItem
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("menuItems");
      },
    }
  );
};

// Delete menu item
export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string | number) => {
      return await axios.delete(`http://localhost:8000/api/menus/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("menuItems");
      },
    }
  );
};
