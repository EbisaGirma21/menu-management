const MenuItem = require("../models/menuModel");

const populateChildren = async (item) => {
  await item.populate("children");

  for (const child of item.children) {
    await populateChildren(child);
  }

  return item;
};

exports.getMenus = async (req, res) => {
  try {
    const rootItems = await MenuItem.find({ parent: null });

    const populatedRootItems = await Promise.all(
      rootItems.map(populateChildren)
    );

    res.json(populatedRootItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
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
    const existingMenuItem = await MenuItem.findOne({ id: id });

    if (existingMenuItem) {
      existingMenuItem.name = name;
      existingMenuItem.depth = parseInt(depth, 10);
      existingMenuItem.parent = parentData
        ? await MenuItem.findOne({
            name: parentData.trim(),
            depth: parseInt(depth, 10) - 1,
          })
        : null;

      if (existingMenuItem.parent) {
        if (!existingMenuItem.parent.children.includes(existingMenuItem._id)) {
          existingMenuItem.parent.children.push(existingMenuItem._id);
          await existingMenuItem.parent.save();
        }
      }

      const updatedItem = await existingMenuItem.save();
      return res.json(updatedItem);
    }

    const parentItem = await MenuItem.findOne({
      name: parentData.trim(),
      depth: parseInt(depth, 10) - 1,
    });

    console.log("Parent Item Found:", parentItem);

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

    res.json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

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

exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.find({ id: id });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    if (menuItem.children && menuItem.children.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete a menu item with children" });
    }
    console.log(menuItem);
    await MenuItem.deleteOne({ id });
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
