const MenuItem = require("../models/menuModel");

// 1. Get all menus
exports.getMenus = async (req, res) => {
  try {
    // Find all root-level items (where parent is null)
    const rootItems = await MenuItem.find({ parent: null }).populate({
      path: "children",
      populate: { path: "children", populate: { path: "children" } }, // Populate nested children recursively
    });

    res.json(rootItems); // Return the full hierarchy
  } catch (err) {
    console.error(err);
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

exports.addMenuItem = async (req, res) => {
  const { name, depth, id, parentData } = req.body;

  try {
    const parentItem = await MenuItem.findOne({
      name: parentData.trim(),
      depth: parseInt(depth, 10) - 1, // Ensure we're looking at the correct depth for the parent
    });

    console.log(parentData);

    const newItem = new MenuItem({
      id,
      name,
      depth: parseInt(depth, 10),
      parent: parentItem ? parentItem._id : null,
    });

    const savedItem = await newItem.save();

    if (parentItem) {
      if (!parentItem.children.includes(savedItem._id)) {
        parentItem.children.push(savedItem._id);
        await parentItem.save();
      }
    }

    // Return the newly created item as the response
    res.json(savedItem);
  } catch (err) {
    console.error(err);
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
