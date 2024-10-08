const MenuItem = require("../models/menuModel");

exports.getMenus = async (req, res) => {
  try {
    const rootItems = await MenuItem.find({ parent: null }).populate({
      path: "children",
      populate: { path: "children", populate: { path: "children" } },
    });

    res.json(rootItems);
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
    const parentItem = await MenuItem.findOne({
      name: parentData.trim(),
      depth: parseInt(depth, 10) - 1,
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
