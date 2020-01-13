import { Router } from "express";
import elasticControllers from "./controller/elastic.controller";
import userControllers from "./controller/user.controller";

const router = Router();

router.route("/demodata").post(elasticControllers.setDemoData);

router.route("/login").post(userControllers.login);

router.route("/question").get(elasticControllers.queryQuestion);
router.route("/multi-field").get(elasticControllers.queryAll);
router.route("/category").get(elasticControllers.aggregateTerms);
router.route("/questionById").get(elasticControllers.queryById);
// /api/question/:id
// router
//   .route('/:id')
//   .get(elasticControllers.getOne)
//   .put(elasticControllers.updateOne)
//   .delete(elasticControllers.removeOne);

export default router;
