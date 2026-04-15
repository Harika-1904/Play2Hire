import Module from "../models/Module.js";

// GET /api/modules/:name
export const getModuleByName = async (req, res) => {
  try {
    const mod = await Module.findOne({ name: req.params.name.toLowerCase() });
    if (!mod) return res.status(404).json({ message: "Module not found" });
    res.json(mod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
