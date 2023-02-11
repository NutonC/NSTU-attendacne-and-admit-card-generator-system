const { registerHall, findHalls } = require("../../models/hall/hall.model");

async function httpPostHall(req, res) {
  const { hallName, hallCode } = req.body;
  const { versityId } = req.user;

  if (!hallName || !hallCode || !versityId) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const response = await registerHall({ hallName, hallCode, versityId });
    if (response.ok === 1) {
      return res.status(200).json({
        data: hallName,
        message: "Successfully added hall!",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Failed to register hall!", message: err.message });
  }
}

async function httpGetHall(req, res) {
  const { versityId } = req.user;

  try {
    const hallData = await findHalls({ versityId });

    if (!hallData) {
      return res
        .status(404)
        .json({ error: "Hall not found", message: "No Hall!" });
    }

    return res.status(200).json({ data: hallData, message: "Hall found" });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Hall not found", message: "No Hall!" });
  }
}

module.exports = {
  httpPostHall,
  httpGetHall,
};
