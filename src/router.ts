import { Router, Request, Response, NextFunction } from "express";
import elasticControllers from "./controller/elastic.controller";
import userControllers from "./controller/user.controller";

import { isAuthenticated } from "./services/user";

const router = Router();

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await isAuthenticated(req.headers);
    next();
  } catch (e) {
    return res
      .status(401)
      .send({ message: "authentication failed on server side" });
  }
}

/** DEV ROUTES */
router.route("/demodata").post(elasticControllers.setDemoData);

/** USER  ROUTES */
// TODO: SECURITY: issue new Token for each request reached the backend.

router.route("/login").post(userControllers.login);
// GetUser is used to ensure Autentication, it's a protected route to only works when current token is still valid;
router.route("/authenticate").get(userControllers.getUser, ensureAuthenticated);

/** BUSINESS LOGIC */
router.route("/question").get(elasticControllers.queryQuestion);
router.route("/multi-field").get(elasticControllers.queryAll);
router.route("/category").get(elasticControllers.aggregateTerms);
router.route("/questionById").get(elasticControllers.queryById);

export default router;
