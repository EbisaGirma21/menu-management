const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/menus", menuController.getMenus);
router.get("/menus/:id", menuController.getSpecificMenu);
router.post("/menus", menuController.addMenuItem);
router.put("/menus/:id", menuController.updateMenuItem);
router.delete("/menus/:id", menuController.deleteMenuItem);

module.exports = router;
