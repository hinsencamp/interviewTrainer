import { Router } from "express";
import elasticControllers from "./controller/elastic.controller";
import userControllers from "./controller/user.controller";

const router = Router();

router.route("/demodata").post(elasticControllers.setDemoData);

router.route("/login").post(userControllers.login);
router.route("/authenticated").get(userControllers.isAuthenticated);

router.route("/question").get(elasticControllers.queryQuestion);
router.route("/multi-field").get(elasticControllers.queryAll);
router.route("/category").get(elasticControllers.aggregateTerms);
router.route("/questionById").get(elasticControllers.queryById);

export default router;
