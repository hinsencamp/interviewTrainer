import elasticsearch, { Client } from "elasticsearch";
import config from "../config";

let client: Client;

function init(): Client {
  if (!client) {
    client = new elasticsearch.Client({
      hosts: [config.elasticURL]
    });
    console.log("new client instanciated");
  } else {
    console.log("client already instanciated");
  }

  client.ping(
    {
      requestTimeout: 30000
    },
    (error: object) => {
      error
        ? console.error("ElasticSearch cluster is down!")
        : console.log("ElasticSearch is ok");
    }
  );

  return client;
}

export async function createIndex(index: string, body: object): Promise<void> {
  try {
    const result = await client.indices.create({
      index,
      body
    });
    console.info(result);
  } catch (e) {
    console.info(e);
  }
}

export async function deleteIndex(index: string): Promise<void> {
  try {
    const result = await client.indices.delete({
      index
    });
    console.info(result);
  } catch (e) {
    console.info(e);
  }
}

export function bulkImport(index: string, data: object[]): Promise<object> {
  const client = init();
  const initialBulk: object = { index: { _index: index } };
  const collectionBulk: object[] = data.reduce(
    (acc: object[], entry: object) => {
      return [...acc, initialBulk, entry];
    },
    []
  );

  return client
    .bulk({ body: collectionBulk })
    .then((result: object) => result)
    .catch((err: object) => err);
}

function Search(payload: object): Promise<number[] | object | void> {
  const client = init();
  return client
    .search(payload)
    .then((result: { hits: { total: number; hits: object } }) => {
      console.log("request meta data", result.hits);
      return result.hits.hits;
    })
    .catch((e: object) => {
      throw new Error("data could not be retrieved from elastic");
    });
}

export async function basicQuery(
  query: string,
  field: string,
  index: string,
  type: string
): Promise<number[] | object | void> {
  const body = {
    size: 200,
    from: 0,
    query: {
      match: {
        [field]: query
      }
    }
  };
  const payload = {
    index,
    body,
    type
  };
  return Search(payload);
}

export async function multiQuery(
  query: string,
  fields: string[],
  index: string,
  type: string
): Promise<number[] | object | void> {
  const body = {
    size: 200,
    from: 0,
    query: {
      multi_match: {
        query: query,
        fields: fields
      }
    }
  };
  const payload = {
    index,
    body,
    type
  };
  return Search(payload);
}

export async function termAggregation(
  field: string,
  index: string,
  type: string
): Promise<number[] | object | void> {
  const client = init();
  const body = {
    size: 0,
    aggs: {
      [index]: {
        terms: { field: `${field}.keyword` }
      }
    }
  };
  const payload = {
    index,
    body,
    type
  };

  return client
    .search(payload)
    .then((result: any) => {
      const { aggregations, hits } = result;
      return {
        buckets: aggregations.questions.buckets,
        total: hits.total.value
      };
    })
    .catch((e: object) => {
      throw new Error("data could not be retrieved from elastic");
    });
}

export async function idQuery(ids: string, index: string) {
  const body = {
    query: {
      terms: {
        _id: JSON.parse(ids)
      }
    }
  };
  const payload = {
    index,
    body
  };

  return Search(payload);
}
