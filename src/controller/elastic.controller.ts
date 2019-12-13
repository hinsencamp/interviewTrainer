import { Request, Response } from "express";

import {
  basicQuery,
  multiQuery,
  bulkImport,
  termAggregation
} from "../services/elastic";
import questions from "../demoData/data.json";

async function setDemoData(req: Request, res: Response): Promise<void> {
  const q = questions as {
    questions: { category: string; question: string }[];
  };

  try {
    const result = await bulkImport("questions", q.questions);
    res.send({ message: `🚀 Successfully imported  items: ${result}` });
  } catch (e) {
    res.send({ message: `Failed Bulk operation` });
  }
}

async function queryQuestion(req: Request, res: Response): Promise<void> {
  const { type, query } = req.query;
  const index = "questions";
  const field = "question";

  try {
    const result = await basicQuery(query, field, index, type);
    res.send({ result });
  } catch (e) {
    res.send({ error: e });
  }
}

async function queryAll(req: Request, res: Response): Promise<void> {
  const { type, query } = req.query;
  const index = "questions";
  const fields = ["answer", "question"];

  try {
    const result = await multiQuery(query, fields, index, type);
    res.send({ result });
  } catch (e) {
    res.send({ error: e });
  }
}

async function aggregateTerms(req: Request, res: Response): Promise<void> {
  const { type, field } = req.query;
  const index = "questions";

  try {
    const result = await termAggregation(field, index, type);
    res.send({ result });
  } catch (e) {
    res.send({ error: e });
  }
}

export default { queryQuestion, setDemoData, queryAll, aggregateTerms };
