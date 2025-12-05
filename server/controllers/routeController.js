const Route = require("../models/routeModel");

exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch routes" });
  }
};
