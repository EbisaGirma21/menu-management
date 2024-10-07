const MenuItem = require("../models/menuModel");

// 1. Get all menus
exports.getMenus = async (req, res) => {
  try {
    const menus = await MenuItem.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Get specific menu with depth and root item
exports.getSpecificMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await MenuItem.findById(id).populate("parent");
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Add menu item hierarchically
exports.addMenuItem = async (req, res) => {
  const { name, depth, parentId } = req.body;
  try {
    const newItem = new MenuItem({ name, depth, parent: parentId || null });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Update menu item
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, depth } = req.body;
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, depth },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. Delete menu item
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    await MenuItem.findByIdAndDelete(id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
