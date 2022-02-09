import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(StatusCodes.FORBIDDEN).json({ Error: "Authentication Invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    res.status(StatusCodes.FORBIDDEN).json({ Error: "Authentication Invalid" });
  }
};

export default auth;
