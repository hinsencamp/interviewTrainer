import { Router } from "express";
import controllers from "./controller/elastic.controller";

const router = Router();

router.route("/demodata").post(controllers.setDemoData);

router.route("/question").get(controllers.queryQuestion);
router.route("/multi-field").get(controllers.queryAll);
router.route("/category").get(controllers.aggregateTerms);
// /api/question/:id
// router
//   .route('/:id')
//   .get(controllers.getOne)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne);

export default router;
