const {
  registerSession,
  findSessions,
} = require("../../models/session/session.model");

async function httpPostSession(req, res) {
  const { session } = req.body;
  const { versityId } = req.user;

  if (!session || !versityId) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const response = await registerSession({ session, versityId });
    if (response.ok === 1) {
      return res.status(200).json({
        data: session,
        message: "Successfully added session!",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Failed to register session!", message: err.message });
  }
}

async function httpGetSession(req, res) {
  const { versityId } = req.user;

  try {
    const sessionData = await findSessions({ versityId });

    if (!sessionData) {
      return res
        .status(404)
        .json({ error: "Session not found", message: "No Session!" });
    }

    return res
      .status(200)
      .json({ data: sessionData, message: "Session found" });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Session not found", message: "No Session!" });
  }
}

module.exports = {
  httpPostSession,
  httpGetSession,
};
